import axios from "axios";
import React, {useEffect, useState} from "react";
import {BsSearch} from "react-icons/bs";
import {IoMdClose} from "react-icons/io";

export default function App() {
  const [keyWord, setKeyWord] = useState("");
  const [foundImages, setFountImages] = useState([]);

  const unsplashURL = "https://api.unsplash.com/search/photos?&query=";
  //put key in dot.env
  const key = "Client-ID aJMAyZa4XjDwolZwqcobhcshU1JL-oJIs7xMW9ePcqI";

  useEffect(() => {
    keyWord.length <= 3 && setFountImages([]);

    if (keyWord.length >= 3) {
      axios
        .get(unsplashURL + keyWord, {
          headers: {
            Authorization: key,
          },
        })
        .then(res => {
          console.log(res);
          const descriptions = res.data.results.map(image => (image.description ? image.description : image.alt_description));
          setFountImages(descriptions);
        })
        .catch(err => {
          setFountImages([]);
          console.log(err);
        });
    }
  }, [keyWord]);

  const handleOnSubmit = e => {
    e.preventDefault();

    axios
      .get(unsplashURL + keyWord, {
        headers: {
          Authorization: key,
        },
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <div className="search">
      <section className="search__wrapper">
        <h1 className="search__title">Unsplash</h1>
        <aside className="search__aside">
          The internet's source of{" "}
          <a href="https://unsplash.com/" target="blank_" title="Check out cool images!">
            freely-usable images
          </a>
          <br />
          Powred by creators everywhere.
        </aside>
        <main className="search__main">
          <form onSubmit={handleOnSubmit} className="search__form">
            <div className="search__form-input">
              <label htmlFor="search" className="search__search-icon">
                <BsSearch />
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search free high-resolution photos"
                className="search__search-input"
                value={keyWord}
                onChange={e => setKeyWord(e.target.value)}
              />
              <div className="search__search-erase" onClick={() => setKeyWord("")}>
                <IoMdClose />
              </div>
            </div>
            <div className="found-images">
              {foundImages.length
                ? foundImages.map((image, id) => (
                    <div key={id} className="found-images__image">
                      {image}
                    </div>
                  ))
                : keyWord.length >= 3 && <span className="found-images__error">Pictures didn't found</span>}
            </div>
          </form>
        </main>
      </section>
    </div>
  );
}
