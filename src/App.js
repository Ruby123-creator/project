import './App.css';
import MapChart from './Components/Map/MapChart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
    <ToastContainer/>
    <MapChart/>
    </div>
  );
}

export default App;
