export type Status = "Lido" | "Não lido";

export interface Book {
  _id?: string;
  title: string;
  author: string;
  status: Status;
}

// Formato enviado no POST, sem o _id (quem gera o _id é a API)
export type NewBook = Omit<Book, "_id">;

export interface BookFormProps {
  onAddBook: (book: NewBook) => void;
}

export interface BookItemProps {
  book: Book;
  onDeleteBook: (id: string) => void;
  onToggleStatus: (book: Book) => void;
}

export interface BookListProps {
  books: Book[];
  onDeleteBook: (id: string) => void;
  onToggleStatus: (book: Book) => void;
}