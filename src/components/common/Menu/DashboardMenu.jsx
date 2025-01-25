/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { TbCalendarDollar, TbNotification } from "react-icons/tb";
import { MdCardMembership, MdHistory } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { RiCoupon3Line } from "react-icons/ri";
import { AiOutlineNotification } from "react-icons/ai";

const DashboardMenu = ({ closeMenu }) => {
  const isUser = false;
  const isAdmin = false;
  const isMember = false;

  // Common user links
  const links = [
    { to: "/dashboard/home", icon: <FiUser />, value: "Dashboard" },
  ];

    // User-specific links
    if (!isUser) {
      links.push(
        { to: "/dashboard/user-profile", icon: <FiUser />, value: "My Profile" },
        { to: "/dashboard/announcements", icon: <TbNotification />, value: "Announcements" },
      );
    }

    // Member-specific links
    if (!isMember) {
      links.push(
        { to: "/dashboard/member-profile", icon: <FiUser />, value: "Member Profile" },
        { to: "/dashboard/make-payment", icon: <TbCalendarDollar />, value: "Make Payment" },
        { to: "/dashboard/payment-history", icon: <MdHistory />, value: "Payment History" },
        { to: "/dashboard/announcements", icon: <TbNotification />, value: "Announcements" },
      );
    }


  // Admin-specific links
  if (!isAdmin) {
    links.push(
      { to: "/dashboard/admin-profile", icon: <FiUser />, value: "Admin Profile" },
      { to: "/dashboard/manage-members", icon: <MdCardMembership />, value: "Manage Members" },
      { to: "/dashboard/make-announcements", icon: <AiOutlineNotification />, value: "Make Announcements" },
      { to: "/dashboard/agreement-requests", icon: <IoNewspaperOutline />, value: "Agreement Requests" },
      { to: "/dashboard/manage-coupons", icon: <RiCoupon3Line />, value: "Manage Coupons" }
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
