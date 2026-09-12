export type DemoRole = "patient" | "doctor" | "admin";

export interface DemoUser {
  id: "patient-001" | "patient-002" | "doctor-001" | "admin-001";
  username: string;
  password: string;
  name: string;
  role: DemoRole;
}

// Prototype-only credentials. Do not reuse these in a deployed application.
export const demoUsers: DemoUser[] = [
  {
    id: "patient-001",
    username: "rahul",
    password: "patient123",
    name: "Rahul Sharma",
    role: "patient",
  },
  {
    id: "patient-002",
    username: "ananya",
    password: "patient456",
    name: "Ananya Verma",
    role: "patient",
  },
  {
    id: "doctor-001",
    username: "priya",
    password: "doctor123",
    name: "Dr. Priya Singh",
    role: "doctor",
  },
  {
    id: "admin-001",
    username: "admin",
    password: "admin123",
    name: "MediKiosk Admin",
    role: "admin",
  },
];
