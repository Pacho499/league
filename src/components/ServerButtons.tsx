import { Server } from "../data"
import { useSelector, useDispatch } from "react-redux"
import { changeServer } from "../store/actions/handleSetting"
import Dropdown from 'react-bootstrap/Dropdown'
import { ClipboardDataFill } from 'react-bootstrap-icons'
import '../style/serverButton.scss'
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
            <div className='d-none d-md-block'>
                <ul className="ulList d-flex justify-content-center">
                    {renderServer()}
                </ul>
            </div>
            <div className='d-block d-md-none'>
                <Dropdown className='d-flex justify-content-center'>
                    <Dropdown.Toggle><ClipboardDataFill size={40} /></Dropdown.Toggle>
                    <Dropdown.Menu className='dropdown bg-primary text-center'>
                        {renderServer()}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

        </div>
    )
}

export default ServerButtons