import React from "react";
import IconComponent from "../container/IconComponent";

const Search = () => {
  return (
    <div className="flex items-center justify-between bg-white h-11 w-[320px] rounded py-2 px-4 shadow-md border">
      <input
        type="text"
        placeholder="Search"
        className="bg-white w-[200px] outline-none h-9 text-xs text-gray-400"
      />
      <IconComponent
        icon="carbon:search"
        className="w-5 cursor-pointer text-gray-400 bg-white h-9"
      />
    </div>
  );
};

export default Search;
