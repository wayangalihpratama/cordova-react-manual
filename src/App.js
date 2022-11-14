import React, { useEffect, useState } from "react";
import "./App.css";
import "akvo-react-form/dist/index.css"; /* REQUIRED */
import { Webform } from "akvo-react-form";
import * as forms from "./example.json";
import * as cascade from "./example-cascade.json";
import * as tree_option from "./example-tree-select.json";
import { api } from "./lib";

const formData = {
  ...forms.default,
  cascade: { administration: cascade.default },
  tree: { administration: tree_option.default },
};

const App = () => {
  const formId = 567420197;
  const token = process.env.REACT_APP_TOKEN;
  const [webformJson, setWebformJson] = useState({});

  useEffect(() => {
    api.setToken(token);
    api
      .get(`/webform/${formId}`)
      .then((res) => setWebformJson(res.data))
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const onChange = ({ current, values, progress }) => {
    console.info(progress);
  };

  const onFinish = (values) => {
    const data = Object.keys(values)
      .map((v) => {
        // do not transfrom datapoint to post params
        if (values[v] && v !== "datapoint") {
          return { question: parseInt(v), value: values[v] };
        }
        return false;
      })
      .filter((x) => x);
    api
      .post(`data/form/${formId}`, data)
      .then((res) => alert(`Data submitted.`))
      .catch((e) => {
        console.error(e);
        alert(`Failed to submit data`);
      });
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
