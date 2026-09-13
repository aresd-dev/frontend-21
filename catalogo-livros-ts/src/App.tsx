import { useEffect, useState } from "react";
import axios from "axios";
import type { Book, NewBook, Status } from "./types";
import { mockBooks } from "./mockBooks";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import "./App.css";

const API_URL = "https://crudcrud.com/api/8b210ddc34a44b71b063933aec3bc923/livros";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [offline, setOffline] = useState<boolean>(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get<Book[]>(API_URL);
      setBooks(response.data);
      setOffline(false);
      setError(null);
    } catch (err) {
      console.error(err);
      setBooks(mockBooks);
      setOffline(true);
      setError(
        "Não foi possível conectar ao CrudCrud. Modo offline ativado: exibindo dados de exemplo."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (newBook: NewBook): Promise<void> => {
    if (offline) {
      const localBook: Book = { ...newBook, _id: `mock-${Date.now()}` };
      setBooks((prev) => [...prev, localBook]);
      return;
    }

    try {
      const response = await axios.post<Book>(API_URL, newBook);
      setBooks((prev) => [...prev, response.data]);
    } catch (err) {
      console.error(err);
      const localBook: Book = { ...newBook, _id: `mock-${Date.now()}` };
      setBooks((prev) => [...prev, localBook]);
      setOffline(true);
      setError(
        "Não foi possível conectar ao CrudCrud. Modo offline ativado: as próximas ações ficam só locais."
      );
    }
  };

  const handleDeleteBook = async (id: string): Promise<void> => {
    if (offline) {
      setBooks((prev) => prev.filter((book) => book._id !== id));
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);
      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (err) {
      console.error(err);
      setBooks((prev) => prev.filter((book) => book._id !== id));
      setOffline(true);
      setError(
        "Não foi possível conectar ao CrudCrud. Modo offline ativado: as próximas ações ficam só locais."
      );
    }
  };

  // Parte opcional do enunciado: atualizar o status do livro (PUT)
  const handleToggleStatus = async (book: Book): Promise<void> => {
    if (!book._id) return;

    const newStatus: Status = book.status === "Lido" ? "Não lido" : "Lido";

    if (offline) {
      setBooks((prev) =>
        prev.map((b) => (b._id === book._id ? { ...b, status: newStatus } : b))
      );
      return;
    }

    // CrudCrud espera o _id só na URL; o corpo deve trazer apenas os demais campos
    const bodyToSend: Omit<Book, "_id"> = {
      title: book.title,
      author: book.author,
      status: newStatus,
    };

    try {
      await axios.put(`${API_URL}/${book._id}`, bodyToSend);
      setBooks((prev) =>
        prev.map((b) => (b._id === book._id ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      console.error(err);
      setBooks((prev) =>
        prev.map((b) => (b._id === book._id ? { ...b, status: newStatus } : b))
      );
      setOffline(true);
      setError(
        "Não foi possível conectar ao CrudCrud. Modo offline ativado: as próximas ações ficam só locais."
      );
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