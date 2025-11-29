import { Link } from "react-router";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="text-2xl font-semibold">Welcome Home</div>
      <Link to="/breaker" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition-colors">
        Find the breaker
      </Link>
    </div>
  );
};

export default Home;
