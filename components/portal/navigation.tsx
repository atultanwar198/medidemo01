import Link from "next/link";

type PortalRole = "patient" | "doctor" | "admin";

const links: Record<PortalRole, { href: string; label: string }[]> = {
  patient: [
    { href: "/patient/dashboard", label: "Dashboard" },
    { href: "/patient/consultation", label: "Apply for consultation" },
    { href: "/patient/history", label: "Medical history" },
  ],
  doctor: [
    { href: "/doctor/dashboard", label: "Dashboard" },
    { href: "/doctor/patients", label: "Patients" },
  ],
  admin: [{ href: "/admin/dashboard", label: "Dashboard" }],
};

export function PortalNavigation({ role }: { role: PortalRole }) {
  return (
    <nav aria-label={`${role} navigation`}>
      <p>MediKiosk — {role} portal</p>
      <ul>
        {links[role].map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}
        <li><form action="/api/logout" method="post"><button type="submit">Sign out</button></form></li>
      </ul>
    </nav>
  );
}
