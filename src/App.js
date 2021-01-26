import React from "react";
import {BsSearch} from "react-icons/bs";

export default function App() {
  const handleOnSubmit = e => {
    e.preventDefault();
    console.log("asd");
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
            <label htmlFor="search" className="search__search-icon">
              <BsSearch />
            </label>
            <input type="text" id="search" placeholder="Search free high-resolution photos" className="search__search-input" />
          </form>
        </main>
      </section>
    </div>
  );
}
