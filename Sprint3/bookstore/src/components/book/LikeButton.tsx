import React from "react";
import { BookDetail } from "../../models/book.model";
import styled from "styled-components";
import Button from "../common/Button";
import { FaHeart } from "react-icons/fa";

interface Props {
  book: BookDetail;
  onClick: () => void;
}

const LikeButton = ({ book, onClick }: Props) => {
  return (
    <div>
      <LikeButtonStyle size="medium" 
      scheme={book.liked ? "like" : "normal"}
      onClick={onClick}>
        <FaHeart />
        {book.likes}
      </LikeButtonStyle>
    </div>
  );
};

const LikeButtonStyle = styled(Button)`
  display: flex;
  gap: 6px;

  svg {
    color: inherit;
    * {
      color: inherit;
    }
  }
`;

export default LikeButton;
