import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

/**
 * Fetch site_content for a given page. Returns a `get(key)` function
 * where key is "section.field". Falls back to hardcoded defaults so
 * the site works identically before any admin edits.
 */
export function useSiteContent(page: string, defaults: Record<string, string> = {}) {
  const [content, setContent] = useState<Record<string, string>>(defaults);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("site_content")
      .select("section, field, value")
      .eq("page", page)
      .then(({ data }) => {
        if (cancelled) return;
        const map = { ...defaults };
        (data ?? []).forEach((row: { section: string; field: string; value: string }) => {
          map[`${row.section}.${row.field}`] = row.value;
        });
        setContent(map);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [page]);

  const get = (key: string) => content[key] ?? defaults[key] ?? "";

  return { content, get, loading };
}
