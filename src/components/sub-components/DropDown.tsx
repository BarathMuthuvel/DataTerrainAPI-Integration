"use client";
import IconComponent from "../container/IconComponent";

const Dropdown = () => {
  return (
    <div className="relative w-[100px] bg-white rounded">
      <div className="flex border border-sky-500 w-18 rounded-md cursor-pointer h-9 items-center ">
        <div
          className="outline-none shadow-sm appearance-none flex text-sm items-center h-[46px] "
        >
          <p className="px-3 font-semibold">Months</p>
        </div>
        <div
          className="flex items-center  bg-white w-[30%]"
        >
          <IconComponent icon="uiw:down" className="text-primary h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
