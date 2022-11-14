import React, { useEffect, useState } from "react";
import "./App.css";
import { api } from "./lib";
import { Form } from "./components";
import { Row, Select, Card } from "antd";

const App = () => {
  const token = process.env.REACT_APP_TOKEN;
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    api.setToken(token);
    api
      .get(`/form`)
      .then((res) => {
        setForms(res.data.map((x) => ({ label: x.name, value: x.id })));
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="full-width">
      {!selectedForm && (
        <Row className="form-select-wrapper" align="middle" justify="center">
          <Card className="card-wrapper" title="Select Form">
            <Select
              className="select-dropdown"
              options={forms}
              onChange={setSelectedForm}
            />
          </Card>
        </Row>
      )}
      {selectedForm && (
        <Form formId={selectedForm} setSelectedForm={setSelectedForm} />
      )}
    </div>
  );
};

export default App;
