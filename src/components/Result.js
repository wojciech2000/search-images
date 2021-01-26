import React, {useEffect, useState} from "react";
import axios from "axios";

import {key, searchTheme} from "../utils/utils";
import Search from "./Search";

export default function Result(props) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios
      .get(props.location.url, {
        headers: {
          Authorization: key,
        },
      })
      .then(res => {
        //some tags might repeat
        const allTags = [];
        res.data.results.map(image => image.tags.map(tag => allTags.push(tag.title)));

        const uniqueTags = Array.from(new Set(allTags));
        setTags(uniqueTags);
      })
      .catch(err => console.log(err));
  }, [props]);

  return (
    <div className="result">
      <Search props={props} theme={searchTheme.result} result={props.match.params.keyWord} />

      <h2 className="result__title" onClick={() => console.log(tags[4])}>
        {props.match.params.keyWord}
      </h2>
      <div className="result__related-tags">
        {tags.length > 0 &&
          tags.map((tag, id) => (
            <span className="result__related-tags-tag" key={id}>
              {tag}
            </span>
          ))}
        <div className="realted-tags-fadeout-effect"></div>
      </div>
    </div>
  );
}
