import React from "react";

export default function Images({images}) {
  console.log(images);

  return (
    <div className="images">
      {images.length &&
        images.map((image, id) => (
          <section key={id} className="image">
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
  );
}
