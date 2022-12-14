import logo from '../images/logo.png'
import Dropdown from 'react-bootstrap/Dropdown'
import { BookmarkFill, HouseFill, PersonBadgeFill, Translate, List } from 'react-bootstrap-icons'
import { languageObject } from '../@type/type'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changeLanguage } from '../store/actions/handleSetting'
const Navbar: React.FC = () => {

    const dispatch: any = useDispatch()
    const selectedLanguage = useSelector((state: any) => state.settingsReducer.language)
    const token = useSelector((state: any) => state.authReducer.token)
    const language: languageObject[] = [
        { id: 'cs_CZ', name: 'Czech' },
        { id: 'el_GR', name: 'Greek' },
        { id: 'pl_PL', name: 'Polish' },
        { id: 'ro_RO', name: 'Romanian' },
        { id: 'hu_HU', name: 'Hungarian' },
        { id: 'en_GB', name: 'English (UK)' },
        { id: 'en_US', name: 'English (USA)' },
        { id: 'de_DE', name: 'German' },
        { id: 'es_ES', name: 'Spanish' },
        { id: 'it_IT', name: 'Italian' },
        { id: 'fr_FR', name: 'French' },
        { id: 'ja_JP', name: 'Japanese' },
        { id: 'ko_KR', name: 'Korean' },
    ]

    const handleLanguage = (e: any) => {
        dispatch(changeLanguage(e.target.id))
    }

    const languageMenu = () => {
        return language.map((value: languageObject, index: number) => {
            const active = () => {

                if (value.id === selectedLanguage) {
                    return true
                } else {
                    return false
                }
            }
            return <Dropdown.Item active={active() ? true : false} onClick={handleLanguage} key={index} id={value.id}>{value.name}</Dropdown.Item>
        })
    }



    return (
        <div className='container-fluid bg-primary d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center'>
                <Link to='/'>
                    <img src={logo} alt='logo' height='100px' />
                </Link>
                <h1 className='m-0'>League of Wiki</h1>
            </div>
            <div className='d-none d-md-flex align-items-center'>
                <Dropdown>
                    <Dropdown.Toggle><Translate size={40} /></Dropdown.Toggle>
                    <Dropdown.Menu>
                        {languageMenu()}
                    </Dropdown.Menu>
                </Dropdown>
                <Link to='/'>
                    <HouseFill className='me-3 text-light' size={40} />
                </Link>
                <Link to='/champions'>
                    <BookmarkFill className='me-3 text-light' size={40} />
                </Link>
                <Link to={token ? '/account' : '/auth'}>
                    <PersonBadgeFill className='text-light' size={40} />
                </Link>
            </div>
            <div className='d-flex d-md-none'>
                <Dropdown>
                    <Dropdown.Toggle><Translate size={25} /></Dropdown.Toggle>
                    <Dropdown.Menu>
                        {languageMenu()}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle><List size={25} /></Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Link to='/' className='text-black d-flex align-items-center'>
                                <HouseFill className='text-black' size={25} />
                                <h4 className='ps-3'>Home</h4>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to='/champions' className='text-black d-flex align-items-center'>
                                <BookmarkFill className='text-black' size={25} />
                                <h4 className='ps-3'>Champions</h4>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to={token ? '/account' : '/auth'} className='text-black d-flex align-items-center'>
                                <PersonBadgeFill className='text-black' size={25} />
                                <h4 className='ps-3'>Account</h4>
                            </Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default Navbar

