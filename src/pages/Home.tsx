import Navbar from "../components/Navbar"
import ServerButtons from "../components/ServerButtons"
import '../style/home.scss'
const Home: React.FC = () => {
    return (
        <div>
            <Navbar />
            <div className="d-flex flex-column mt-5 align-items-center">
                <div className="w-75 mt-5 mb-2 d-flex align-items-center">
                    <input className="searchBar  p-2 w-100" type="text" />
                    <button className="searchBtn p-1">Cerca</button>
                </div>
                <ServerButtons />

            </div>



        </div>
    )
}

export default Home