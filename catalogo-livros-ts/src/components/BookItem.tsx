import type { BookItemProps } from "../types";

function BookItem({ book, onDeleteBook, onToggleStatus }: BookItemProps) {
  const isLido = book.status === "Lido";

  return (
    <li className="book-item">
      <div className="book-info">
        <strong>{book.title}</strong>
        <span className="author"> — {book.author}</span>
        <span className={`status ${isLido ? "lido" : "nao-lido"}`}>
          {book.status}
        </span>
      </div>
      <div className="actions">
        <button onClick={() => onToggleStatus(book)}>
          Marcar como {isLido ? "não lido" : "lido"}
        </button>
        <button onClick={() => book._id && onDeleteBook(book._id)}>
          Remover
        </button>
      </div>
    </li>
  );
}

export default BookItem;