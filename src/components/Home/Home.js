import React, {useState, useEffect} from "react";
import axios from "axios";

import Search from "../Search/Search";
import {trendingTags, key, searchTheme} from "../../utils/utils";

export default function Home(props) {
  const [trendings, setTrendings] = useState([]);
  const [tag, setTag] = useState("");

  console.log("test commit")

  useEffect(() => {
    axios
      .get(trendingTags, {
        headers: {
          Authorization: key,
        },
      })
      .then(res => {
        const tags = res.data.map(image => ({
          id: image.id,
          title: image.slug,
        }));

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
        <Search props={props} theme={searchTheme.home} tag={tag} />
        <aside className="home__trendings">
          Trending:
          {trendings.length > 0 &&
            trendings.map(({id, title}) => (
              <span key={id} className="home__trending" onClick={e => setTag(e.target.textContent)}>
                {title}
              </span>
            ))}
        </aside>
      </section>
    </div>
  );
}
