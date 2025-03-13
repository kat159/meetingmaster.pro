import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import reportWebVitals from './reportWebVitals';
import App_V2 from './App_V2';
import CheckDevice from './CheckDevice';
import './index_v2.css';
import ReactGA from "react-ga4";

ReactGA.initialize([
  {
    trackingId: "GTM-5RMJJL6X",
    gaOptions: {
      debug_mode: true,
    },
    gtagOptions: {
      debug_mode: true,
    },
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <App_V2 /> */}
    <CheckDevice />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function

// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
