import React from "react";

export default function Heading({ text }) {
  return (
    <>
      <h1 className="text-2xl font-bold mt-7 text-center">{text}</h1>
      <div class="mt-2 text-center mb-7 ">
        <span class="inline-block w-40 h-2    bg-purple-400   rounded-full"></span>
        <span class="inline-block w-4 h-2 ml-1  bg-purple-400     rounded-full"></span>
        <span class="inline-block w-2 h-2 ml-1  bg-purple-400     rounded-full"></span>
      </div>
    </>
  );
}
