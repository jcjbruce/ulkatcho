import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify the caller is authenticated
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create admin client (service role) for creating users
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    // Create user client to verify caller is an admin
    const supabaseUser = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user: caller } } = await supabaseUser.auth.getUser();
    if (!caller) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check caller is an admin
    const { data: roleData } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", caller.id)
      .eq("role", "admin")
      .single();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Not authorized — admin role required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { application_id, action, admin_notes } = await req.json();

    if (!application_id || !action) {
      return new Response(JSON.stringify({ error: "Missing application_id or action" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch the application
    const { data: app, error: appError } = await supabaseAdmin
      .from("member_applications")
      .select("*")
      .eq("id", application_id)
      .single();

    if (appError || !app) {
      return new Response(JSON.stringify({ error: "Application not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (app.status !== "pending") {
      return new Response(JSON.stringify({ error: `Application already ${app.status}` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "reject") {
      await supabaseAdmin
        .from("member_applications")
        .update({
          status: "rejected",
          reviewed_by: caller.id,
          reviewed_at: new Date().toISOString(),
          admin_notes: admin_notes || null,
        })
        .eq("id", application_id);

      return new Response(JSON.stringify({ success: true, action: "rejected" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "approve") {
      // Create the Supabase auth account and send invite email
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.inviteUserByEmail(
        app.email,
        {
          data: {
            first_name: app.first_name,
            last_name: app.last_name,
          },
        }
      );

      if (createError) {
        // If user already exists, that's ok — just assign the role
        if (!createError.message.includes("already been registered")) {
          return new Response(JSON.stringify({ error: createError.message }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }

      // Get the user ID (either from new user or existing)
      let userId = newUser?.user?.id;
      if (!userId) {
        const { data: existing } = await supabaseAdmin.auth.admin.listUsers();
        const found = existing?.users?.find((u: { email?: string }) => u.email === app.email);
        userId = found?.id;
      }

      if (userId) {
        // Assign member role
        await supabaseAdmin.from("user_roles").upsert(
          { user_id: userId, role: "member" },
          { onConflict: "user_id,role" }
        );
      }

      // Update application status
      await supabaseAdmin
        .from("member_applications")
        .update({
          status: "approved",
          reviewed_by: caller.id,
          reviewed_at: new Date().toISOString(),
          admin_notes: admin_notes || null,
        })
        .eq("id", application_id);

      return new Response(JSON.stringify({ success: true, action: "approved", userId }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action — use 'approve' or 'reject'" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
