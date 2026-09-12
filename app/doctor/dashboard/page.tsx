import Link from "next/link";
import { PortalNavigation } from "@/components/portal/navigation";
import { demoConsultations, demoPatients, demoDoctor } from "@/data/portal-demo";
import { requireRole } from "@/lib/require-role";

export default async function DoctorDashboardPage() {
  await requireRole("doctor");
  const waiting = demoConsultations.filter((item) => item.status === "doctor_review");
  return <main><PortalNavigation role="doctor" /><h1>{demoDoctor.name}</h1><p>{demoDoctor.specialty}</p>
    <section><h2>Today&apos;s overview</h2><p>Patients in demo: {demoPatients.length}</p><p>Consultations awaiting review: {waiting.length}</p><Link href="/doctor/patients">Open patient list</Link></section>
    <section><h2>Awaiting review</h2><ul>{waiting.map((item) => <li key={item.id}>{item.chiefComplaint} — {item.date}</li>)}</ul></section>
  </main>;
}
