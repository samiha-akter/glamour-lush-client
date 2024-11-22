import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "../ReviewCard";

export default function UserReviews() {
  const [reviews, setReviews] = useState([]); 

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("./reviews.json"); 
        setReviews(res.data.reviews);
        
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-wrap p-3">
      {
        reviews?.map((review) => (
          <ReviewCard
            key={review.id} 
            desc={review.review} 
            name={review.name} 
          />
        ))
       }
    </div>
  );
}
