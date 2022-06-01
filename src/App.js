import logo from './logo.svg';
import './App.css';
import {Link} from "react-router-dom";
//import * as Sentry from "@sentry/react";

function App() {
  const getData = () => {
    //const trx = Sentry.startTransaction({name: 'fetch'});
    //Sentry.getCurrentHub().configureScope(scope => scope.setSpan(trx));

    fetch("https://localhost:7095/WeatherForecast")
      .then(res => res.json())
      .then(json => console.log(json));
      //.finally(() => trx.finish());
  }

  return (
    <div className="App">
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Page 1</Link> |{" "}
        <Link to="/expenses">Page 2</Link>
      </nav>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button type="button" onClick={() => getData()}>Get data</button>
      </header>
    </div>
  );
}

export default App;
