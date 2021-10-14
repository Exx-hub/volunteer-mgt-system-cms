import "./App.css";
import SideBar from "./components/SideBar";
import Navigator from "./Router";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Navigator />
    </div>
  );
}

export default App;
