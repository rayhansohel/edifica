/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { TbCalendarDollar, TbNotification } from "react-icons/tb";
import { MdCardMembership, MdHistory } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { RiCoupon3Line, RiDashboardLine } from "react-icons/ri";
import { AiOutlineNotification } from "react-icons/ai";
import { useAuth } from "../../../context/AuthContext";

const DashboardMenu = ({ closeMenu }) => {
 const { user } = useAuth();
 const isAdmin = true;
 const isMember = false;
 const isOwnwer = false;

  // Common links for all users
  const links = [
    { to: "/dashboard/home", icon: <RiDashboardLine />, value: "Dashboard" },
  ];

    // Userspecific links
    if (user) {
      links.push(
        { to: "/dashboard/profile", icon: <FiUser />, value: "My Profile" },
        { to: "/dashboard/announcements", icon: <TbNotification />, value: "Announcements" }
      );
    }


  // Member-specific links
  if (isAdmin) {
    links.push(
      { to: "/dashboard/manage-member", icon: <MdCardMembership />, value: "Manage Member" },
      { to: "/dashboard/make-announcements", icon: <AiOutlineNotification />, value: "Make Announcements" },
      { to: "/dashboard/agreement-requests", icon: <IoNewspaperOutline />, value: "Agreement Requests" },
      { to: "/dashboard/manage-coupons", icon: <RiCoupon3Line />, value: "Manage Coupons" }
    );
  }

  // Admin-specific links
  if (isMember) {
    links.push(
      { to: "/dashboard/make-payment", icon: <TbCalendarDollar />, value: "Make Payment" },
      { to: "/dashboard/payment-history", icon: <MdHistory />, value: "Payment History" },

    );
  }

  // Owner-specific links
  if (isOwnwer) {
    links.push(
      { to: "/dashboard/manage-user", icon: <MdCardMembership />, value: "Manage User" },
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