import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as Sentry from "@sentry/react";
import {BrowserTracing} from "@sentry/tracing";
import {
  Routes,
  BrowserRouter,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
  Route,
} from "react-router-dom";

const tracingOrigins = ['localhost', /^\//];

Sentry.init({
  dsn: "https://948f22f6880a47bb8c91ed47b0da1a1e@o87286.ingest.sentry.io/6463355", //chris-react-native
  integrations: [new BrowserTracing({
    tracingOrigins: tracingOrigins,
    routingInstrumentation: Sentry.reactRouterV6Instrumentation(
      React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes
    )
  })],
  debug: true,
  tracesSampleRate: 1.0,
});

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
fetch("https://catfact.ninja/fact")
      .then(res => res.json())
      .then(json => console.log(json));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SentryRoutes>
        <Route path="/" element={<App />} />
        <Route path="/invoices" element={<App/>}/>
        <Route path="/expenses" element={<App/>}/>
      </SentryRoutes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
