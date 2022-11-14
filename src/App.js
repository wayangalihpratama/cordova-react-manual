import React, { useEffect } from "react";
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
  useEffect(() => {
    axios
      // .get("/api/v1/levels?format=json", {
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json; charset=utf-8",
      //   },
      // })
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then((res) => alert(JSON.stringify(res.data)))
      .catch((e) => {
        alert(e);
        const { status, statusText, message } = e.response;
        alert(`${status} - ${statusText} - ${message}`);
      });
    // fetch("/api/v1/levels?format=json")
    //   .then((res) => res.json())
    //   .then((data) => alert(JSON.stringify(data)));
  }, []);

  const onChange = ({ current, values, progress }) => {
    console.log(progress);
  };
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div className="full-width">
      <Webform forms={formData} onChange={onChange} onFinish={onFinish} />
    </div>
  );
};

export default App;
