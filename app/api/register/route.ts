import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { name, email, mobile, password } = await request.json();

    if (!name || !email || !mobile || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const existingEmail = await db.orm.public.User
      .where({ email })
      .first();

    if (existingEmail) {
      return NextResponse.json(
        { message: "Email already registered." },
        { status: 409 }
      );
    }

    const existingMobile = await db.orm.public.User
      .where({ mobile })
      .first();

    if (existingMobile) {
      return NextResponse.json(
        { message: "Mobile number already registered." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.orm.public.User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "Registration successful.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}