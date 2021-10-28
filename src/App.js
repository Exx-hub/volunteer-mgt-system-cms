import "./App.css";
import AppNavigator from "./Router";
import "react-s-alert/dist/s-alert-default.css";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "react-s-alert/dist/s-alert-css-effects/scale.css";
import "react-s-alert/dist/s-alert-css-effects/bouncyflip.css";
import "react-s-alert/dist/s-alert-css-effects/flip.css";
import "react-s-alert/dist/s-alert-css-effects/genie.css";
import "react-s-alert/dist/s-alert-css-effects/jelly.css";
import "react-s-alert/dist/s-alert-css-effects/stackslide.css";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <AppNavigator />
      <Alert stack={{ limit: 3 }} />
    </div>
  );
}

export default App;
