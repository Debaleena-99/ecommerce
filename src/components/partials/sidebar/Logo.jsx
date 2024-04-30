import React from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import useDarkMode from "@/hooks/useDarkMode";
import useSidebar from "@/hooks/useSidebar";
import useSemiDark from "@/hooks/useSemiDark";
import useSkin from "@/hooks/useSkin";

// import images
import MobileLogo from "@/assets/images/logo/logo-c.svg";
import MobileLogoWhite from "@/assets/images/logo/logo-c-white.svg";
import Logodb from "@/assets/images/all-img/logodb.png";

const SidebarLogo = ({ menuHover }) => {
  const [isDark] = useDarkMode();
  const [collapsed, setMenuCollapsed] = useSidebar();
  // semi dark
  const [isSemiDark] = useSemiDark();
  // skin
  const [skin] = useSkin();
  return (
    <div
      className={` logo-segment flex justify-between items-center bg-cyan-700 dark:bg-slate-800 z-[9] py-6  px-4 
      ${menuHover ? "logo-hovered" : ""}
      ${
        skin === "bordered"
          ? " border-b border-r-0 dark:border-slate-700"
          : " border-none"
      }
      
      `}
    >
      <Link to="/dashboard">
        <div className="flex items-center space-x-4">
          <div className="logo-icon">
            {!isDark && !isSemiDark ? (
              <img src={Logodb} alt="" className="w-20"/>
            ) : (
              <img src={Logodb} alt="" className="w-20"/>
            )}
          </div>

          {/* {(!collapsed || menuHover) && (
            <div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                DashCode
              </h1>
            </div>
          )} */}
        </div>
      </Link>

      {(!collapsed || menuHover) && (
        <div
          onClick={() => setMenuCollapsed(!collapsed)}
          className={`h-4 w-4 border-[1.5px] border-white-900 dark:border-white-700 rounded-full transition-all duration-150 animate-spin
          ${
            collapsed
              ? ""
              : "ring-2 ring-inset ring-offset-4 ring-white-900 dark:ring-slate-400 bg-slate-900 dark:bg-slate-400 dark:ring-offset-slate-700"
          }
          `}
        >
      </div>
    //   <div onClick={() => setMenuCollapsed(!collapsed)}> <Icon
    //   icon="clarity:settings-line"
    //   className="text-slate-50 text-lg animate-spin"
    // /></div>
      )}
    </div>
  );
};

export default SidebarLogo;
