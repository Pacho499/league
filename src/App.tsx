import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Champions from './pages/Champions';
import ChampInfo from './pages/ChampInfo';
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/champions' element={<Champions />} />
        <Route path='/champions/:champName' element={<ChampInfo />} />
      </Routes>

    </div>
  );
}

export default App;
