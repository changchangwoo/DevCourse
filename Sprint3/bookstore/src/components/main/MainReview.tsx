import { BookReviewItem as IBookReviewItem } from '@/models/book.model';
import React from 'react'
import styled from 'styled-components'
import BookReviewItem from '../book/BookReviewItem';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
    reviews : IBookReviewItem[];
}
const MainReview = ({reviews} : Props) => {
  const sliderSettings = {
    dots : true,
    Infinity: true,
    speed : 500,
    slideToShow : 3,
    sliderToScroll : 3,
    gap : 16,
  }
  return (
    <MianReivewStyle>
      <Slider {...sliderSettings}>
        {
            reviews.map((review) => (
                <BookReviewItem key={review.id} review={review} />
            ))
        }
        </Slider>
    </MianReivewStyle>
  )
}

const MianReivewStyle = styled.div`
  padding: 0 0 24px 0;
  .slick-track {
    padding: 12px 0;
  }
  .slick-slide > div {
    margin: 0 12px;
  }
  .slick-prev:before,
  .slick-next:before {
    color : #000;
  }
`
export default MainReview