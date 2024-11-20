import React from "react";
function About() {
  return (
    <div className="hero mt-7 mb-9 ">
      <div className="hero-content flex-col md:flex-row justify-center items-center">
        <div className="relative">
          <img
            src="https://static.vecteezy.com/system/resources/previews/047/010/016/non_2x/make-up-cosmetic-product-beauty-products-and-cosmetics-swatch-sample-flatlay-various-makeup-brand-tools-as-glamour-fashion-night-out-background-photo.jpg"
            className="rounded-lg"
          />
        </div>

        <div>
          <p className="py-6 text-center text-5xl font-bold">
            Welcome To{" "}
            <span className=" text-medium text-deep font-bold">
              Glamour Lush
            </span>
          </p>
          <p className=" mb-6">
            At Glamour Lush, we’re devoted to transforming the art of beauty
            shopping into a seamless and luxurious experience. Our curated
            selection of makeup essentials and skincare wonders is designed to
            cater to every unique style, skin type, and occasion. With our
            intuitive platform, beauty enthusiasts can effortlessly explore,
            compare, and shop the latest trends, from everyday basics to bold
            statement looks.
            <br />
            <br />
            Whether you’re a budding makeup artist or a beauty connoisseur,
            Glamour Lush provides the tools, inspiration, and support you need
            to elevate your routine. Our commitment to quality, innovation, and
            personalized service ensures that your journey to radiance is smooth
            and fulfilling.
            <br />
            <br />
            Focus on what truly matters – embracing your beauty, expressing your
            creativity, and radiating confidence. Discover the magic of
            effortless glam with Glamour Lush today.
            <br />
            <br />
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
