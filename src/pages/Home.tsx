import ServerButtons from '../components/ServerButtons'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../components/Input'
import axios from 'axios'
import '../style/home.scss'
import { useSelector } from 'react-redux'
const Home: React.FC = () => {

    const [champRotation, setChampRotation] = useState<string[]>([])
    const [input, setInput] = useState<string>("")
    const language = useSelector((state: any) => state.settingsReducer.language)
    useEffect(() => {
        const fetchChamp: () => void = async () => {
            try {
                const response = await axios.get(
                    "https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=RGAPI-11f44588-d9c0-4448-800f-0b0bdf8db81a"
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
                <Input placeHolder='Search a summoner' value={input} handleInput={handleInput} searchButton={true} />
                <ServerButtons />
            </div>
            <h1 className="text-center mt-4">Weekly champion rotation</h1>
            <div className="d-flex row justify-content-center mx-auto mt-5 w-100 ">
                {renderChamp()}
            </div>
        </div>
    )
}

export default Home