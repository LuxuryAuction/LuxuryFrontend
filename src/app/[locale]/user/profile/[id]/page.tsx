"use client";

import { use } from "react";
import { ProfilePage } from "@/src/views/Profile";

const Profile = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);
  return <ProfilePage id={id} />;
};

export default Profile;
