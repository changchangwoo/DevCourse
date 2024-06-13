import { BookReviewItem } from "@/models/book.model";
import { http, HttpResponse } from "msw";
import { fakerKO } from "@faker-js/faker"

const mockReviewData: BookReviewItem[] = Array.from({length : 8}).map((_, index) => ({
    id : index,
    userName : `${fakerKO.person.firstName()}${fakerKO.person.lastName()}`,
    content : fakerKO.lorem.paragraph(),
    createdAt : fakerKO.date.past().toISOString(),
    score : fakerKO.helpers.rangeToNumber({min : 1, max : 5}),
}));

export const reviewsById = http.get("http://127.0.0.1:9999/reviews/:bookId", () => {
    return HttpResponse.json({mockReviewData}, {status : 200})
})

export const addReview = http.post("http://127.0.0.1:9999/reviews/:bookId", () => {
    return HttpResponse.json({
        message : "리뷰가 등록되었습니다"
    }, {status : 200})
})

export const reviewForMain = http.get("http://127.0.0.1:9999/reviews", () => {
    return HttpResponse.json(mockReviewData, {
        status : 200,
    });
});