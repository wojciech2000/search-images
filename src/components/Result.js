import React, {useEffect} from "react";
import axios from "axios";

import {unsplashURL, key, searchTheme} from "../utils/utils";
import Search from "./Search";

export default function Result(props) {
  console.log(props.match.params.keyWord);

  useEffect(() => {
    axios
      .get(props.location.url, {
        headers: {
          Authorization: key,
        },
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="result">
      <Search props={props} theme={searchTheme.result} result={props.match.params.keyWord} />
    </div>
  );
}
