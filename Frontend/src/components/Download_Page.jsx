import React from "react";

function Download_Page() {
  return (
    <div className="flex flex-col items-center justify-center bg-white mt-10">
      <button className="self-start ml-10">←</button>
      <div
        className="w-96 h-56 bg-cover bg-center flex items-end justify-center rounded-xl"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg')",
        }}
      >
        <button className="h-10 w-fit relative top-[27px] bg-green-500 p-2 rounded-lg text-white">
          Download
        </button>
      </div>
    </div>
  );
}

export default Download_Page;
