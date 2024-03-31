import { memo } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const ItemCard = ({ formDataItem }) => {
  return (
    <div className="md:max-w-3xl w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="bg-gray-200 w-full aspect-video">
        <Slide autoplay={false} transitionDuration={500}>
          {formDataItem.imageUrls?.map((url) => {
            return (
              <img
                src={url}
                key={url}
                className="w-full aspect-video object-cover"
              />
            );
          })}
        </Slide>
      </div>
      <div className="p-4">
        <p className="text-xl font-semibold mb-4">{formDataItem.name}</p>
        <p className="mb-4">{formDataItem.description}</p>
        <p>Contact Number: {formDataItem.contactNumber}</p>
        <p>Address: {formDataItem.address}</p>
        <p>City: {formDataItem.city}</p>
        <p>State: {formDataItem.state}</p>
        <p>Pincode: {formDataItem.pincode}</p>
      </div>
    </div>
  );
};

const memoizedItemCard = memo(ItemCard);

export default memoizedItemCard;
