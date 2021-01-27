import React, {Fragment, useState} from "react";

import ImageModal from "./ImageModal";

export default function Images({images, props}) {
  const [imageId, setImageId] = useState("");

  return (
    <Fragment>
      <div className="images">
        {images.length > 0 &&
          images.map((image, id) => (
            <section key={id} className="image" onClick={() => setImageId(image.id)}>
              <img src={image.urls.regular} alt={image.alt_description} className="image__picture" />
              <h3 className="image__title">{image.description || image.alt_description}</h3>
              <div className="image__tags">
                {image.tags.map(({title}, id) => (
                  <span key={id} className="image__tag">
                    {title}
                  </span>
                ))}
              </div>
            </section>
          ))}
      </div>
      <ImageModal id={imageId} setImageId={setImageId} />
    </Fragment>
  );
}
