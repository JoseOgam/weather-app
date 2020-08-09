import React from "react";
// import logo from './logo.svg'
import Forcast from "./components/Forcast/forcast";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Weather App</h1>
      </header>
      ...
      <main>
        <Forcast />
      </main>
      <footer>Page created by Joseph</footer>
      ...
    </div>
  );
}

export default App;
