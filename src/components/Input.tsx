import { Search } from 'react-bootstrap-icons'
import { inputSettings } from '../@type/type'
import '../style/input.scss'
const Input: React.FC<inputSettings> = ({ placeHolder, value, handleInput, searchButton, onClick }) => {
    return (
        <div className="w-75 mt-5 mb-2 d-flex align-items-center">
            <input className="searchBar  p-2 w-100" type="text" value={value} onChange={handleInput} placeholder={placeHolder} />
            {searchButton ? <button className="searchBtn ms-1 py-1 px-3" onClick={onClick}><Search /></button> : null}
        </div>
    )
}

export default Input