import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Champions from './pages/Champions';
import ChampInfo from './pages/ChampInfo';
import Auth from './pages/Auth'
import SummonerInfo from './pages/SummonerInfo';
import Account from './pages/Account'
import { useDispatch } from 'react-redux';
import { authCheck } from './store/actions/handleAuth';
import { useEffect } from 'react';
function App() {
  const dispatch: any = useDispatch()
  useEffect(() => {
    dispatch(authCheck())
  })
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/champions' element={<Champions />} />
        <Route path='/champions/:champName' element={<ChampInfo />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/:summonerName' element={<SummonerInfo />} />
        <Route path='account' element={<Account />} />
      </Routes>

    </div>
  );
}

export default App;
