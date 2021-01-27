import axios from "axios";
import React, {useEffect, useState} from "react";
import {BsSearch} from "react-icons/bs";
import {IoMdClose} from "react-icons/io";

import {unsplashURL, key, searchTheme} from "../utils/utils";

export default function App({props, theme, result, trending = ""}) {
  const [keyWord, setKeyWord] = useState(result || "");
  const [foundImages, setFountImages] = useState([]);

  //dont show dropbox after switching to result component
  const [isResult, setIsResult] = useState(result ? true : false);

  useEffect(() => {
    axios
      .get(unsplashURL + trending, {
        headers: {
          Authorization: key,
        },
      })
      .then(res => {
        setIsResult(true);
        setFountImages([]);
        res.data.results.length &&
          props.history.push({pathname: `/result/${trending}`, url: unsplashURL + trending});
      })
      .catch(err => console.log(err));
  }, [trending]);

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
          const descriptions = res.data.results.map(
            image => image.description || image.alt_description,
          );
          setFountImages(descriptions);
        })
        .catch(err => {
          setFountImages([]);
          console.log(err);
        });
    }
  }, [keyWord]);

  const handleOnChange = e => {
    isResult && setIsResult(false);
    setKeyWord(e.target.value);
  };

  const handleOnSubmit = e => {
    e.preventDefault();

    if (foundImages.length) {
      axios
        .get(unsplashURL + keyWord, {
          headers: {
            Authorization: key,
          },
        })
        .then(res => {
          setIsResult(true);
          setFountImages([]);
          res.data.results.length &&
            props.history.push({pathname: `/result/${keyWord}`, url: unsplashURL + keyWord});
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <main className="search">
      <form
        onSubmit={handleOnSubmit}
        className={theme === searchTheme.home ? "search__form" : "search__form--result"}
      >
        <div
          className={
            theme === searchTheme.home ? "search__form-input" : "search__form-input--result"
          }
        >
          <label
            htmlFor="search"
            className={
              theme === searchTheme.home ? "search__search-icon" : "search__search-icon--result"
            }
          >
            <BsSearch />
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search free high-resolution photos"
            className={
              theme === searchTheme.home ? "search__search-input" : "search__search-input--result"
            }
            value={keyWord}
            onChange={handleOnChange}
          />
          {keyWord.length > 0 && (
            <div
              className={
                theme === searchTheme.home ? "search__search-erase" : "search__search-erase--result"
              }
              onClick={() => setKeyWord("")}
            >
              <IoMdClose />
            </div>
          )}
        </div>
        <div className={theme === searchTheme.home ? "found-images" : "found-images--result"}>
          {isResult
            ? ""
            : foundImages.length
            ? foundImages.map((image, id) => (
                <div
                  key={id}
                  className={
                    theme === searchTheme.home
                      ? "found-images__image"
                      : "found-images__image--result"
                  }
                  onClick={handleOnSubmit}
                >
                  {image}
                </div>
              ))
            : keyWord.length >= 3 && (
                <span
                  className={
                    theme === searchTheme.home
                      ? "found-images__error"
                      : "found-images__error--result"
                  }
                >
                  Pictures didn't found
                </span>
              )}
        </div>
      </form>
    </main>
  );
}
