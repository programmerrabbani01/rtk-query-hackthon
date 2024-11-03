import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="max-w-[1140px] mx-auto py-7">
        <h1 className="mt-40 font-mono text-5xl font-bold text-center transition-all duration-300 text-rose-700 hover:text-rose-400">
          Welcome To Home
        </h1>
        {/* menu */}
        <div className="flex items-center justify-center gap-4 mt-7">
          <Link
            to="/blog"
            className="inline-block px-8 py-2 text-white transition-all duration-300 rounded-md bg-rose-700 hover:bg-rose-600"
          >
            Blogs
          </Link>
          <Link
            to="/deVs"
            className="inline-block px-8 py-2 text-white transition-all duration-300 rounded-md bg-rose-700 hover:bg-rose-600"
          >
            Developers
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
