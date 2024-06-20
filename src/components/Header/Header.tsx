import React from "react";
import logo from "../../Images/logo.png";
import Search from "../sub-components/Search";
import IconComponent from "../container/IconComponent";
import user from "../../Images/user.png";

const Header = () => {
  const icons = [
    "ph:sun-thin",
    "uil:file-upload-alt",
    "fluent:chat-48-regular",
    "lets-icons:bell-pin-light",
    "carbon:settings",
  ];

  const iconClassName = "w-7 cursor-pointer text-gray-400 bg-white h-9"; 
  return (
    <div className="h-1/5 p-2 bg-white shadow-md flex items-center">
      <div className="flex items-center gap-12 w-4/6 h-14">
        <img src={logo} alt="talent acquisition" className="h-12" />
        <Search />
      </div>
      <div className="flex gap-20 px-4">
        {icons.map((icon, index) => (
          <IconComponent
            key={index}
            icon={icon}
            className={
              icon === "ph:sun-thin"
                ? "w-7 cursor-pointer text-gray-900 bg-white h-9"
                : iconClassName
            }
          />
        ))}
        <img src={user} alt="user" className="h-8 w-8" />
      </div>
    </div>
  );
};

export default Header;
