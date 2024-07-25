import React from 'react';
import ReactDOM from 'react-dom';
import MyApp from './components/MyApp';
import reportWebVitals from './reportWebVitals';
import bootstraps from './bootstrap';
import { Provider } from "react-redux";
import { store } from "./redux/configStore";


  ReactDOM.render(
      <Provider store={store}>
          < MyApp />
      </Provider>,
      document.getElementById("root")
  );

console.log("App is running");
// Measure performance
reportWebVitals();

