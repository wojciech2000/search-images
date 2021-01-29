import axios from "axios";
import React, {useEffect, useState, useRef} from "react";
import {BsSearch} from "react-icons/bs";
import {IoMdClose} from "react-icons/io";

import {unsplashURL, unsplashURLASampleImages, key, searchTheme} from "../../utils/utils";

export default function App({props, theme, tag = ""}) {
  const [keyWord, setKeyWord] = useState("");
  const [foundImages, setFountImages] = useState([]);

  const search = useRef();

  const unsplashRequest = keyWord => {
    axios
      .get(unsplashURL + keyWord, {
        headers: {
          Authorization: key,
        },
      })
      .then(res => {
        setKeyWord("");
        setFountImages([]);
        res.data.results.length &&
          props.history.push({pathname: `/result/${keyWord}`, url: unsplashURL + keyWord});
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    unsplashRequest(tag);
  }, [tag]);

  useEffect(() => {
    keyWord.length <= 3 && setFountImages([]);

    if (keyWord.length >= 3) {
      axios
        .get(unsplashURLASampleImages + keyWord, {
          headers: {
            Authorization: key,
          },
        })
        .then(res => {
          const descriptions = res.data.results.map(image => ({
            id: image.id,
            description: image.description || image.alt_description,
          }));

          setFountImages(descriptions);
        })
        .catch(err => {
          setFountImages([]);
          console.log(err);
        });
    }
  }, [keyWord]);

  const handleOnChange = e => {
    setKeyWord(e.target.value);
  };

  const eraseKeyWord = () => {
    setKeyWord("");
    search.current.focus();
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    search.current.blur();

    if (foundImages.length) {
      unsplashRequest(keyWord);
    }
  };

  return (
    <main className="search">
      <form
        onSubmit={handleOnSubmit}
        className={
          theme === searchTheme.home ? "search__form" : "search__form search__form--result"
        }
      >
        <div
          className={
            theme === searchTheme.home
              ? "search__form-input"
              : "search__form-input search__form-input--result"
          }
        >
          <label
            htmlFor="search"
            className={
              theme === searchTheme.home
                ? "search__search-icon"
                : "search__search-icon search__search-icon--result"
            }
          >
            <BsSearch />
          </label>
          <input
            ref={search}
            type="text"
            id="search"
            placeholder="Search free high-resolution photos"
            className={
              theme === searchTheme.home
                ? "search__search-input"
                : "search__search-input search__search-input--result"
            }
            value={keyWord}
            onChange={handleOnChange}
          />
          {keyWord.length > 0 && (
            <div
              className={
                theme === searchTheme.home
                  ? "search__search-erase"
                  : "search__search-erase search__search-erase--result"
              }
              onClick={eraseKeyWord}
            >
              <IoMdClose />
            </div>
          )}
        </div>
        <div
          className={
            theme === searchTheme.home ? "found-images" : "found-images found-images--result"
          }
        >
          {foundImages.length
            ? foundImages.map(({id, description}) => (
                <div
                  key={id}
                  className={
                    theme === searchTheme.home
                      ? "found-images__image"
                      : "found-images__image found-images__image--result"
                  }
                  onClick={handleOnSubmit}
                >
                  {description}
                </div>
              ))
            : keyWord.length >= 3 && (
                <span
                  className={
                    theme === searchTheme.home
                      ? "found-images__error"
                      : "found-images__error found-images__error--result"
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
