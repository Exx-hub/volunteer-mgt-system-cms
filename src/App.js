import "./App.css";
import AppNavigator from "./Router";
// import "antd/dist/antd.css";

import "react-s-alert/dist/s-alert-default.css";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <AppNavigator />
      <Alert stack={{ limit: 3 }} />
    </div>
  );
}

export default App;
