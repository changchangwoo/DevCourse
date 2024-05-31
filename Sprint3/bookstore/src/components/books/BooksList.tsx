import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BookItem from "./BookItem";
import { Book } from "../../models/book.model";
import { useLocation } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";
import { ViewMode } from "./BooksViewSwitcher";

interface Props {
  books: Book[];
}

const dummyBook = {
  id: 1,
  title: "Dummy title",
  img: 5,
  category_id: 1,
  form: "Dummy form",
  isbn: "Dummy isbn",
  summary: "Dummy summary",
  detail: "Dummy detail",
  author: "Dummy author",
  pages: 100,
  contents: "Dummy contents",
  price: 5000,
  likes: 3,
  pubDate: "Dummy date",
};

const BooksList = ({ books }: Props) => {
  const location = useLocation();
  const [view, setView] = useState<ViewMode>("grid");
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get(QUERYSTRING.VIEW)) {
      setView(params.get(QUERYSTRING.VIEW) as ViewMode);
    }
  });
  return (
    <BooksListStyle view={view}>
      {books.map((item) => (
        <BookItem key={item.id} book={item}></BookItem>
      ))}
    </BooksListStyle>
  );
};

interface BooksListStyleProps {
    view : ViewMode
}

const BooksListStyle = styled.div<BooksListStyleProps>`
  display: grid;
  grid-template-columns: ${({ view }) => (view === "grid" ? "repeat(4, 1fr)" :
"repeat(1, 1fr")};
  gap: 24px;
`;
export default BooksList;
