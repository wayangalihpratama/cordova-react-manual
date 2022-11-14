import React, { useEffect, useState } from "react";
import "akvo-react-form/dist/index.css"; /* REQUIRED */
import { Webform } from "akvo-react-form";
import * as forms from "../static/example.json";
import * as cascade from "../static/example-cascade.json";
import * as tree_option from "../static/example-tree-select.json";
import { api } from "../lib";
import { Row, Spin, message } from "antd";

const formData = {
  ...forms.default,
  cascade: { administration: cascade.default },
  tree: { administration: tree_option.default },
};

const Form = ({ formId, setSelectedForm }) => {
  const [webformJson, setWebformJson] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    setLoading(true);
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
      .then(() => {
        message.success(`Data submitted.`);
        setTimeout(() => {
          setSelectedForm(null);
        }, 500);
      })
      .catch((e) => {
        console.error(e);
        message.error(`Failed to submit data`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      {Object.keys(webformJson).length ? (
        <Webform
          forms={webformJson}
          onChange={onChange}
          onFinish={onFinish}
          submitButtonSetting={{ loading: loading }}
        />
      ) : (
        <Row className="loading-wrapper" align="middle" justify="center">
          <Spin />
        </Row>
      )}
    </div>
  );
};

export default Form;
