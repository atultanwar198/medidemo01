import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

import { demoUsers, type DemoRole } from "@/data/demo";

const SESSION_COOKIE = "medikiosk_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export type SessionUser = {
  id: string;
  name: string;
  role: DemoRole;
};

type SessionPayload = SessionUser & { expiresAt: number };

function getSessionSecret() {
  const secret = process.env.AUTH_SECRET ?? process.env.MONGODB_URI;

  if (!secret) {
    throw new Error("Please define AUTH_SECRET in .env.local");
  }

  return secret;
}

function signature(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

export function createSessionToken(user: SessionUser) {
  const payload: SessionPayload = {
    ...user,
    expiresAt: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");

  return `${encodedPayload}.${signature(encodedPayload)}`;
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const [encodedPayload, receivedSignature] = token.split(".");
  if (!encodedPayload || !receivedSignature) return null;

  const expectedSignature = signature(encodedPayload);
  const receivedSignatureBuffer = Buffer.from(receivedSignature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);

  if (
    receivedSignatureBuffer.length !== expectedSignatureBuffer.length ||
    !timingSafeEqual(receivedSignatureBuffer, expectedSignatureBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as SessionPayload;
    const user = demoUsers.find((candidate) => candidate.id === payload.id);

    if (!user || payload.expiresAt <= Date.now() || user.role !== payload.role) return null;

    return { id: user.id, name: user.name, role: user.role };
  } catch {
    return null;
  }
}

export async function getPatientSession() {
  const user = await getSessionUser();
  return user?.role === "patient" ? user : null;
}

export { SESSION_COOKIE };
