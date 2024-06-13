import React, { useEffect, useRef } from "react";
import Title from "../components/common/Title";
import styled from "styled-components";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import BooksEmpty from "../components/books/BooksEmpty";
import Pagination from "../components/books/Pagination";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import { useBooks } from "../hooks/useBooks";
import Loading from "@/components/common/Loading";
import { useBooksInfinite } from "@/hooks/useBooksInfinity";
import Button from "@/components/common/Button";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const Books = () => {
  const moreRef = useIntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        loadMore();
      }
    }
  )
  const { books, pagination, isEmpty, isBooksLoading, fetchNextPage, hasNextPage } = useBooksInfinite();
  
  const loadMore = () => {
    if (!hasNextPage) return
    fetchNextPage();
  }

  if (isEmpty) {
    return <BooksEmpty />;
  }
  if (!books || !pagination || isBooksLoading) {
    return <Loading />
  }
  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BooksStyle>
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        {<BooksList books={books} />}
        {/* {<Pagination pagination={pagination} />} */}
        <div className="more" ref={moreRef}>
        </div>
      </BooksStyle>
    </>
  );
};

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
`;

export default Books;
