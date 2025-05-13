import React from "react";

const Logo: React.FC = ({ color }) => {
  return (
    <div className="relative flex items-center justify-center">
      <img
        src={color === "white" ? "/images/logo_white.png" : "/images/logo.png"}
        alt="logo"
        width={90}
      />
    </div>
  );
};

export default Logo;
