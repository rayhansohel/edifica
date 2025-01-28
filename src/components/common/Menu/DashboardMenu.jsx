/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { TbCalendarDollar } from "react-icons/tb";
import { MdHistory } from "react-icons/md";
import { IoNewspaperOutline, IoNotificationsOutline } from "react-icons/io5";
import { RiDashboardLine, RiPoliceBadgeLine, RiUserSettingsLine } from "react-icons/ri";
import { LiaUserShieldSolid } from "react-icons/lia";
import { BiUser } from "react-icons/bi";
import { PiNotePencilDuotone } from "react-icons/pi";
import useUserRole from "../../../hooks/useUserRole";
import { useAuth } from "../../../context/AuthContext";


const DashboardMenu = ({ closeMenu }) => {
  const { data: role } = useUserRole();
  const { user } = useAuth();
 

  // Common links for all users
  const links = [];

  // User-specific links
  if (role === "user") {
    links.push(
      { to: "/dashboard/profile", icon: <BiUser />, value: "My Profile" },
      { to: "/dashboard/announcements", icon: <IoNotificationsOutline />, value: "Announcements" },
    );
  }

  // Member-specific links
  if (role === "member") {
    links.push(
      { to: "/dashboard/profile", icon: <BiUser />, value: "My Profile" },
      { to: "/dashboard/announcements", icon: <IoNotificationsOutline />, value: "Announcements" },
      { to: "/dashboard/make-payment", icon: <TbCalendarDollar />, value: "Make Payment" },
      { to: "/dashboard/payment-history", icon: <MdHistory />, value: "Payment History" },
      { to: "/dashboard/manage-coupons", icon: <MdHistory />, value: "Manage Coupon" },
    );
  }

  // Admin-specific links
  if (role === "admin") {
    links.push(
      { to: "/dashboard/admin-profile", icon: <LiaUserShieldSolid />, value: "My Profile" },
      { to: "/dashboard/manage-member", icon: <RiPoliceBadgeLine />, value: "Manage Member" },
      { to: "/dashboard/make-announcement", icon: <PiNotePencilDuotone />, value: "Make Announcement" },
      { to: "/dashboard/manage-coupons", icon: <MdHistory />, value: "Manage Coupon" },
      { to: "/dashboard/agreement-requests", icon: <IoNewspaperOutline />, value: "Agreement Requests" },
    );
  }

  // Owner-specific links
  if (role === "admin" && user.email === "arayhansohel@gmail.com" ) {
    links.push(
      { to: "/dashboard/manage-user", icon: <RiUserSettingsLine />, value: "Manage User" },
    );
  }


  return (
    <div className="w-full py-2 px-4">
      {/* Links */}
      <ul>
        {links.map(({ to, icon, value }) => (
          <li key={to}>
            <NavLink
              to={to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center hover:text-accent ${
                  isActive ? "text-accent font-semibold" : "transition"
                }`
              }
            >
              <div className="flex gap-2 justify-start items-center p-2 w-full hover:bg-base-300 rounded-md">
                <div className="text-lg">{icon}</div>
                <div>{value}</div>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardMenu;