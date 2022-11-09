import "./App.css";
import "akvo-react-form/dist/index.css"; /* REQUIRED */
import { Webform } from "akvo-react-form";
import * as forms from "./example.json";
import * as cascade from "./example-cascade.json";
import * as tree_option from "./example-tree-select.json";

const formData = {
  ...forms.default,
  cascade: { administration: cascade.default },
  tree: { administration: tree_option.default },
};

const App = () => {
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
