import { Link } from "react-router";

const Button = ({ url, text }) => {
  return (
    <>
      <Link to={`${url}`} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition-colors">
        {text}
      </Link>
    </>
  );
};
export default Button;
