import React from "react";

function ColorItem({ color }) {
  return (
    <div
      className="w-full h-24 p-4 border rounded flex justify-between items-center"
      style={{ backgroundColor: color }}
    >
      <p className="text-black px-4 py-2 bg-white bg-opacity-75 rounded uppercase">
        {color}
      </p>
    </div>
  );
}

export default ColorItem;
