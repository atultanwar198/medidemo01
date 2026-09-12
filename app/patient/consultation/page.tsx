import ConsultationForm from "@/components/consultation/consultation-form";
import { PortalNavigation } from "@/components/portal/navigation";
import { requireRole } from "@/lib/require-role";

export default async function ConsultationPage() {
  await requireRole("patient");
  return (
    <main>
      <PortalNavigation role="patient" />
      <h1>Apply for a consultation</h1>
      <p>Answer the questions below. A doctor will review your submission.</p>
      <ConsultationForm />
    </main>
  );
}
