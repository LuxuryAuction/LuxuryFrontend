import { LogOutIcon, SettingsIcon, UserIcon } from "@/public/assets/icons";


export const userOptions = [
  {
    label: "Profile",
    value: "profile",
    icon: UserIcon,
  },
  {
    label: "Settings",
    value: "settings",
    icon: SettingsIcon,
    disabled: true,
  },
  {
    label: "Logout",
    value: "logout",
    icon: LogOutIcon,
  },
];

export const languages = [
  { label: "English", value: "en", icon: "🇺🇸" },
  { label: "Ukrainian", value: "ua", icon: "🇺🇦" },
];