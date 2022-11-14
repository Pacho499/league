import ServerButtons from "../components/ServerButtons"
import React, { useEffect, useState } from "react"
import { Search } from 'react-bootstrap-icons'
import axios from "axios"
import '../style/home.scss'
const Home: React.FC = () => {

    const [champRotation, setChampRotation] = useState<[]>([])

    useEffect(() => {
        const fetchChamp: () => void = async () => {
            try {
                const response = await axios.get(
                    "https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=RGAPI-e1417583-4f29-47e6-b73d-f59a2f7fcdb7"
                );
                const data = response.data.freeChampionIds;
                const allchamp = await axios.get(
                    `http://ddragon.leagueoflegends.com/cdn/12.20.1/data/it_IT/champion.json`
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

    const renderChamp = () => {
        return champRotation.map((value: string) => {
            const url = value.replace(".png", "");
            console.log(url);
            return (
                <img
                    className="my-2 mx-1 col col-xs-3 col-md-2"
                    id="champRotationImg"
                    src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${value}`}
                    alt="champion"
                />
            );
        });
    };

    return (
        <div>
            <div className="d-flex flex-column mt-5 align-items-center">
                <div className="w-75 mt-5 mb-2 d-flex align-items-center">
                    <input className="searchBar  p-2 w-100" type="text" placeholder="Search a Summoner" />
                    <button className="searchBtn ms-1 py-1 px-3"><Search /></button>
                </div>
                <ServerButtons />
            </div>
            <h1 className="text-center mt-4">Weekly champion rotation</h1>
            <div className="d-flex row justify-content-center mx-auto mt-5 w-75 ">
                {renderChamp()}
            </div>
        </div>
    )
}

export default Home