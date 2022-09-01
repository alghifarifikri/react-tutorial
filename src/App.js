import './App.css';
import { Provider } from 'react-redux';
import {store} from '../src/Redux/Store';
import RouterIndex from './Router';

function App() {
  return (
    <Provider store={store}>
      <div style={{ 
          textAlign: 'center', 
          marginTop: 20
        }}>
          <RouterIndex />
      </div>
    </Provider>
  );
}

export default App;
