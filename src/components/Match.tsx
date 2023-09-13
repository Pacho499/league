import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {ApiKey, DragonDatabase} from '../data';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Errors from './Errors';
import '../style/summonerInfo.scss';

const Match: React.FC = () => {
  const summonerData = useSelector((state: any) => state.summonerReducer.data);
  const dragonDB = useSelector((state: any) => state.settingsReducer.dragonDB);
  const countryServer = useSelector(
    (state: any) => state.settingsReducer.countryServer,
  );
  const [matches, setMatches] = useState<any[]>([]);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  console.log(dragonDB);
  useEffect(() => {
    const fetchGamesId = async () => {
      setLoadingPage(true);
      try {
        const response = await axios.get(
          `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerData.puuid}/ids?start=0&count=10&api_key=${ApiKey}`,
        );
        const matchesDatas: string[] = [];
        const matchesIds = response.data;
        for (let matchId of matchesIds) {
          const res = await axios.get(
            `https://${countryServer}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${ApiKey}`,
          );
          const matchData = res.data;
          matchesDatas.push(matchData);
        }
        setMatches(matchesDatas);
        setLoadingPage(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoadingPage(false);
      }
    };
    fetchGamesId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderMatches = () => {
    return matches.map((match, index) => {
      const players = match.info.participants;
      let summonerGameId: number = 12;
      //Filter all the partecipants till we find the summoner id
      for (let i = 0; i < players.length; i++) {
        if (players[i].puuid === summonerData.puuid) {
          summonerGameId = i;
        }
      }
      const data = match.info.participants[summonerGameId];
      const win = data.win;
      const time = Math.trunc(match.info.gameDuration / 60);
      const gameType = () => {
        switch (match.info.queueId) {
          case 420:
            return 'SoloQ';
          case 440:
            return 'Flex';
          case 450:
            return 'Aram';
          case 400:
            return 'Normal';
          default:
            break;
        }
      };
      const renderBuild = () => {
        const item = [];

        for (let key in data) {
          //data[key] > 1000 to fix a bug of api
          if (key.includes('item') && data[key] > 1000) {
            item.push(data[key]);
          }
        }
        return item.map((item: number, index: number) => {
          return (
            <img
              key={index}
              height='40px'
              src={`${DragonDatabase}/cdn/${dragonDB}/img/item/${item}.png`}
              alt=''
            />
          );
        });
      };

      return (
        <div
          key={index}
          className='matchContainer bg-primary d-flex justify-content-around align-items-center w-75 m-auto my-2 text-center'
        >
          <div className='mx-1 col-2'>
            <h5>{gameType()}</h5>
            {win ? (
              <p className='win w-75 m-auto'>Win</p>
            ) : (
              <p className='lose w-75 m-auto'>Lose</p>
            )}
            <p>{time < 4 ? 'Remake' : time + ' min'}</p>
          </div>
          <div className='mx-1 col-2'>
            <Link to={`/champions/${data.championName}`}>
              <img
                height='70px'
                src={`${DragonDatabase}/cdn/${dragonDB}/img/champion/${data.championName}.png`}
                alt=''
              />
            </Link>

            <h5 className='mt-2'>Lv: {data.champLevel}</h5>
          </div>

          <div className='mx-1 col-2'>
            <h4>K/D/A</h4>
            <h5>
              {data.kills}/{data.deaths}/{data.assists}
            </h5>
            <h5>CS: {data.totalMinionsKilled + data.neutralMinionsKilled}</h5>
          </div>
          <div className='mx-1 d-none d-sm-block col-6'>
            <h4>Build</h4>
            {renderBuild()}
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      {error ? <Errors /> : null}
      {loadingPage ? <Spinner /> : renderMatches()}
    </div>
  );
};

export default Match;
