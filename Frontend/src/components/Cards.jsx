import React from "react";

function Cards({ name, artist, image }) {
  return (
    <div className="flex items-center justify-center ">
      <div className=" w-[90%] bg-gray-300 h-[100px] m-2 rounded-lg flex items-center justify-between px-[10%]">
        <img src={image} alt="" className="w-15 rounded-xl " />
        <div className="flex flex-col items-center">
          <p>{name}</p>
          <p>{artist}</p>
        </div>
        {/* <img src={image} alt="" /> */}

        <button>Download</button>
      </div>
    </div>
  );
}

export default Cards;
