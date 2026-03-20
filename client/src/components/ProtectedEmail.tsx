/*
 * ProtectedEmail — Mini CAPTCHA email protection
 * Hides email addresses behind a simple math challenge to prevent spam bots.
 * Usage: <ProtectedEmail user="info" domain="ulkatcho.ca" label="info@ulkatcho.ca" />
 * The email is never rendered in the DOM until the user solves the challenge.
 */

import { useState, useCallback, useMemo } from "react";
import { Mail, ShieldCheck, Lock } from "lucide-react";

interface ProtectedEmailProps {
  user: string;
  domain: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  showIcon?: boolean;
}

function generateChallenge() {
  const a = Math.floor(Math.random() * 8) + 2; // 2-9
  const b = Math.floor(Math.random() * 8) + 1; // 1-8
  return { a, b, answer: a + b };
}

export default function ProtectedEmail({
  user,
  domain,
  label,
  className = "",
  style = {},
  showIcon = true,
}: ProtectedEmailProps) {
  const [revealed, setRevealed] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [error, setError] = useState(false);

  const challenge = useMemo(() => generateChallenge(), []);

  const email = `${user}@${domain}`;
  const displayLabel = label || email;

  const handleVerify = useCallback(() => {
    const parsed = parseInt(userAnswer.trim(), 10);
    if (parsed === challenge.answer) {
      setRevealed(true);
      setShowChallenge(false);
      setError(false);
    } else {
      setError(true);
      setUserAnswer("");
    }
  }, [userAnswer, challenge.answer]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") handleVerify();
    },
    [handleVerify]
  );

  if (revealed) {
    return (
      <a
        href={`mailto:${email}`}
        className={`inline-flex items-center gap-1.5 underline transition-colors duration-200 ${className}`}
        style={{ color: "#c9a227", ...style }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.color = "#8b6420";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.color = "#c9a227";
        }}
      >
        {showIcon && <ShieldCheck size={13} style={{ color: "#4ade80" }} />}
        {displayLabel}
      </a>
    );
  }

  if (showChallenge) {
    return (
      <span className="inline-flex items-center gap-2 flex-wrap">
        <span
          className="text-sm"
          style={{ fontFamily: "Lora, serif", color: "#555" }}
        >
          What is {challenge.a} + {challenge.b}?
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={userAnswer}
          onChange={(e) => {
            setUserAnswer(e.target.value);
            setError(false);
          }}
          onKeyDown={handleKeyDown}
          className="w-14 px-2 py-1 text-center text-sm"
          style={{
            border: error ? "1px solid #ef4444" : "1px solid #dce6ef",
            borderRadius: "3px",
            fontFamily: "Lora, serif",
            color: "#1a2e5a",
            backgroundColor: "#ffffff",
          }}
          autoFocus
          placeholder="?"
        />
        <button
          onClick={handleVerify}
          className="px-3 py-1 text-xs font-semibold tracking-wider uppercase transition-colors duration-200"
          style={{
            fontFamily: "Raleway, sans-serif",
            backgroundColor: "#1a2e5a",
            color: "#ffffff",
            border: "none",
            borderRadius: "3px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "#c9a227";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "#1a2e5a";
          }}
        >
          Verify
        </button>
        {error && (
          <span className="text-xs" style={{ color: "#ef4444" }}>
            Try again
          </span>
        )}
      </span>
    );
  }

  return (
    <button
      onClick={() => setShowChallenge(true)}
      className={`inline-flex items-center gap-1.5 transition-colors duration-200 cursor-pointer ${className}`}
      style={{
        fontFamily: "Lora, serif",
        color: "#c9a227",
        background: "none",
        border: "none",
        padding: 0,
        textDecoration: "underline",
        textDecorationStyle: "dotted",
        ...style,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "#8b6420";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "#c9a227";
      }}
      title="Click to verify and reveal email address"
    >
      {showIcon && <Lock size={12} />}
      <span>Click to reveal email</span>
    </button>
  );
}
