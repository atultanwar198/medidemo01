import { NextResponse } from "next/server";
import { demoUsers } from "@/data/demo";
import { connectDB } from "@/lib/mongodb";
import { ensureDemoPatient } from "@/lib/demo-patients";
import { createSessionToken, sessionCookieOptions, SESSION_COOKIE } from "@/lib/auth";

export async function POST(request: Request) {
  let credentials: { username?: unknown; password?: unknown };

  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 });
  }

  const { username, password } = credentials;

  if (typeof username !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
  }

  try {

    // Find user
    const user = demoUsers.find(
      (user) => user.username === username
    );

    // User doesn't exist
    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid username or password",
        },
        {
          status: 401,
        }
      );
    }

    // Check password
    if (user.password !== password) {
      return NextResponse.json(
        {
          error: "Invalid username or password",
        },
        {
          status: 401,
        }
      );
    }

    if (user.role === "patient") {
      try {
        await connectDB();
        await ensureDemoPatient(user.id);
      } catch (error) {
        console.warn(
          "Unable to initialize the demo patient record during login",
          error instanceof Error ? error.message : error,
        );
      }
    }

    // Login successful
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set(
      SESSION_COOKIE,
      createSessionToken({ id: user.id, name: user.name, role: user.role }),
      sessionCookieOptions,
    );

    return response;
  } catch {
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
