import { SignJWT, jwtVerify } from "jose";

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("SESSION_SECRET is not defined");
}

const secret = new TextEncoder().encode(sessionSecret);

export type SessionUser = {
  id: number;
  name: string;
  email: string;
  mobile: string;
};

export async function createSession(user: SessionUser) {
  return await new SignJWT({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setSubject(String(user.id))
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);

    if (!payload.sub) {
      return null;
    }

    return {
      id: Number(payload.sub),
      name: String(payload.name ?? ""),
      email: String(payload.email ?? ""),
      mobile: String(payload.mobile ?? ""),
    };
  } catch {
    return null;
  }
}