import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {authCheck} from '../store/actions/handleAuth';
import {
  fetchSavedChamp,
  fetchSavedSummoner,
} from '../store/actions/handleAccount';
import axios from 'axios';

const Redirect = () => {
  const navigate = useNavigate();
  const localId = useSelector((state: any) => state.authReducer.localId);
  const dispatch: any = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const allDragonVersion: {data: string[]} = await axios.get(
        'https://ddragon.leagueoflegends.com/api/versions.json',
      );
      console.log(allDragonVersion.data[0]);
      const DBVersion = allDragonVersion.data[0];
      console.log('dbversion', DBVersion);
      navigate('/Home', {state: {DragonDBVersion: DBVersion}});
    };
    dispatch(authCheck());
    if (localId !== '') {
      dispatch(fetchSavedChamp(localId));
      dispatch(fetchSavedSummoner(localId));
    }
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

export default Redirect;
