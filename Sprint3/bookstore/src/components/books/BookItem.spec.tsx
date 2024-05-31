import { getByAltText, getByText, render } from "@testing-library/react";
import { BookStoreThemeProvider } from "../../context/themeContext";
import React from "react";
import BookItem from "./BookItem";

const dummyBook = {
    id : 1,
    title : "Dummy title",
    img : 5,
    category_id : 1,
    form : "Dummy form",
    isbn : "Dummy isbn",
    summary : "Dummy summary",
    detail : "Dummy detail",
    author : "Dummy author",
    pages : 100,
    contents: "Dummy contents",
    price : 5000,
    likes : 3,
    pubDate  : "Dummy date",
}


describe("BookItem 테스트", () => {
  it("렌더 여부", () => {
    const { getByText } = render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>
    );
    expect(getByText(dummyBook.title)).toBeInTheDocument();
    expect(getByText(dummyBook.summary)).toBeInTheDocument();
    expect(getByText(dummyBook.author)).toBeInTheDocument();
    expect(getByText("5,000원")).toBeInTheDocument();
    expect(getByText(dummyBook.likes)).toBeInTheDocument();
    // expect(getByAltText(dummyBook.title)).toHaveAttribute(
    //     "src", `https://picsum.photos/id/${dummyBook.img}/600.600`
    // );
  });
});
