import { Server } from "../data"
import { useSelector } from "react-redux"
import '../style/serverButton.scss'
import { useDispatch } from "react-redux"
import { changeServer } from "../store/actions/handleSetting"
const ServerButtons: React.FC = () => {

    const server = useSelector((state: any) => state.settingsReducer.server)
    const dispatch: any = useDispatch()

    const handleServer = (e: any) => {
        dispatch(changeServer(e.target.id))
    }
    const renderServer = () => {
        return Server.map((servers, index) => {
            const active = () => {
                if (server === servers) {
                    return true
                } else {
                    return false
                }
            }
            return <li className={active() ? "serverButton bg-info text-black me-3 mt-2 p-2" : "serverButton bg-primary me-3 mt-2 p-2"} onClick={handleServer} id={servers} key={index}>{servers}</li>
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