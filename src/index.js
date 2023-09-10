import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';   //jisme app ko wrap karenge
import { BrowserRouter } from 'react-router-dom';
import {store} from './app/store';       // storre jo app me pass hoga

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>     {/*wrapping entire app in provider so that app can access entire store */}
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

