import { WifiOff } from 'react-bootstrap-icons'
import '../style/input.scss'
const Errors: React.FC = () => {
    return (
        <div className='container text-center my-5'><
            WifiOff size={60} color='red' />
            <h4>Try to check your connection, if it's good there are some problem with servers</h4>
        </div>
    )
}

export default Errors