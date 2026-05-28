import { getServerAuthSession } from "@/src/utils/authSession.server";
import { UserLayoutClient } from "./UserLayoutClient";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialAuth = await getServerAuthSession();

  return <UserLayoutClient initialAuth={initialAuth}>{children}</UserLayoutClient>;
}
