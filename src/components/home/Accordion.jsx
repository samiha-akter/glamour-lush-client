import React from "react";

const Accordion = () => {
  return (
    <div className="flex flex-col gap-2 w-4/5 lg:w-2/3 mx-auto">
      <div className="collapse collapse-arrow bg-base-100 border-2 border-purple-400 border-2 border-purple-400 ">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-semibold">
          What is your return policy?
        </div>
        <div className="collapse-content">
          <p>
            We want you to love every product you purchase! If you're not
            completely satisfied, you can return unused or gently used items
            within 30 days of purchase for a refund or exchange. Please ensure
            the product is in its original packaging. For more details, visit
            our <span className="font-bold">Returns & Refunds</span> page.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border-2 border-purple-400">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-semibold">
          Do you offer cruelty-free and vegan products?
        </div>
        <div className="collapse-content">
          <p>
            Yes! At Makeup Shop, we believe in ethical beauty. Many of our
            products are cruelty-free and vegan. You can find this information
            on the product description page or filter products using our
            Cruelty-Free and Vegan tags.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border-2 border-purple-400">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-semibold">
          How long does shipping take?
        </div>
        <div className="collapse-content">
          <p>
            Shipping times depend on your location:
            <ul className="list-disc p-5">
              <li>Standard Shipping: 5–7 business days</li>
              <li>Express Shipping: 2–3 business days</li>
              <li>International Shipping: 7–14 business days</li>
              <li>
                Tracking information will be emailed to you once your order is
                shipped.
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
