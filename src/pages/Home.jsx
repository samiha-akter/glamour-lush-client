import React from "react";
import Banner from "../components/home/Banner";
import FeaturedProducts from "../components/home/FeaturedProducts";
import UserReviews from "../components/home/UserReviews";
import Accordion from "../components/home/Accordion";
import Heading from "../components/Heading";
import ContactHome from "../components/home/ContactHome";
import Carousel from "../components/home/Carousel";

export default function Home() {
  return (
    <div>
      <Banner />
      <div className="container mx-auto">
        <div className="my-24">
          <Heading text={"Product Categories"} />
          <Carousel />
        </div>
        <div className="my-24">
          <Heading text={"Featured Products"} />
          <FeaturedProducts />
        </div>
        <div className="my-24">
          <Heading text={"What Our Clients Say"} />
          <UserReviews />
        </div>
        <div className="my-24">
          <Heading text={"Frequently Asked Questions"} />
          <Accordion />
        </div>
        <div className="my-24">
          <Heading text={"Get In Touch"} />
          <ContactHome />
        </div>
      </div>
    </div>
  );
}
