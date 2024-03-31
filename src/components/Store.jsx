import { useState, useEffect } from "react";
import { firestore } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";
import ItemCard from "./ItemCard";

function Store() {
  const { category } = useParams();
  const [formData, setFormData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [emptyTermError, setEmptyTermError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(category);
        const q = query(
          collection(firestore, "formData"),
          where("category", "==", category),
        );
        const querySnapshot = await getDocs(q);
        const formDataArray = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          formDataArray.push({
            id: doc.id,
            name: data.name,
            description: data.description,
            contactNumber: data.contactNumber,
            address: data.address,
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            imageUrls: data.imageUrls,
          });
        });

        setFormData(formDataArray);
        setFilteredData(formDataArray);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;

    if (id === "city") setSearchCity(value);
    else if (id === "search") setSearchTerm(value);
  };

  const filterItems = () => {
    const trimmedCityTerm = searchCity.trim().toLowerCase();
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();

    if (!(trimmedCityTerm || trimmedSearchTerm)) {
      setEmptyTermError(true);
    } else setEmptyTermError(false);

    const newFilteredData = formData.filter((data) => {
      const cityLowerCase = data.city.toLowerCase();
      const nameLowerCase = data.name.toLowerCase();

      if (trimmedCityTerm && trimmedSearchTerm) {
        if (
          cityLowerCase.includes(trimmedCityTerm) &&
          nameLowerCase.includes(trimmedSearchTerm)
        )
          return data;
      } else if (trimmedCityTerm && cityLowerCase.includes(trimmedCityTerm))
        return data;
      else if (trimmedSearchTerm && nameLowerCase.includes(trimmedSearchTerm))
        return data;
    });

    if (trimmedCityTerm || trimmedSearchTerm) setFilteredData(newFilteredData);
  };

  const resetFilterItems = () => {
    setEmptyTermError(false);
    setSearchCity("");
    setSearchTerm("");
    setFilteredData(formData);
  };

  return (
    <div className="App p-4 w-full md:max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-center">{category}</h1>
      <div className="bg-gray-50 p-4 pt-8 pb-4 border shadow mb-8">
        <div className="flex gap-2 mb-4" onChange={handleInputChange}>
          <input
            type="text"
            id="city"
            value={searchCity}
            placeholder="City"
            className="w-2/3  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white"
          />
          <input
            type="text"
            id="search"
            value={searchTerm}
            placeholder="Type to search"
            className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2 justify-end items-center">
          {emptyTermError && (
            <p className="text-red-500">Enter at least one search term.</p>
          )}
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={filterItems}
          >
            Search
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={resetFilterItems}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center">
        {filteredData.map((formDataItem) => (
          <ItemCard formDataItem={formDataItem} key={formDataItem.id} />
        ))}
      </div>
    </div>
  );
}

export default Store;
