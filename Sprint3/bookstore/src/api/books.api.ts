import { Book } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { httpClient } from "./http"

interface fetchBooksParams {
    category_id? : number;
    news? : boolean;
    currentPage? : number;
    limit : number;
}

interface fetchBooksResponse {
    books: Book[];
    pagination : Pagination;

}

export const fetchBooks = async (params:fetchBooksParams) => {
    try{
    const response = await httpClient.get<fetchBooksResponse>("/books",{
        params: params
    });
    return response.data;
    }
    catch (error) {
        return {
            books : [],
            pagination : {
                totalCount : 0,
                currentPage : 1,
            }
        }

    }
}