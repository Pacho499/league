import { Server } from "../data"
import '../style/serverButton.scss'
const ServerButtons: React.FC = () => {
    const renderServer = () => {
        return Server.map((servers, index) => {
            return <li className="serverButton me-3 mt-2 p-2" value={servers} key={index}>{servers}</li>
        })
    }
    return (
        <div className="container">
            <ul className="d-flex justify-content-center">
                {renderServer()}
            </ul>
        </div>
    )
}

export default ServerButtons