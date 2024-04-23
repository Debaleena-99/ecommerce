import React, { useRef, useEffect, useState } from "react";
import SidebarLogo from "./Logo";
import Navmenu from "./Navmenu";
import { menuItems } from "@/constant/data";
import SimpleBar from "simplebar-react";
import useSidebar from "@/hooks/useSidebar";
import useSemiDark from "@/hooks/useSemiDark";
import useSkin from "@/hooks/useSkin";
import svgRabitImage from "@/assets/images/svg/rabit.svg";

const Sidebar = () => {
  console.log("Menu names", menuItems);
  // const role = "Super Admin"; // Assuming role is fetched or determined somehow

  const scrollableNodeRef = useRef();
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableNodeRef.current.scrollTop > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    scrollableNodeRef.current.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up the event listener on unmount
      scrollableNodeRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs only once after initial render

  const [collapsed, setMenuCollapsed] = useSidebar();
  const [menuHover, setMenuHover] = useState(false);

  // semi dark option
  const [isSemiDark] = useSemiDark();
  // skin
  const [skin] = useSkin();

  // Filter menu items based on role
  // const filteredMenuItems = menuItems.filter((item) => {
  //   if (role === "Super Admin") {
  //     // Only return items with Dashboard title and isHide set to false
  //     return item.title === "Dashboard";
  //   } else {
  //     // Return all items for other roles
  //     return true;
  //   }
  // });

  return (
    <div className={isSemiDark ? "dark" : ""}>
      <div
        className={`sidebar-wrapper bg-cyan-700 dark:bg-slate-800     ${
          collapsed ? "w-[72px] close_sidebar" : "w-[248px]"
        }
      ${menuHover ? "sidebar-hovered" : ""}
      ${
        skin === "bordered"
          ? "border-r border-slate-200 dark:border-slate-700"
          : "shadow-base"
      }
      `}
        onMouseEnter={() => {
          setMenuHover(true);
        }}
        onMouseLeave={() => {
          setMenuHover(false);
        }}
      >
        <SidebarLogo menuHover={menuHover} />
        <div
          className={`h-[60px]  absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none ${
            scroll ? " opacity-100" : " opacity-0"
          }`}
        ></div>

        <SimpleBar
          className="sidebar-menu px-4 h-[calc(100%-80px)]"
          scrollableNodeProps={{ ref: scrollableNodeRef }}
        >
          <Navmenu menus={menuItems} />
        </SimpleBar>
      </div>
    </div>
  );
};

export default Sidebar;
