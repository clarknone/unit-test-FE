import { IconType } from "react-icons";
import { FaWallet } from "react-icons/fa";

export interface INavItems {
  path: string;
  title: string;
  icon: IconType;
}

export const UserNavLinks: INavItems[] = [
  { path: "user/", title: "Home", icon: FaWallet },
];

export const AdminNavLinks: INavItems[] = [
  { path: "admin/", title: "Home", icon: FaWallet },
];
