import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import toast, { Toaster } from 'react-hot-toast'
import Records from './components/Records';

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/allRecord" element={<Records />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
