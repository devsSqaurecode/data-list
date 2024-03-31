import { useState, useEffect } from "react";
import { firestore } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";
import ItemCard from "./ItemCard";
import Header from "./Header";
import Footer from "./Footer";

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

  const handleDelete = (deletedItemId) => {
    // Filter out the deleted item from the formData state
    const updatedFormData = formData.filter(
      (item) => item.id !== deletedItemId,
    );
    setFormData(updatedFormData);

    // Also update the filteredData state if necessary
    const updatedFilteredData = filteredData.filter(
      (item) => item.id !== deletedItemId,
    );
    setFilteredData(updatedFilteredData);
  };

  const resetFilterItems = () => {
    setEmptyTermError(false);
    setSearchCity("");
    setSearchTerm("");
    setFilteredData(formData);
  };

  return (
    <>
      <Header />
      <div className="bg-white p-4 w-full md:max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold my-8 uppercase text-center">
          {category}
        </h1>
        <div className="bg-gray-100 p-4 pt-8 pb-4 border shadow mb-8">
          <div className="flex gap-2 mb-4" onChange={handleInputChange}>
            <input
              type="text"
              id="city"
              value={searchCity}
              placeholder="City"
              className="w-2/3"
            />
            <input
              type="text"
              id="search"
              value={searchTerm}
              placeholder="Type to search"
              className=""
            />
          </div>
          <div className="flex gap-2 justify-end items-center">
            {emptyTermError && (
              <p className="text-red-500">Enter at least one search term.</p>
            )}
            <button
              className="body-text-bold button-main"
              onClick={filterItems}
            >
              Search
            </button>
            <button
              className="body-text-bold px-4 py-2 hover:bg-gray-200"
              onClick={resetFilterItems}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center">
          {filteredData.map((formDataItem) => (
            <ItemCard
              formDataItem={formDataItem}
              key={formDataItem.id}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Store;
