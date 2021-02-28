import React from 'react';
import BeautyStars from 'beauty-stars';
export default function Rating({ reviews, size }) {
  const calculateStars = (reviews) => {
    if (reviews.length < 1) {
      return 0;
    }
    var stars = 0;
    for (let review of reviews) {
      stars = stars + review.rating;
    }
    return Math.round(stars / reviews.length);
  };
  return (
    <BeautyStars
      size={size}
      inactiveColor="gray"
      value={calculateStars(reviews)}
    />
  );
}
