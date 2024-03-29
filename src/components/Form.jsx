import { useState } from "react";
import { firestore, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

function Form() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

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
      setContactNumber("");
      setAddress("");
      setCity("");
      setState("");
      setPincode("");
      setSelectedImages([]);
      setImageUrls([]);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="App p-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Contact Number:</label>
          <input
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          ></textarea>
        </div>
        <div>
          <label className="block mb-1">City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Pincode:</label>
          <input
            type="number"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label>Upload Images:</label>
          <input type="file" multiple onChange={handleImageChange} />
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
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
