## 회원 API

1. 회원 가입

   | Method           | POST     |
   | ---------------- | -------- |
   | URI              | /join    |
   | HTTP status code | 성공 200 |
   | Request Body     | {        |

   email : “사용자가 입력한 이메일”,
   password : “사용자가 입력한 비밀번호”,
   } |
   | Response Body | |

2. 로그인

   | Method           | POST     |
   | ---------------- | -------- |
   | URI              | /login   |
   | HTTP status code | 성공 200 |
   | Request Body     | {        |

   email : “사용자가 입력한 이메일”,
   password : “사용자가 입력한 비밀번호”,
   } |
   | Response Body | JWT Token |
   | | |

3. 비밀번호 초기화 요청

   | Method                             | POST     |
   | ---------------------------------- | -------- |
   | URI                                | /reset   |
   | HTTP status code                   | 성공 200 |
   | Request Body                       | {        |
   | email : “사용자가 입력한 이메일”,} |
   | Response Body                      |          |

4. 비밀번호 초기화

   | Method           | PUT      |
   | ---------------- | -------- |
   | URI              | /reset   |
   | HTTP status code | 성공 200 |
   | Request Body     | {        |

   password : “사용자가 입력한 이메일”,
   } |
   | Response Body | |

## 도서 API

1.  전체 도서 조회
    // 이미지 경로
        | Method | GET |
        | --- | --- |
        | URI | /books |
        | HTTP status code | 성공 200 |
        | Request Body |  |
        | Response Body | [
        {
        title : “도서 제목“
        summary : “요약 설명”,
        author : “도서 작가”,
        price : 가격,
        likes : 좋아요 수,
        pubDate : “출간일”,
        },
        {
        title : “도서 제목“
        summary : “요약 설명”,
        author : “도서 작가”,
        price : 가격,
        likes : 좋아요 수,
        pubDate : “출간일”
        },
        …
        ] |
2.  개별 도서 조회

    // 이미지 경로

    | Method           | GET             |
    | ---------------- | --------------- |
    | URI              | /books/{bookid} |
    | HTTP status code | 성공 200        |
    | Request Body     |                 |
    | Response Body    | {               |

    id : 도서 id,
    title : “도서 제목“,
    category : “카테고리”,
    format : “포맷”,
    isbn : “isbn”,
    summary : “요약 설명”,
    discription : “상세 설명”,
    author : “도서 작가”,
    pages : “쪽 수“,
    index : “목차”,
    price : 가격,
    likes : 좋아요 수,
    liked : boolean,
    pubDate : “출간일”
    }, |

3.  카테고리 별 도서 목록 조회
    // 이미지 경로, 8개씩 보내줘야함
    // 카테고리 id… 어떻게 보내줄까
        | Method | GET |
        | --- | --- |
        | URI | /books?categoryid={categoryid}&new={Boolean} |
        | HTTP status code | 성공 200 |
        | Request Body |  |
        | Response Body | [
        {
        title : “도서 제목“
        summary : “요약 설명”,
        author : “도서 작가”,
        price : 가격,
        likes : 좋아요 수
        },
        {
        title : “도서 제목“
        summary : “요약 설명”,
        author : “도서 작가”,
        price : 가격,
        likes : 좋아요 수,
        pubDate : “출간일”
        },
        …
        ] |
        - 쿼리스트링을 통해서 get 메소드 요청이 들어왔을 때 조건을 설정할 수 있다
            - categoryid별로 정렬, new의 Boolean타입으로 신간/구간 정렬

        ## 좋아요 API

        1. 좋아요 추가


            | Method | PUT |
            | --- | --- |
            | URI | /likes/{bookId} |
            | HTTP status code | 성공 200 |
            | Request Body |  |
            | Response Body |  |
        2. 좋아요 취소


            | Method | PUT |
            | --- | --- |
            | URI | /likes/{bookId} |
            | HTTP status code | 성공 200 |
            | Request Body |  |
            | Response Body |  |

        ## 장바구니 API

        1. 장바구니 담기


            | Method | POST |
            | --- | --- |
            | URI | /cart |
            | HTTP status code | 성공 201 |
            | Request Body | {
            bookid : 도서 id,
            count : 수량,
            } |
            | Response Body |  |
        2. 장바구니


            | Method | GET |
            | --- | --- |
            | URI | /cart |
            | HTTP status code | 성공 200 |
            | Request Body | [
            {
            bookdid : 도서 id,
            title : “도서 제목”,
            summary: “도서 요약”,
            count : 수량,
            price : 가격
            },
            {
            bookdid : 도서 id,
            title : “도서 제목”,
            summary: “도서 요약”,
            count : 수량,
            price : 가격
            },
            …
            ] |
            | Response Body |  |
        3. 장바구니 도서 삭제


            | Method | DELETE |
            | --- | --- |
            | URI | /cart/{bookId} |
            | HTTP status code | 성공 200 |
            | Request Body |  |
            | Response Body |  |

        ## 주문 API

        1. 장바구니에서 선택한 상품 목록 조회


            | Method | GET |
            | --- | --- |
            | URI | /order |
            | HTTP status code | 성공 200 |
            | Request Body |  |
            | Response Body | [
            {
            cartItemId : 장바구니 도서 id,
            bookdid : 도서 id,
            title : “도서 제목”,
            summary: “도서 요약”,
            count : 수량,
            price : 가격
            },
            {
            cartItemId : 장바구니 도서 id,
            bookdid : 도서 id,
            title : “도서 제목”,
            summary: “도서 요약”,
            count : 수량,
            price : 가격
            },
            …
            ] |
