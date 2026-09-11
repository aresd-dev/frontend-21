import { useEffect, useState } from "react";
import axios from "axios";
import type { Book, NewBook } from "./types";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import "./App.css";

// Troque pelo endpoint gerado na sua conta do crudcrud.com
const API_URL = "https://crudcrud.com/api/c009d381b1ba4aa2b3b94b4cbe093e37";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get<Book[]>(API_URL);
      setBooks(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar os livros.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (newBook: NewBook): Promise<void> => {
    try {
      const response = await axios.post<Book>(API_URL, newBook);
      setBooks((prev) => [...prev, response.data]);
    } catch (err) {
      console.error(err);
      setError("Não foi possível adicionar o livro.");
    }
  };

  const handleDeleteBook = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (err) {
      console.error(err);
      setError("Não foi possível remover o livro.");
    }
  };

  // Parte opcional do enunciado: atualizar o status do livro (PUT)
  const handleToggleStatus = async (book: Book): Promise<void> => {
    if (!book._id) return;

    const updatedBook: Book = {
      ...book,
      status: book.status === "Lido" ? "Não lido" : "Lido",
    };

    try {
      await axios.put(`${API_URL}/${book._id}`, updatedBook);
      setBooks((prev) =>
        prev.map((b) => (b._id === book._id ? updatedBook : b))
      );
    } catch (err) {
      console.error(err);
      setError("Não foi possível atualizar o status do livro.");
    }
  };

  return (
    <div className="app">
      <h1>Catálogo de Livros</h1>

      <BookForm onAddBook={handleAddBook} />

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <BookList
          books={books}
          onDeleteBook={handleDeleteBook}
          onToggleStatus={handleToggleStatus}
        />
      )}
    </div>
  );
}

export default App;