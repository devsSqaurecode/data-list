import { Link } from "react-router-dom"; // Import Link component
import { categories } from "./constants";
import { useNavigate } from "react-router-dom";

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
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex space-x-4 mb-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <Link to={`/store/${category}`}>
              <img
                className="rounded-t-lg"
                src={categoryPhotos[category]}
                alt=""
              />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {category}
                </h5>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleFormButtonClick}
      >
        Go to Form
      </button>
    </div>
  );
};

export default App;
