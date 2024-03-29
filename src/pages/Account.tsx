import {logOut} from '../store/actions/handleAuth';
import {useSelector, useDispatch} from 'react-redux';
import {Navigate, Link} from 'react-router-dom';
import {DragonDatabase} from '../data';
import {setSummonerData} from '../store/actions/handleSummoner';
import {AccountSummonerData} from '../@type/type';
import '../style/account.scss';
const Account: React.FC = () => {
  const dispatch: any = useDispatch();
  const token = useSelector((state: any) => state.authReducer.token);
  const champs = useSelector((state: any) => state.accountReducer.champName);
  const summoners = useSelector((state: any) => state.accountReducer.summoner);
  const makeLogOut = () => {
    dispatch(logOut());
  };

  let shouldRedirect = null;
  if (!token) {
    shouldRedirect = <Navigate to='/' />;
  }

  const renderChamps = () => {
    return champs.map((champ: string, index: number) => {
      return (
        <Link
          style={{textDecoration: 'none'}}
          key={index}
          to={`/champions/${champ}`}
          className='cards d-flex text-white align-items-center justify-content-center my-3 bg-primary p-2'
        >
          <img
            height='60px'
            src={`${DragonDatabase}/cdn/12.20.1/img/champion/${champ}.png`}
            alt='champion'
          />
          <h2 className='ms-2'>{champ}</h2>
        </Link>
      );
    });
  };

  const loadSummonersData: (e: any) => any = (e) => {
    summoners.map((summoner: AccountSummonerData, index: number) => {
      const encryptedSummonerId = summoner.encryptedId;
      const puuid = summoner.id;
      const name = summoner.name;
      const lv = summoner.lv;
      const profileImage = summoner.img;
      if (index.toString() === e.target.id) {
        dispatch(
          setSummonerData({encryptedSummonerId, puuid, name, lv, profileImage}),
        );
      }
      return null;
    });
  };

  const renderSummoners = () => {
    return summoners.map((summoner: AccountSummonerData, index: number) => {
      return (
        <Link
          id={index.toString()}
          onClick={loadSummonersData}
          style={{textDecoration: 'none'}}
          to={`/${summoner.name}`}
          key={index}
          className='cards d-flex text-white align-items-center justify-content-around my-3 bg-primary p-2'
        >
          <img
            id={index.toString()}
            height='60px'
            src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/profileicon/${summoner.img}.png`}
            alt='summoner'
          />
          <div id={index.toString()} className='d-md-flex '>
            <h2 id={index.toString()} className='ms-2 mt-2-md'>
              {summoner.name}
            </h2>
            <h4 id={index.toString()} className='ms-3'>
              Lv:{summoner.lv}
            </h4>
          </div>
        </Link>
      );
    });
  };

  return (
    <div className='text-center'>
      {shouldRedirect}
      <div className='d-md-flex justify-content-around w-75 m-auto'>
        <div>
          <h1>Summoner</h1>
          {summoners.length === 0 ? (
            <h1>Save some summoner!</h1>
          ) : (
            renderSummoners()
          )}
        </div>
        <div>
          <h1>Champ</h1>
          {champs.length === 0 ? <h1>Save some champ!</h1> : renderChamps()}
        </div>
      </div>
      <h4
        className='authButton m-auto bg-primary p-2 my-5'
        onClick={makeLogOut}
      >
        LogOut
      </h4>
    </div>
  );
};

export default Account;
