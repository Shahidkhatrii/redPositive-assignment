import React from "react";

const NavBar = () => {
  return (
    <>
      <nav className="bg-white h-[10vh] border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              RedPositive Assignment
            </span>
          </a>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
