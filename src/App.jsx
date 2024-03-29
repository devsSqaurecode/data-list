import React, { useState, useEffect } from 'react';
import { firestore, storage, timestamp } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, addDoc, collection, getDocs } from "firebase/firestore";

import Form from './components/Form';

function App() {

  const [formData, setFormData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'formData'));
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
      } catch (error) {
        console.error('Error fetching documents: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App p-4">
      <h1 className="text-3xl font-bold mb-4">React Form with Images Upload</h1>
      <div>
        <h1>Form Data</h1>
        <ul>
          {formData.map((formDataItem) => (
            <li key={formDataItem.id}>
              <p>Name: {formDataItem.name}</p>
              <p>Description: {formDataItem.description}</p>
              <p>Contact Number: {formDataItem.contactNumber}</p>
              <p>Address: {formDataItem.address}</p>
              <p>City: {formDataItem.city}</p>
              <p>State: {formDataItem.state}</p>
              <p>Pincode: {formDataItem.pincode}</p>
              <p>Image URLs: {formDataItem.imageUrls.join(', ')}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
