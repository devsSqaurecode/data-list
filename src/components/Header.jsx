import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleFormButtonClick = () => {
    navigate("/form");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="w-full p-4 flex justify-between items-center bg-black">
      <p
        className="text-xl text-white uppercase font-bold cursor-pointer"
        onClick={handleLogoClick}
      >
        Store Manager
      </p>
      <button
        className="body-text-bold button-main bg-white text-black"
        onClick={handleFormButtonClick}
      >
        Add Store
      </button>
    </header>
  );
};

export default Header;
