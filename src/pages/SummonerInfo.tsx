import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { setSummonerRank } from '../store/actions/handleSummoner'
import { ApiKey } from '../data'
import '../style/summonerInfo.scss'
import Spinner from '../components/Spinner'


const SummonerInfo: React.FC = () => {

    const summonerData = useSelector((state: any) => state.summonerReducer.data)
    const loading = useSelector((state: any) => state.summonerReducer.loading)
    const server = useSelector((state: any) => state.settingsReducer.server)
    const rank = useSelector((state: any) => state.summonerReducer.rank)
    const [games, setGames] = useState<object[]>([])
    const [loadingPage, setLoadingPage] = useState<boolean>(true)
    const dispatch: any = useDispatch()
    useEffect(() => {
        const fetchRank = async () => {
            const response = await axios.get(`https://${server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.encryptedSummonerId}?api_key=${ApiKey}`)
            dispatch(setSummonerRank(response.data))
        }
        const fetchGames = async () => {
            const response = await axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerData.puuid}/ids?start=0&count=2&api_key=${ApiKey}`)
            const idGames: [] = (response.data)
            const gamesData: any[] = []
            idGames.map(async (game: string) => {
                const response = await axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${game}?api_key=${ApiKey}`)
                gamesData.push(response.data.info)
            })
            setGames(gamesData)
            setLoadingPage(false)
        }
        fetchGames()
        fetchRank()

    }, [])

    const renderRank = () => {
        return rank.map((rank: any, index: number) => {
            const soloQ = () => {
                if (index === 0) {
                    return true
                } else {
                    return false
                }
            }

            return <div key={index} className='rank d-flex flex-column text-center bg-primary p-2 m-2'>
                {soloQ() ? <h3>Solo Q</h3> : <h3>Flex</h3>}
                <h4>{rank.tier} {rank.rank} </h4>
                <h4>lp: {rank.leaguePoints}</h4>
            </div>
        })
    }

    const renderGames = () => {
        return games.map((value: any, index: number) => {
            return <div className='border'>
                {value.gameMode}
            </div>
        })
    }
    return <div>
        {loadingPage ? <Spinner /> :
            <div>
                <div className='d-flex justify-content-around mt-4'>
                    <div className='d-flex align-items-center'>
                        <img height='100px' src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/profileicon/${summonerData.profileImage}.png`} alt="" />
                        <div className='ms-2'>
                            <h1>{summonerData.name}</h1>
                            <h3>Lv: {summonerData.lv}</h3>
                        </div>
                    </div>
                    {loading ? null : <div className='d-flex'>
                        {renderRank()}
                    </div>}
                </div>
                <div>
                    {renderGames()}
                </div>
            </div>
        }

    </div>
}

export default SummonerInfo