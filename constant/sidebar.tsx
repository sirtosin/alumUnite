import {
  UserPlusIcon,
  UserCircleIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";

export const sideBar = [
  {
    title: "Add User",
    path: "/dashboard/add",
    icon: <UserPlusIcon className="h-6 w-6 text-white" />,
  },
  {
    title: "Manage User",
    path: "/dashboard/users",
    icon: <UserCircleIcon className="h-6 w-6 text-white" />,
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: <AdjustmentsHorizontalIcon className="h-6 w-6 text-white" />,
  },
];
export const sideBar1 = [
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: <AdjustmentsHorizontalIcon className="h-6 w-6 text-white" />,
  },
];
