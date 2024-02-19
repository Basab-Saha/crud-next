"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface BookProps {
  title: string;
  date: string;
}

const Page = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [book, setBook] = useState<BookProps | undefined>(undefined);
  const router = useRouter();

  const searchParams = useSearchParams();
  const bookId = searchParams.get('id');
  //console.log(bookId);

  useEffect(() => {
    const getBook = async () => {
      const response = await fetch(`/api/books/${bookId}`);
      const data = await response.json();
      setBook(data);
      console.log("book", data);
    };
    if (bookId) {
      getBook();
    }
  }, [bookId]);

  const handleEdit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!title || !date) return alert('Please fill in all fields');
    const response=await fetch(`/api/books/${bookId}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({title,date})
        
    });
    if(response.ok){
      alert('Book Edited Successfully');
      router.push('/books');
    }
    else{
      alert('Failed to edit book');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="max-w-lg w-full p-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
      {book ? (
        <>
          <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
          <p className="text-gray-700 dark:text-gray-300">{book.date}</p>

          <form onSubmit={handleEdit} className="mt-4">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input type="text" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Edit</button>
          </form>
          <button onClick={()=>router.push('/books')}>Go to Books</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  </div>
  );
};

export default Page;