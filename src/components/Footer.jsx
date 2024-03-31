import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="body-text-bold bg-black h-40 text-white flex items-end justify-center">
      <div className="flex flex-col justify-center gap-2 text-center mb-8">
        <span>
          &copy;{" "}
          <Link to="/" className="underline">
            Store Manager
          </Link>{" "}
          2024. All Rights Reserved.
        </span>
        <span>
          Powered by{" "}
          <a href="https://squarecode.in" className="text-yellow-600 underline">
            SquareCode
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
