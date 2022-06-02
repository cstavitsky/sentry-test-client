import logo from './logo.svg';
import './App.css';
import {Link} from "react-router-dom";
import * as Sentry from "@sentry/react";

function App() {
  const getData = () => {
    const transaction = Sentry.startTransaction({name: 'fetch-test-data'});

    fetch("http://localhost:8080/success")
      .then(res => console.log(res));
      
    transaction.finish();
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
