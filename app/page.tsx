import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold mb-4">Home Page</h1>
      <Link legacyBehavior href="/create-post">
        <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">
          Create New Post
        </a>
      </Link>
    </div>
  );
}
