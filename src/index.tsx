import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Layout } from './Components/LayoutArea/Layout/Layout';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import '@fontsource/ubuntu'; // Default weight

// Make axios add the token (if found) to the request header
axios.interceptors.request.use(function (config){
  if(localStorage.token)
    config.headers.Authorization = "Bearer " + localStorage.token;
  if(localStorage.lUpd)
    config.headers.lUpd = localStorage.lUpd;
  return config;
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Layout />
    </Provider>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
