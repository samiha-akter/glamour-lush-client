import React from "react";

export default function Banner() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-photo/close-up-collection-make-up-beauty-products_23-2148620012.jpg?t=st=1731694756~exp=1731698356~hmac=4ac4ea40244737bdad9e406dd37603ea7d7faed951475390dfaedd49dbd28b4f&w=740)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-white">Welcome to Glamour Lush!</h1>
          <p className="mb-5 text-white">
            Unleash Your Inner Glow – Discover Beauty Redefined at Makeup Shop!
            💄✨
          </p>
        </div>
      </div>
    </div>
  );
}
