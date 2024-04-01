import React from "react";

function Cards({ vals, ind }) {
  return (
    <div className="flex items-center justify-center ">
      <div className=" w-[90%] bg-gray-300 h-[80px] m-2 rounded-lg flex items-center justify-around">
        <img
          src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
          alt=""
          className="w-10"
        />
        <p>{ind}</p>
        <p>{vals}</p>

        <button>Download</button>
      </div>
    </div>
  );
}

export default Cards;
