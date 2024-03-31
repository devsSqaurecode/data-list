import { useState } from "react";
import { firestore, storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

import { statesOfIndia, categories } from "../constants";
import Header from "./Header";
import Footer from "./Footer";

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
    <>
      <Header />
      <h1 className="text-2xl font-bold my-8 uppercase text-center">
        Add a Store
      </h1>
      <form className="max-w-sm mx-auto mt-5 mb-5" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="storename" className="">
            Store name
          </label>
          <input
            type="text"
            value={name}
            id="storename"
            onChange={(e) => setName(e.target.value)}
            className=""
            placeholder="Store name"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            type="email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className=""
          />
        </div>
        <div className="mb-5">
          <label htmlFor="description" className="">
            Description
          </label>
          <input
            type="text"
            value={description}
            id="description"
            placeholder="Store description"
            onChange={(e) => setDescription(e.target.value)}
            className=""
          />
        </div>
        <div className="mb-5">
          <label htmlFor="category" className="">
            Category
          </label>
          <select
            id="state"
            value={category}
            onChange={handleCategoryChange}
            className=""
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
          <label htmlFor="contactnumber" className="">
            Contact Number
          </label>
          <input
            id="contactnumber"
            type="tel"
            value={contactNumber}
            placeholder="Contact Number"
            onChange={(e) => setContactNumber(e.target.value)}
            className=""
          />
        </div>
        <div className="mb-5">
          <label htmlFor="address" className="">
            Address
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Store address"
            className=""
          ></textarea>
        </div>
        <div className="mb-5">
          <label htmlFor="city" className="">
            City
          </label>
          <input
            id="city"
            type="text"
            value={city}
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
            className=""
          />
        </div>
        <div className="mb-5">
          <label htmlFor="state" className="">
            State
          </label>
          <select
            id="state"
            value={state}
            onChange={handleStateChange}
            className=""
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
          <label htmlFor="pincode" className="">
            Pincode
          </label>
          <input
            id="pincode"
            type="number"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Pincode"
            className=""
          />
        </div>
        <div className="mb-5">
          <label htmlFor="uploadimages" className="">
            Upload Images
          </label>
          <input
            id="uploadimages"
            className="b"
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
          className="w-full py-2 bg-black body-text-bold text-white"
        >
          Submit
        </button>
      </form>
      <Footer />
    </>
  );
}

export default Form;
