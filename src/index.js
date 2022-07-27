import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import ReactDOM from 'react-dom';
import AppUpload from './AppUpload';
import AppTable from './AppTable';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppUpload />} />
      <Route path="table" element={<AppTable />} />      
    </Routes>
  </BrowserRouter>, document.getElementById('root'));
  

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
