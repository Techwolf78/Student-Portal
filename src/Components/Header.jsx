import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-semibold">Student Dashboard</h1>
      <button className="text-sm text-blue-500 hover:underline">Logout</button>
    </div>
  );
};

export default Header;
