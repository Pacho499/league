import ServerButtons from '../components/ServerButtons'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../components/Input'
import axios from 'axios'
import '../style/home.scss'
import { useSelector } from 'react-redux'
import { ApiKey } from '../data'
import { useDispatch } from 'react-redux'
import { setSummonerData } from '../store/actions/handleSummoner'
const Home: React.FC = () => {

    const [champRotation, setChampRotation] = useState<string[]>([])
    const [input, setInput] = useState<string>("")
    const language = useSelector((state: any) => state.settingsReducer.language)
    const server = useSelector((state: any) => state.settingsReducer.server)
    const summonerData = useSelector((state: any) => state.summonerReducer.data)
    const loaded = useSelector((state: any) => state.summonerReducer.loaded)
    const dispatch: any = useDispatch()
    useEffect(() => {
        const fetchChamp: () => void = async () => {
            try {
                const response = await axios.get(
                    `https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${ApiKey}`
                );
                const data = response.data.freeChampionIds;
                const allchamp = await axios.get(
                    `http://ddragon.leagueoflegends.com/cdn/12.20.1/data/${language}/champion.json`
                );
                const keyChamp = allchamp.data.data;
                const img: any = [];
                for (let i = 0; i < data.length; i++) {
                    const key = data[i];
                    for (let x in keyChamp) {
                        const allKeys = keyChamp[x].key;
                        const allKeysNum = parseInt(allKeys);
                        if (key === allKeysNum) {
                            img.push(keyChamp[x].image.full);
                        }
                    }
                }
                setChampRotation(img);
            } catch (error) {
                console.log(error);
            }
        };
        fetchChamp();
    }, [])

    const fetchSummoners = async () => {
        const response = await axios.get(`https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${input}?api_key=${ApiKey}`)
        const data = response.data
        dispatch(setSummonerData(data.id, data.puuid, data.name, data.summonerLevel, data.profileIconId))
    }



    const renderSummoners = () => {
        return (
            <Link to={`/${summonerData.name}`}>
                <div className='summonerContainer bg-primary d-flex align-items-center w-50 m-auto my-5 p-2 justify-content-between text-white'>
                    <div className='d-flex align-items-center'>
                        <img height="100px" src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/profileicon/${summonerData.profileImage}.png`} alt="" />
                        <h1 className='ms-2'>{summonerData.name}</h1>
                    </div>
                    <h4 className='me-2 d-none d-sm-block'>Lv: {summonerData.lv}</h4>
                </div>
            </Link>

        )
    }

    const handleInput = (e: any) => {
        setInput(e.target.value)
    }

    const renderChamp = () => {
        return champRotation.map((value: string, index: number) => {
            const url = value.replace(".png", "");
            return (
                <Link key={index} to={`/champions/${url}`} className="champRot col col-xs-1 col-md-2 col-lg-1 mx-3">
                    <img
                        className='my-3'
                        id="champRotationImg"
                        src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${value}`}
                        alt="champion"
                    />
                </Link>

            );
        });
    };

    return (
        <div>
            <div className="d-flex flex-column mt-5 align-items-center">
                <Input placeHolder='Search a summoner' onClick={fetchSummoners} value={input} handleInput={handleInput} searchButton={true} />
                <ServerButtons />
            </div>
            <div>
                {loaded ? renderSummoners() : null}
            </div>
            <h1 className="text-center mt-4">Weekly champion rotation</h1>
            <div className="d-flex row justify-content-center mx-auto mt-5 w-100 ">
                {renderChamp()}
            </div>
        </div>
    )
}

export default Home