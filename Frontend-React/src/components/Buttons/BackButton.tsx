import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <Link to="/Events" className="px-5 py-2 bg-slate-400 text-white text-[0.95rem] rounded-md">
      Back
    </Link>
  );
};

export default BackButton