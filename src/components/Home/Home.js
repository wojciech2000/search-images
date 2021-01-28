import React, {useState, useEffect} from "react";
import axios from "axios";

import Search from "../Search/Search";
import {key, searchTheme} from "../../utils/utils";

export default function Home(props) {
  const [trendings, setTrendings] = useState([]);
  const [trending, setTrending] = useState("");

  useEffect(() => {
    axios
      .get("https://api.unsplash.com/topics?order_by=featured", {
        headers: {
          Authorization: key,
        },
      })
      .then(res => {
        const tags = res.data.map(image => image.slug);
        tags.splice(0, 5);
        setTrendings(tags);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="home">
      <section className="home__wrapper">
        <header>
          <h1 className="home__title">Unsplash</h1>
          <aside className="home__aside">
            The internet's source of{" "}
            <a href="https://unsplash.com/license" target="blank_" title="Check out cool images!">
              freely-usable images
            </a>
            <br />
            Powred by creators everywhere.
          </aside>
        </header>
        <Search props={props} theme={searchTheme.home} trending={trending} />
        <aside className="home__trendings">
          Trending:
          {trendings.length > 0 &&
            trendings.map((trending, id) => (
              <span
                key={id}
                className="home__trending"
                onClick={e => setTrending(e.target.textContent)}
              >
                {trending}
              </span>
            ))}
        </aside>
      </section>
    </div>
  );
}
