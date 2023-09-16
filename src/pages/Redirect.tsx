import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {authCheck} from '../store/actions/handleAuth';
import {setDBVersion} from '../store/actions/handleSetting';
import {
  fetchSavedChamp,
  fetchSavedSummoner,
} from '../store/actions/handleAccount';

const Redirect = () => {
  const navigate = useNavigate();
  const localId = useSelector((state: any) => state.authReducer.localId);
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(authCheck());
    dispatch(setDBVersion());
    if (localId !== '') {
      dispatch(fetchSavedChamp(localId));
      dispatch(fetchSavedSummoner(localId));
    }
    navigate('/Home');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

export default Redirect;
