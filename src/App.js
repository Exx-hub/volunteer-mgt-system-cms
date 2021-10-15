import "./App.css";
import SideBar from "./components/SideBar";
import AppNavigator from "./Router";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <AppNavigator />
    </div>
  );
}

export default App;
