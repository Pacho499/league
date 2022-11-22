import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { setSummonerRank } from '../store/actions/handleSummoner'
import { ApiKey } from '../data'
import '../style/summonerInfo.scss'
import Match from '../components/Match'


const SummonerInfo: React.FC = () => {

    const summonerData = useSelector((state: any) => state.summonerReducer.data)
    const loading = useSelector((state: any) => state.summonerReducer.loading)
    const server = useSelector((state: any) => state.settingsReducer.server)
    const rank = useSelector((state: any) => state.summonerReducer.rank)
    const dispatch: any = useDispatch()
    useEffect(() => {
        const fetchRank = async () => {
            const response = await axios.get(`https://${server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.encryptedSummonerId}?api_key=${ApiKey}`)
            dispatch(setSummonerRank(response.data))
        }
        fetchRank()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    return <div>

        <div>
            <div className='bio d-flex justify-content-around mt-4'>
                <div className='d-flex align-items-center'>
                    <img height='100px' src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/profileicon/${summonerData.profileImage}.png`} alt="" />
                    <div className='ms-2'>
                        <h1>{summonerData.name}</h1>
                        <h3>Lv: {summonerData.lv}</h3>
                    </div>
                </div>
                {loading ? null
                    :
                    <div className='d-flex'>
                        {renderRank()}
                    </div>}
            </div>
            <div className='mt-5 text-center mb-2'>
                <h1>Last matches</h1>
                <Match />
            </div>
        </div>


    </div>
}

export default SummonerInfo