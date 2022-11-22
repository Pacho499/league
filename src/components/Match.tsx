import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ApiKey } from '../data'
import '../style/summonerInfo.scss'
import Spinner from '../components/Spinner'


const Match: React.FC = () => {

    const summonerData = useSelector((state: any) => state.summonerReducer.data)
    const countryServer = useSelector((state: any) => state.settingsReducer.countryServer)
    const [matches, setMatches] = useState<any[]>([])
    const [loadingPage, setLoadingPage] = useState<boolean>(false)
    useEffect(() => {

        const fetchGamesId = async () => {
            setLoadingPage(true)
            const response = await axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerData.puuid}/ids?start=0&count=10&api_key=${ApiKey}`)
            const matchData: string[] = []
            const data = response.data
            for (let i = 0; i < data.length; i++) {
                const res = await axios.get(`https://${countryServer}.api.riotgames.com/lol/match/v5/matches/${data[i]}?api_key=${ApiKey}`)
                const matchesData = res.data
                matchData.push(matchesData)
            }
            setMatches(matchData)
            setLoadingPage(false)
        }
        fetchGamesId()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderMatches = () => {
        return matches.map((value, index) => {
            const participants = value.info.participants
            let summoner: number = 12
            for (let i = 0; i < participants.length; i++) {
                if (participants[i].puuid === summonerData.puuid) {
                    summoner = i
                }
            }
            const data = value.info.participants
            const win = (data[summoner].win)
            return <div key={index} className='matchContainer bg-primary d-flex justify-content-around align-items-center w-75 m-auto my-2 text-center'>
                <div className='mx-1'>
                    <h4>{value.info.gameMode}</h4>
                    {win ? <p className='win'>Win</p> : <p className='lose'>Lose</p>}
                </div>
                <div className='mx-1' >
                    <img height='70px' src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${data[summoner].championName}.png`} alt="" />
                    <h5>Lv: {data[summoner].champLevel}</h5>
                </div>

                <div className='mx-1'>
                    <h4>K/D/A</h4>
                    <h5>{data[summoner].kills}/{data[summoner].deaths}/{data[summoner].assists}</h5>
                    <h5>CS: {data[summoner].totalMinionsKilled}</h5>
                </div>
                <div className='mx-1 d-none d-sm-block'>
                    <h4>Build</h4>
                    <img height="40px" src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${data[summoner].item0}.png`} alt="" />
                    <img height="40px" src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${data[summoner].item1}.png`} alt="" />
                    <img height="40px" src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${data[summoner].item2}.png`} alt="" />
                    <img height="40px" src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${data[summoner].item3}.png`} alt="" />
                    <img height="40px" src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${data[summoner].item4}.png`} alt="" />
                    <img height="40px" src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${data[summoner].item5}.png`} alt="" />
                    <img height="40px" src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${data[summoner].item6}.png`} alt="" />
                </div>
            </div>

        })
    }

    return <div>
        {loadingPage ? <Spinner /> : renderMatches()}
    </div>
}

export default Match