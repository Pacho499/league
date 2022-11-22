import '../style/auth.scss';
import { useState } from 'react';
import Axios from 'axios'
import { FirebaseKey } from '../data';
const Auth: React.FC = () => {

    const [auth, setAuth] = useState<boolean>(true)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const SignUpForm: () => void = () => {
        setAuth(false)
    }
    const LogInForm: () => void = () => {
        setAuth(true)
    }

    const handleEmail = (e: any) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e: any) => {
        setPassword(e.target.value)
    }

    const SignUp = async () => {
        try {
            const response = await Axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FirebaseKey}`, {
                email: email,
                password: password,
                returnSecureToken: true,
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className='mainAuthContainer d-flex justify-content-center align-items-center w-75 m-auto'>
            {auth ? <div className='formContainer container bg-primary p-4 d-flex flex-column align-items-center'>
                <h1>Log In</h1>
                <form className='d-flex flex-column w-50'>
                    <label className='ps-1' htmlFor=''>UserName</label>
                    <input className='authInput p-1' type='text' placeholder='Teemo' />
                    <label className='ps-1' htmlFor='' placeholder='Password'>Password</label>
                    <input className='authInput p-1' type='password' />
                    <div className='my-3 d-flex justify-content-around'>
                        <h5 className='authButton p-2 me-2'>LogIn</h5>
                        <h5 onClick={SignUpForm} className='authButton p-2'>SignUp</h5>
                    </div>
                </form>
            </div> :
                <div className='formContainer container bg-primary p-4 d-flex flex-column align-items-center'>
                    <h1>Sign Up</h1>
                    <form className='d-flex flex-column w-50'>
                        <label className='ps-1' htmlFor=''>E-mail</label>
                        <input className='authInput p-1' value={email} onChange={handleEmail} type='text' placeholder='Teemo@league.com' />
                        <label className='ps-1' htmlFor=''>UserName</label>
                        <input className='authInput p-1' type='text' placeholder='Teemo' />
                        <label className='ps-1' htmlFor='' placeholder='Password'>Password</label>
                        <input className='authInput p-1' value={password} onChange={handlePassword} type='password' />
                        <div className='my-3 d-flex justify-content-around'>
                            <h5 onClick={LogInForm} className='authButton p-2 me-2'>LogIn</h5>
                            <h5 onClick={SignUp} className='authButton p-2'>SignUp</h5>
                        </div>
                    </form>
                </div>}
        </div>
    )
}

export default Auth