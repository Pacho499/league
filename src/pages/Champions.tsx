import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import Input from '../components/Input'
import Spinner from '../components/Spinner'
import Errors from '../components/Errors'
import '../style/champions.scss'

const Champions: React.FC = () => {
    const [champs, setChamps] = useState<string[]>([])
    const [input, setInput] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const language = useSelector((state: any) => state.settingsReducer.language)


    useEffect(() => {
        const fetchAllChamp: () => void = async () => {
            try {
                const res = await Axios.get(
                    `http://ddragon.leagueoflegends.com/cdn/12.20.1/data/${language}/champion.json`
                );
                const data = res.data.data
                const allImg: any = []
                for (let x in data) {
                    allImg.push(data[x].image.full)
                }
                setChamps(allImg)
                setLoading(false)
                setError(false)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        };
        fetchAllChamp();
    }, [language])

    const handleInput = (e: any) => {
        setInput(e.target.value)
    }
    const renderChamp = () => {

        return champs
            .filter(champ => input === '' || champ.includes(input))
            .map((value: string, index: number) => {
                const url = value.replace(".png", "");
                return (
                    <Link key={index} to={`/champions/${url}`} className="champSearch d-flex flex-column text-center text-white col col-xs-1 col-md-2 col-lg-1 px-3">
                        <img
                            className='my-3'
                            id="champRotationImg"
                            src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${value}`}
                            alt="champion"
                        />
                        <p>{url}</p>
                    </Link>


                );
            });
    };


    return (
        <div>
            <div className="d-flex flex-column mt-5 align-items-center">
                <Input onClick={null} placeHolder='Search a champion' value={input} handleInput={handleInput} searchButton={false} />
            </div>
            <div className={loading ? '' : 'd-flex row justify-content-center mx-auto mt-5 w-100'}>
                {error ? <Errors /> : null}
                {loading ? <Spinner /> : renderChamp()}
            </div>
        </div>
    )


}

export default Champions