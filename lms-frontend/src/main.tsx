import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { Provider } from 'react-redux';
import { store } from './app/redux/store/configureStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


  // Render the app after config is loaded
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );

