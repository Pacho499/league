import { logOut } from '../store/actions/handleAuth'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Link } from 'react-router-dom'
import '../style/account.scss'
const Account: React.FC = () => {
    const dispatch: any = useDispatch()
    const token = useSelector((state: any) => state.authReducer.token)
    const champs = useSelector((state: any) => state.accountReducer.champName)
    const makeLogOut = () => {
        dispatch(logOut())
    }

    let shouldRedirect = null;
    if (!token) {
        shouldRedirect = <Navigate to="/" />
    }

    const renderChamps = () => {
        return champs.map((champ: string, index: number) => {
            console.log(champ)
            return (
                <Link key={index} to={`/champions/${champ}`} className='champ d-flex text-white align-items-center my-3 bg-primary p-2'>
                    <img
                        height='60px'
                        id="champRotationImg"
                        src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${champ}.png`}
                        alt="champion"
                    />
                    <h2 className='ms-2' >{champ}</h2>
                </Link>
            )
        })
    }

    return (<div className='text-center'>
        {shouldRedirect}
        <h1>ACCOUNT</h1>
        <div className='d-flex justify-content-around w-75 m-auto'>
            <div className='border'>
                <h1>Summoner</h1>
            </div>
            <div>
                <h1>Champ</h1>
                <div>
                    {renderChamps()}
                </div>
            </div>
        </div>
        <button onClick={makeLogOut}>LogOut</button>
    </div>)

}

export default Account