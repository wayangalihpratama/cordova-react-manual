import React, { useEffect, useState } from "react";
import "./App.css";
import "akvo-react-form/dist/index.css"; /* REQUIRED */
import { Webform } from "akvo-react-form";
import * as forms from "./example.json";
import * as cascade from "./example-cascade.json";
import * as tree_option from "./example-tree-select.json";
import axios from "axios";

const formData = {
  ...forms.default,
  cascade: { administration: cascade.default },
  tree: { administration: tree_option.default },
};

const App = () => {
  const token = process.env.REACT_APP_TOKEN;
  const [webformJson, setWebformJson] = useState({});

  useEffect(() => {
    axios
      .get("https://jmp-explorer.akvotest.org/api/webform/567420197", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setWebformJson(res.data))
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const onChange = ({ current, values, progress }) => {
    console.log(progress);
  };
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div className="full-width">
      {Object.keys(webformJson).length ? (
        <Webform forms={webformJson} onChange={onChange} onFinish={onFinish} />
      ) : (
        <h1>Loading..</h1>
      )}
    </div>
  );
};

export default App;
