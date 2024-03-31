import { memo } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const ItemCard = ({ formDataItem }) => {
  return (
    <div className="md:max-w-3xl w-full shadow-md bg-white">
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
      <div className="card-details p-4">
        <p className="text-xl font-semibold uppercase mb-4">
          {formDataItem.name}
        </p>
        <p className="mb-4">{formDataItem.description}</p>
        <p>
          <span>Contact Number:</span> {formDataItem.contactNumber}
        </p>
        <p>
          <span>Address:</span>
          {formDataItem.address}
        </p>
        <p>
          <span>City:</span> {formDataItem.city}
        </p>
        <p>
          <span>State:</span> {formDataItem.state}
        </p>
        <p>
          <span>Pincode:</span> {formDataItem.pincode}
        </p>
      </div>
    </div>
  );
};

const memoizedItemCard = memo(ItemCard);

export default memoizedItemCard;
