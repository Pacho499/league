import { logOut } from '../store/actions/handleAuth'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
const Account: React.FC = () => {
    const dispatch: any = useDispatch()
    const token = useSelector((state: any) => state.authReducer.token)

    const makeLogOut = () => {
        dispatch(logOut())
    }

    let shouldRedirect = null;
    if (!token) {
        shouldRedirect = <Navigate to="/" />
    }

    return (<div className='text-center'>
        {shouldRedirect}
        <h1>ACCOUNT</h1>
        <div className='d-flex justify-content-around w-75 m-auto'>
            <div className='border'>
                <h1>Summoner</h1>
            </div>
            <div className='border'>
                <h1>Champ</h1>
            </div>
        </div>
        <button onClick={makeLogOut}>LogOut</button>
    </div>)

}

export default Account