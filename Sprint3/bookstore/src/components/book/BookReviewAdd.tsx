import { BookReviewItemWrite } from "@/models/book.model";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../common/Button";
import { tr } from "@faker-js/faker";

interface Props {
  onAdd: (data: BookReviewItemWrite) => void;
}

const BookReviewAdd = ({ onAdd }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookReviewItemWrite>();

  const handleAdd = (data: BookReviewItemWrite) => {
    onAdd(data);
  };

  return (
    <BookReviewAddStyle>
      <form onSubmit={handleSubmit(handleAdd)}>
        <fieldset>
          <textarea
            {...register("content", {
              required: true,
            })}
          ></textarea>
          {
            errors.content && <p className="error-text">
                리뷰 내용을 입력해 주세요
            </p>
          }
        </fieldset>
        <div className="submit">
        <fieldset>
          <select {...register("score", { required: true,
            valueAsNumber: true
          })}>
            <option value="1">1점</option>
            <option value="2">2점</option>
            <option value="3">3점</option>
            <option value="4">4점</option>
            <option value="5">5점</option>
          </select>
        </fieldset>
        <Button size="medium" scheme="primary">
            작성하기
          </Button>
          </div>
      </form>
    </BookReviewAddStyle>
  );
};

const BookReviewAddStyle = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 6px;

    fieldset {
      border: 0;
      padding: 0;
      margin: 0;
      display: flex;
      gap: 12px;
      justify-content: end;
      flex-direction: column;

      .error-text {
        color : red;
        margin: 0;
      }
    }
    textarea {
      width: 100%;
      height: 100px;
      border-radius: ${({ theme }) => theme.borderRadius.default};
      border: 1px solid ${({ theme }) => theme.color.border};
    }
  }
  .submit {
    display: flex;
    justify-content: center;
  }
`;
export default BookReviewAdd;
