"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    if (!title || !date) return alert('Please fill in all fields');
    e.preventDefault();

    const response = await fetch('api/create-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, date })
    });

    // Handle response
    if(response.ok){
        alert('Post Created Succesfully');
        setDate('');
        setTitle('');
        router.push('/books');
    }
    else{
        alert('Failed to create post');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Title</label>
            <input
              type="text"
              id="title"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Date</label>
            <input
              type="text"
              id="date"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
        <button
          onClick={() => router.push('/books')}
          className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Go to Books
        </button>
      </div>
    </div>
  );
}

export default Page;
