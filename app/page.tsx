import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>MediKiosk</h1>
      <p>A simple demo portal for patients, doctors, and administrators.</p>
      <Link href="/login">Sign in</Link>
      <section>
        <h2>Patient</h2>
        <p>Apply for a consultation and see your medical history.</p>
      </section>
      <section>
        <h2>Doctor</h2>
        <p>Review patient information, consultations, and medical records.</p>
      </section>
      <section>
        <h2>Admin</h2>
        <p>See a basic summary of the demo portal.</p>
      </section>
    </main>
  );
}
