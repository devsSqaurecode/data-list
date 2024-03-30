import { useState } from "react";
import { firestore, storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

import { statesOfIndia, categories } from "../constants";

function Form() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const navigate = useNavigate();

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleImageChange = (e) => {
    setSelectedImages(Array.from(e.target.files)); // Convert FileList to array
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(selectedImages);
      // Upload all selected images to Firebase Storage
      const urls = await Promise.all(
        selectedImages.map(async (image) => {
          const storageRef = ref(storage, `images/${image.name}`);
          await uploadBytes(storageRef, image);
          return getDownloadURL(storageRef);
        }),
      );

      // Add form data along with image URLs to Firestore
      const docRef = await addDoc(collection(firestore, "formData"), {
        name,
        description,
        email,
        category,
        contactNumber,
        address,
        city,
        state,
        pincode,
        imageUrls: urls, // Add image URLs to Firestore
      });
      console.log("Document written with ID: ", docRef.id);

      // Clear form fields and image state after submission
      setName("");
      setDescription("");
      setCategory("");
      setContactNumber("");
      setAddress("");
      setEmail("");
      setCity("");
      setState("");
      setPincode("");
      setSelectedImages([]);
      setImageUrls([]);
      navigate("/");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form className="max-w-sm mx-auto mt-5 mb-5" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label
          htmlFor="storename"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Store name:
        </label>
        <input
          type="text"
          value={name}
          id="storename"
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Store name"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="devssquarecode@gmail.com"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description:
        </label>
        <input
          type="text"
          value={description}
          id="description"
          placeholder="Store description"
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="category"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Category:
        </label>
        <select
          id="state"
          value={category}
          onChange={handleCategoryChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-5">
        <label
          htmlFor="contactnumber"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Contact Number:
        </label>
        <input
          id="contactnumber"
          type="tel"
          value={contactNumber}
          placeholder="Contact Number"
          onChange={(e) => setContactNumber(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="address"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Address:
        </label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Store address"
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></textarea>
      </div>
      <div className="mb-5">
        <label
          htmlFor="city"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          City:
        </label>
        <input
          id="city"
          type="text"
          value={city}
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="state"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          State:
        </label>
        <select
          id="state"
          value={state}
          onChange={handleStateChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Select State</option>
          {statesOfIndia.map((stateName, index) => (
            <option key={index} value={stateName}>
              {stateName}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-5">
        <label
          htmlFor="pincode"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Pincode:
        </label>
        <input
          id="pincode"
          type="number"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Pincode"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="uploadimages"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Upload Images:
        </label>
        <input
          id="uploadimages"
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          multiple
          onChange={handleImageChange}
        />
      </div>
      {imageUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Uploaded ${index}`}
          style={{ width: "100px", height: "auto" }}
        />
      ))}
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}

export default Form;
