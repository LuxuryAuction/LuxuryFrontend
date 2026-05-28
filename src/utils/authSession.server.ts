import { cookies } from "next/headers";
import { AuthSession, parseAuthSession } from "./authSession";

export async function getServerAuthSession(): Promise<AuthSession> {
  const cookieStore = await cookies();

  return parseAuthSession({
    accessToken: cookieStore.get("accessToken")?.value ?? null,
    userId: cookieStore.get("userId")?.value ?? null,
    userName: cookieStore.get("userName")?.value ?? null,
    userRole: cookieStore.get("userRole")?.value ?? null,
  });
}
