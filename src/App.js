import React, { useEffect, useState } from "react";
import "./App.css";
import { api } from "./lib";
import { TabPage, Form } from "./components";

import {
  Page,
  Toolbar,
  Icon,
  BackButton,
  ToolbarButton,
  Tabbar,
  Tab,
  List,
  ListItem,
} from "react-onsenui";

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
    <Page
      renderToolbar={() => (
        <Toolbar>
          <div className="left">
            <BackButton>Back</BackButton>
          </div>
          <div className="center">JMP - Explorer</div>
          <div className="right">
            <ToolbarButton>
              <Icon icon="md-menu" />
            </ToolbarButton>
          </div>
        </Toolbar>
      )}
      onDeviceBackButton={() => setSelectedForm(null)}
    >
      <Tabbar
        position="bottom"
        renderTabs={(activeIndex, tabbar) => [
          {
            content: (
              <>
                {!selectedForm && (
                  <div className="form-select-wrapper">
                    <List
                      dataSource={forms}
                      renderRow={(f, fi) => (
                        <ListItem
                          key={`${f.value} - ${fi} - ${f.label}`}
                          onClick={() => setSelectedForm(f.value)}
                        >
                          {f.label}
                        </ListItem>
                      )}
                    />
                  </div>
                )}
                {selectedForm && (
                  <Form
                    formId={selectedForm}
                    setSelectedForm={setSelectedForm}
                  />
                )}
              </>
            ),
            tab: <Tab key={activeIndex} label="Home" icon="md-home" />,
          },
          {
            content: (
              <TabPage
                title="Settings"
                active={activeIndex === 1}
                tabbar={tabbar}
              />
            ),
            tab: <Tab key={activeIndex} label="Settings" icon="md-settings" />,
          },
        ]}
      />
    </Page>
  );
};

export default App;
