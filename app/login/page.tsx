"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setError("");
    try {
      const response = await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) });
      const data = await response.json();
      if (!response.ok || !data.success) { setError(data.error || "Unable to sign in."); return; }
      router.push(`/${data.user.role}/dashboard`);
    } catch { setError("Unable to sign in."); } finally { setSaving(false); }
  }

  return <main><h1>MediKiosk login</h1><p>Choose a demo account or enter your credentials.</p>
    <form onSubmit={login}><label>Username<input value={username} onChange={(event) => setUsername(event.target.value)} required /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label><button disabled={saving}>{saving ? "Signing in…" : "Sign in"}</button>{error && <p role="alert">{error}</p>}</form>
    <section><h2>Demo accounts</h2><ul><li>Patient: rahul / patient123</li><li>Patient: ananya / patient456</li><li>Doctor: priya / doctor123</li><li>Admin: admin / admin123</li></ul></section>
  </main>;
}
