import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleAuth, logIn } from '../store/actions/handleAuth';
import { Navigate } from 'react-router-dom';
import { Eye } from 'react-bootstrap-icons';
import '../style/auth.scss';
const Auth: React.FC = () => {

    const [auth, setAuth] = useState<boolean>(true)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [viewPass, setViewPass] = useState<boolean>(false)
    const token = useSelector((state: any) => state.authReducer.token)
    const error = useSelector((state: any) => state.authReducer.error)
    const dispatch: any = useDispatch()

    const SignUpForm: () => void = () => {
        setAuth(false)
    }
    const LogInForm: () => void = () => {
        setAuth(true)
    }

    const handleEmail = (e:any) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e: any) => {
        setPassword(e.target.value)
    }

    const SignUp = () => {
        dispatch(handleAuth(email, password))
    }

    const LogIn = () => {
        dispatch(logIn(email, password))
    }

    let shouldRedirect = null;
    if (token) {
        shouldRedirect = <Navigate to="/" />
    }
    return (
        <div className='mainAuthContainer d-flex justify-content-center align-items-center w-100 w-md-75 m-auto'>
            {shouldRedirect}
            <div className='formContainer container bg-primary p-4 d-flex flex-column align-items-center'>
                <h1>{auth ? 'Log In' : 'Sign Up'}</h1>
                <form className='d-flex flex-column w-75 w-md-50'>
                    <label className='ps-1' htmlFor=''>E-mail</label>
                    <input className='authInput p-1' value={email} onChange={handleEmail} type='email' placeholder='Teemo@league.com' />
                    <label className='ps-1' htmlFor='' placeholder='Password'>Password</label>
                    <div className='d-flex align-items-center'>
                        <input className='authInput p-1 col-11' value={password} onChange={handlePassword} type={viewPass ? 'text' : 'password'} />
                        <Eye size={20} onClick={() => { setViewPass(!viewPass) }} className='ms-2' />
                    </div>
                    {error ? <h4>Password / e-mail errata</h4> : null}
                    <div className='my-3 d-flex justify-content-around'>
                        <h5 onClick={auth ? LogIn : LogInForm} className='authButton p-2 me-2 text-center'>LogIn</h5>
                        <h5 onClick={auth ? SignUpForm : SignUp} className='authButton p-2 text-center'>SignUp</h5>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Auth