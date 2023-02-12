import React from "react";
import { arrowDown, download } from "../assets";
import { downloadImage } from "../utils";

const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className="rounded-2xl group relative bg-white card border">
      <img
        className="w-full h-auto object-cover rounded-2xl scale-90 group-hover:scale-100 transition duration-200 ease-in-out"
        src={photo}
        alt={prompt}
      />
      <div className="flex flex-col max-h-[94.5%]  absolute bottom-0 left-0 right-0 bg-gray-100 m-3 p-4 rounded-2xl translate-y-12 opacity-0 bg-opacity-[0.7] group-hover:translate-y-0 group-hover:opacity-[1] backdrop-blur-md duration-200 scale-90 group-hover:scale-100 shadow-inset z-30">
        <p className="text-slate-900 font-semibold text-sm overflow-y-auto prompt">
          {prompt}
        </p>
        <div className="mt-3 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-white flex justify-center items-center text-slate-800 text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-slate-800 text-sm">{name}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="outline-none border-none p-2 rounded-3xl bg-white"
          >
            <img
              src={arrowDown}
              alt="download"
              className="w-4 h-4 object-contain transform transition duration-300 ease-in-out hover:scale-110 "
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
