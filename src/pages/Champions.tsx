import Input from '../components/Input'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../style/champions.scss'

const Champions: React.FC = () => {
    const [champs, setChamps] = useState<string[]>([])
    const [input, setInput] = useState<string>("")

    useEffect(() => {
        const fetchAllChamp: () => void = async () => {
            try {
                const res = await Axios.get(
                    `http://ddragon.leagueoflegends.com/cdn/12.20.1/data/it_IT/champion.json`
                );
                const data = res.data.data
                const allImg: any = []
                for (let x in data) {
                    allImg.push(data[x].image.full)
                }
                setChamps(allImg)
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllChamp();
    }, [])

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
                <Input placeHolder='Search a champion' value={input} handleInput={handleInput} searchButton={false} />
            </div>
            <div className='d-flex row justify-content-center mx-auto mt-5 w-100 '>
                {renderChamp()}
            </div>
        </div>
    )


}

export default Champions