/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { TbCalendarDollar, TbNotification } from "react-icons/tb";
import { MdCardMembership, MdHistory } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { RiCoupon3Line, RiDashboardLine } from "react-icons/ri";
import { AiOutlineNotification } from "react-icons/ai";
import useUserData from "../../../hooks/useUserData";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

const DashboardMenu = ({ closeMenu }) => {
  const { users, loading, error } = useUserData();
  const { user: loggedInUser } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (users && loggedInUser?.email) {
      const matchedUser = users.find((user) => user.email === loggedInUser.email);
      if (matchedUser) {
        setCurrentUser(matchedUser);
      }
    }
  }, [users, loggedInUser]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data</div>;
  if (!currentUser) return <div>User not found</div>;

  const role  = currentUser.role;

  // Common links for all users
  const links = [
    { to: "/dashboard/home", icon: <RiDashboardLine />, value: "Dashboard" },
  ];

  // User-specific links
  if (role === "user") {
    links.push(
      { to: "/dashboard/profile", icon: <FiUser />, value: "Profile" },
      { to: "/dashboard/announcements", icon: <TbNotification />, value: "Announcements" }
    );
  }

  // Member-specific links
  if (role === "member") {
    links.push(
      { to: "/dashboard/profile", icon: <FiUser />, value: "Profile" },
      { to: "/dashboard/make-payment", icon: <TbCalendarDollar />, value: "Make Payment" },
      { to: "/dashboard/payment-history", icon: <MdHistory />, value: "Payment History" },
      { to: "/dashboard/announcements", icon: <TbNotification />, value: "Announcements" }
    );
  }

  // Admin-specific links
  if (role === "admin") {
    links.push(
      { to: "/dashboard/profile", icon: <FiUser />, value: "Profile" },
      { to: "/dashboard/manage-members", icon: <MdCardMembership />, value: "Manage Members" },
      { to: "/dashboard/make-announcements", icon: <AiOutlineNotification />, value: "Make Announcements" },
      { to: "/dashboard/agreement-requests", icon: <IoNewspaperOutline />, value: "Agreement Requests" },
      { to: "/dashboard/manage-coupons", icon: <RiCoupon3Line />, value: "Manage Coupons" }
    );
  }

  // Owner-specific links
  if (role === "owner") {
    links.push(
      { to: "/dashboard/profile", icon: <FiUser />, value: "My Profile" },
      { to: "/dashboard/manage-user", icon: <MdCardMembership />, value: "Manage User" }
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
