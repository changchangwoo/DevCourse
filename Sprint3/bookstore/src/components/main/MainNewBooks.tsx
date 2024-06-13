import { Book } from '@/models/book.model';
import styled from 'styled-components';
import BookItem from '../books/BookItem';

interface Props {
    books : Book[];
}

const MainNewBooks = ({books} : Props) => {
  return (
    <MainNewBookStyle>
        {
            books.map((book) => (
                <BookItem key={book.id} book={book} view="grid"/>
            ))
        }
        
    </MainNewBookStyle>
  )
}

const MainNewBookStyle = styled.div`
display: grid;
grid-template-columns: repeat(4, 1fr);
`;
export default MainNewBooks