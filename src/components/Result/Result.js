import React, {useEffect, useState} from "react";
import axios from "axios";

import {unsplashURL, key, searchTheme} from "../../utils/utils";
import Search from "../Search/Search";
import Images from "../Images/Images";

export default function Result(props) {
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [tag, setTag] = useState("");

  useEffect(() => {
    setImages([]);

    axios
      .get(unsplashURL + props.match.params.keyWord, {
        headers: {
          Authorization: key,
        },
      })
      .then(res => {
        //some tags might repeat
        const allTags = [];
        res.data.results.map(image => image.tags.map(tag => allTags.push(tag.title)));

        const uniqueTags = Array.from(new Set(allTags));
        const shuffleTags = uniqueTags.sort(() => Math.random() - 0.5);
        setTags(shuffleTags);
        setImages(res.data.results);
      })
      .catch(err => console.log(err));
  }, [props]);

  return (
    <div className="result">
      <Search props={props} theme={searchTheme.result} tag={tag} />

      <h2 className="result__title">{props.match.params.keyWord}</h2>
      <div className="result__related-tags">
        {tags.length > 0 &&
          tags.map((tag, id) => (
            <div key={id}>
              <span
                className="result__related-tags-tag"
                onClick={e => setTag(e.target.textContent)}
              >
                {tag}
              </span>
            </div>
          ))}
        <div className="realted-tags-fadeout-effect"></div>
      </div>
      <Images images={images} props={props} />
    </div>
  );
}
