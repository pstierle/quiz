import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex items-center justify-center min-h-full">
      <Link
        to="/quiz"
        className="bg-indigo-800 rounded-3xl py-4 px-10 text-white"
      >
        Start Quiz
      </Link>
    </div>
  );
}

export default LandingPage;
