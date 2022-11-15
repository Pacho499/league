import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Champions from './pages/Champions';
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/champions' element={<Champions />} />
      </Routes>

    </div>
  );
}

export default App;
