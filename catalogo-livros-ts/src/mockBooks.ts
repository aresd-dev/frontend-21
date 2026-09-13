import type { Book } from "./types";

// Dados usados como fallback quando a API do CrudCrud não está disponível
export const mockBooks: Book[] = [
  {
    _id: "mock-1",
    title: "Dom Casmurro",
    author: "Machado de Assis",
    status: "Lido",
  },
  {
    _id: "mock-2",
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    status: "Não lido",
  },
];