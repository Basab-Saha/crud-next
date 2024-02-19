"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Book {
  id: string;
  title: string;
  date: string;
  checked: boolean;
}

const Page = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch('api/books');
      const data = await response.json();
      setBooks(data);
    };
    getBooks();
  }, []);

  const handleEditClick = (bookId: string) => {
    // Navigate to the edit page for the selected book
    router.push(`books/edit?id=${bookId}`);
  };

  const handleDeleteClick = async (bookId: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      const response = await fetch(`api/books/${bookId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // Reload the books after deletion
        const updatedBooks = books.filter(book => book.id !== bookId);
        setBooks(updatedBooks);
      } else {
        alert('Failed to delete book');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Books</h2>
        <ul>
          {books.length === 0 && <p>No Books are there!</p>}
          {books.map((book: Book) => {
            return (
              <div key={book.id} className="mb-4 p-4 bg-gray-200 dark:bg-gray-700 rounded-md">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{book.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{book.date}</p>
                <div className="flex justify-between mt-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleEditClick(book.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDeleteClick(book.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Page;
