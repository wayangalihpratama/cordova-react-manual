import React, { useEffect, useState } from "react";
import "./App.css";
import { api } from "./lib";
import { Form } from "./components";
import { Layout, Row, Col, Select, Card } from "antd";

const { Header, Footer, Content } = Layout;

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
      <Layout>
        <Header>
          <h1>JMP - Explorer</h1>
        </Header>
        <Content>
          {!selectedForm && (
            <Row
              className="form-select-wrapper"
              align="middle"
              justify="center"
            >
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
        </Content>
        <Footer>
          <Row align="middle" justify="space-between" gutter={[12, 12]}>
            <Col align="center" span={6}>
              <a href="#">Tab 1</a>
            </Col>
            <Col align="center" span={6}>
              <a href="#">Tab 2</a>
            </Col>
            <Col align="center" span={6}>
              <a href="#">Tab 3</a>
            </Col>
            <Col align="center" span={6}>
              <a href="#">Tab 4</a>
            </Col>
          </Row>
        </Footer>
      </Layout>
    </div>
  );
};

export default App;
