import { BookReviewItemWrite, BookReviewItem as IBookReviewItem } from '@/models/book.model';
import React from 'react'
import styled from 'styled-components';
import BookReviewItem from './BookReviewItem';
import BookReviewAdd from './BookReviewAdd';

interface Props {
    reviews : IBookReviewItem[];
    onAdd: (data: BookReviewItemWrite) => void;
}

const BookReview = ({ reviews, onAdd } : Props) => {
  return (
    <BookReviewStyle>
        <BookReviewAdd onAdd={onAdd} />
        {
            reviews.map((review) => (
                <BookReviewItem review={review}/>
            ))
        }
    </BookReviewStyle>
  ) 
}

const BookReviewStyle = styled.div`


`;
export default BookReview