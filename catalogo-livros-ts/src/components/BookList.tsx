import type { BookListProps } from "../types";
import BookItem from "./BookItem";

function BookList({ books, onDeleteBook, onToggleStatus }: BookListProps) {
  if (books.length === 0) {
    return <p className="empty">Nenhum livro cadastrado ainda.</p>;
  }

  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookItem
          key={book._id}
          book={book}
          onDeleteBook={onDeleteBook}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </ul>
  );
}

export default BookList;