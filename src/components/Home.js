import React from "react";

import Search from "./Search";
import {searchTheme} from "../utils/utils";

export default function Home(props) {
  return (
    <div className="home">
      <section className="home__wrapper">
        <header>
          <h1 className="home__title">Unsplash</h1>
          <aside className="home__aside">
            The internet's source of{" "}
            <a href="https://unsplash.com/" target="blank_" title="Check out cool images!">
              freely-usable images
            </a>
            <br />
            Powred by creators everywhere.
          </aside>
        </header>
        <Search props={props} theme={searchTheme.home} />
      </section>
    </div>
  );
}
