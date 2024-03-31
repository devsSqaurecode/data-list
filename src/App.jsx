import { Link } from "react-router-dom"; // Import Link component
import { categories } from "./constants";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const navigate = useNavigate();

  const categoryPhotos = {
    Textiles: "/images/textile.jpeg",
    Groceries: "/images/groceries.jpeg",
    Furniture: "/images/furniture.jpeg",
    Electronics: "/images/electronics.jpeg",
    Kitchen: "/images/kitchen.jpeg",
  };

  const handleFormButtonClick = () => {
    navigate("/form");
  };

  return (
    <div className="bg-white h-screen w-full">
      <Header />
      <div className="main-content w-full h-full p-4 flex flex-col gap-12 justify-center items-center">
        <div className="grid grid-cols-2 gap-2 md:flex md:justify-center">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white h-min w-full md:max-w-sm shadow-md"
            >
              <Link to={`/store/${category}`}>
                <img
                  className="w-full aspect-video object-cover"
                  src={categoryPhotos[category]}
                  alt=""
                />
                <p className="bg-black p-2 text-white body-text-bold text-center">
                  {category}
                </p>
              </Link>
            </div>
          ))}
        </div>
        <button
          className="body-text-bold button-main"
          onClick={handleFormButtonClick}
        >
          Add Store
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default App;
