import React from "react";
const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary bg-opacity-25 ${
                i % 2 === 0 ? "animate-pulse opacity-75" : "opacity-50"
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
