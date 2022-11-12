import logo from "../images/logo.png"
import { BookmarkFill, HouseFill, PersonBadgeFill, Translate } from "react-bootstrap-icons"
const Navbar: React.FC = () => {
    return (
        <div className="container-fluid bg-primary d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
                <img src={logo} alt="logo" height="100px" />
                <h1 className="m-0">League of Wiki</h1>
            </div>
            <div>
                <Translate className='me-3' size={40} />
                <HouseFill className="me-3" size={40} />
                <BookmarkFill className="me-3" size={40} />
                <PersonBadgeFill size={40} />
            </div>
        </div>
    )
}

export default Navbar

