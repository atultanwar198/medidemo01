import { PortalNavigation } from "@/components/portal/navigation";
import { demoConsultations, demoPatients, demoDoctor } from "@/data/portal-demo";
import { requireRole } from "@/lib/require-role";

export default async function AdminDashboardPage() {
  const user = await requireRole("admin");
  return <main><PortalNavigation role="admin" /><h1>Admin dashboard</h1><p>Signed in as {user.name}.</p>
    <section><h2>Demo portal summary</h2><p>Patients: {demoPatients.length}</p><p>Doctors: 1 ({demoDoctor.name})</p><p>Consultations: {demoConsultations.length}</p></section>
    <section><h2>Demo accounts</h2><ul><li>Patient: rahul / patient123</li><li>Patient: ananya / patient456</li><li>Doctor: priya / doctor123</li><li>Admin: admin / admin123</li></ul></section>
  </main>;
}
