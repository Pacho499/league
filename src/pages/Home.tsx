import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {ApiKey, DragonDatabase} from '../data';
import {setSummonerData} from '../store/actions/handleSummoner';
import Input from '../components/Input';
import ServerButtons from '../components/ServerButtons';
import axios from 'axios';
import '../style/home.scss';

const Home: React.FC = () => {
  const dispatch: any = useDispatch();
  const [champRotation, setChampRotation] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [errorSum, setErrorSum] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const language = useSelector((state: any) => state.settingsReducer.language);
  const server = useSelector((state: any) => state.settingsReducer.server);
  const summonerData = useSelector((state: any) => state.summonerReducer.data);
  const loaded = useSelector((state: any) => state.summonerReducer.loaded);
  const dragonDBVersion = useSelector(
    (state: any) => state.settingsReducer.dragonDB,
  );

  useEffect(() => {
    const fetchChampsRotation: () => void = async () => {
      try {
        const response = await axios.get(
          `https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${ApiKey}`,
        );
        const data = response.data.freeChampionIds;
        const allchamps = await axios.get(
          `${DragonDatabase}/cdn/${dragonDBVersion}/data/${language}/champion.json`,
        );
        const keyChamp = allchamps.data.data;
        const freeChamp: string[] = [];
        for (let i = 0; i < data.length; i++) {
          const key = data[i];
          for (let x in keyChamp) {
            const allKeys = keyChamp[x].key;
            const allKeysNum = parseInt(allKeys);
            if (key === allKeysNum) {
              freeChamp.push(keyChamp[x].image.full);
            }
          }
        }
        setChampRotation(freeChamp);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    fetchChampsRotation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSummoners = async () => {
    try {
      const response = await axios.get(
        `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${input}?api_key=${ApiKey}`,
      );
      const encryptedSummonerId = response.data.id;
      const puuid = response.data.puuid;
      const name = response.data.name;
      const lv = response.data.summonerLevel;
      const profileImage = response.data.profileIconId;
      dispatch(
        setSummonerData({encryptedSummonerId, puuid, name, lv, profileImage}),
      );
      setErrorSum(false);
    } catch (error) {
      console.log(error);
      setErrorSum(true);
    }
  };

  const renderSummoners = () => {
    return (
      <Link style={{textDecoration: 'none'}} to={`/${summonerData.name}`}>
        <div className='summonerContainer bg-primary d-flex align-items-center w-50 m-auto my-5 p-2 justify-content-between text-white'>
          <div className='d-sm-flex w-100 justify-content-center align-items-center text-center'>
            <img
              height='100px'
              src={`${DragonDatabase}/cdn/${dragonDBVersion}/img/profileicon/${summonerData.profileImage}.png`}
              alt='summoner profileImage'
            />
            <h1 className='ms-2'>{summonerData.name}</h1>
          </div>
          <h4 className='me-2 d-none d-sm-block'>Lv: {summonerData.lv}</h4>
        </div>
      </Link>
    );
  };

  const handleInput = (e: any) => {
    setInput(e.target.value);
  };

  const renderFreeChamps = () => {
    return champRotation.map((value: string, index: number) => {
      const url = value.replace('.png', '');
      return (
        <Link
          key={index}
          to={`/champions/${url}`}
          className='champRot col col-xs-1 col-md-2 col-lg-1 mx-3'
        >
          <img
            className='my-3'
            id='champRotationImg'
            src={`${DragonDatabase}/cdn/${dragonDBVersion}/img/champion/${value}`}
            alt='champion'
          />
        </Link>
      );
    });
  };

  return (
    <div>
      <div className='d-flex flex-column mt-5 align-items-center'>
        <Input
          placeHolder='Search a summoner'
          onClick={fetchSummoners}
          value={input}
          handleInput={handleInput}
          searchButton={true}
        />
        <ServerButtons />
      </div>
      <div>
        {errorSum ? (
          <h4 className='text-center'>Summoner doesn't exist</h4>
        ) : null}
        {loaded ? renderSummoners() : null}
      </div>
      <h1 className='text-center mt-4'>Weekly champion rotation</h1>
      {error ? (
        <h1 className='text-center mt-4 container'>
          The Riot server is experiencing some issues with this API, however,
          you can continue to use the rest of the site without any problems.
        </h1>
      ) : (
        <div className='d-flex row justify-content-center mx-auto mt-5 w-100 '>
          {renderFreeChamps()}
        </div>
      )}
    </div>
  );
};

export default Home;
