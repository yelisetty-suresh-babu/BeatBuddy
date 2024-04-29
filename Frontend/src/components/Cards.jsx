import React from "react";

function Cards({ name, artist, image2 }) {
  // console.log(image2)
  return (
    <div className="flex items-center justify-center animate-fade text-[#fff18a]">
      <div className=" w-[90%] bg-slate-400 h-[100px] m-2 rounded-lg flex items-center justify-between px-[10%]">
        <img src={image2} alt="" className="w-15 rounded-xl " />
        <div className="flex flex-col items-center">
          <p>{name}</p>
          <p>{artist}</p>
        </div>
        {/* <img src={image} alt="" /> */}

        <button className="bg-[#eab308] text-white px-2 rounded-md py-1">
          Download
        </button>
      </div>
    </div>
  );
}

export default Cards;
