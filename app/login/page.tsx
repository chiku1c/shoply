import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get("shoply_session")?.value;

  if (sessionToken) {
    const session = await verifySession(sessionToken);

    if (session) {
      redirect("/");
    }
  }

  return <LoginForm />;
}