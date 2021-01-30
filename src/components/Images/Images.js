import React, {Fragment, useState} from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import ImageModal from "../ImageModal/ImageModal";

export default function Images({images}) {
  const [imageId, setImageId] = useState("");

  return (
    <Fragment>
      <div className="images">
        {images.length > 0 &&
          images.map(image => (
            <section key={image.id} className="image" onClick={() => setImageId(image.id)}>
              <LazyLoadImage
                effect="blur"
                src={image.urls.regular}
                alt={image.alt_description}
                className="image__picture"
              />
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
