import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { BookFormProps, NewBook, Status } from "../types";

function BookForm({ onAddBook }: BookFormProps) {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [status, setStatus] = useState<Status>("Não lido");

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAuthor(e.target.value);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setStatus(e.target.value as Status);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    const newBook: NewBook = { title, author, status };
    onAddBook(newBook);

    setTitle("");
    setAuthor("");
    setStatus("Não lido");
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        type="text"
        placeholder="Autor"
        value={author}
        onChange={handleAuthorChange}
      />
      <select value={status} onChange={handleStatusChange}>
        <option value="Não lido">Não lido</option>
        <option value="Lido">Lido</option>
      </select>
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default BookForm;