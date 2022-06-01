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

Sentry.init({
  dsn: "https://d05c5f62b27f4be5b13eea70657d1c30@o1252838.ingest.sentry.io/6419153",
  integrations: [new BrowserTracing({
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
