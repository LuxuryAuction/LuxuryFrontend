import { AdminUsersView } from "@/src/views/Admin/Users/index";

export const metadata = {
  title: "Користувачі | Admin",
  description: "Адміністрування користувачами (мок-дані)",
};

const AdminUsersPage = () => {
  return <AdminUsersView />;
};

export default AdminUsersPage;

