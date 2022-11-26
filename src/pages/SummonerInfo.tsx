import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { setSummonerRank } from '../store/actions/handleSummoner'
import { ApiKey, DragonDatabase } from '../data'
import { Star, StarFill } from 'react-bootstrap-icons'
import { fetchSavedSummoner, saveSummoner, deleteSavedSummoner } from '../store/actions/handleAccount'
import axios from 'axios'
import Match from '../components/Match'
import Errors from '../components/Errors'
import '../style/summonerInfo.scss'

const SummonerInfo: React.FC = () => {

    const [isSaved, setIsSaved] = useState<boolean>(false)
    const summonerData = useSelector((state: any) => state.summonerReducer.data)
    const loading = useSelector((state: any) => state.summonerReducer.loading)
    const server = useSelector((state: any) => state.settingsReducer.server)
    const rank = useSelector((state: any) => state.summonerReducer.rank)
    const token = useSelector((state: any) => state.authReducer.token)
    const localId = useSelector((state: any) => state.authReducer.localId)
    const savedSummoner = useSelector((state: any) => state.accountReducer.summoner)
    const error = useSelector((state: any) => state.accountReducer.error)
    const dispatch: any = useDispatch()
    const summonerName = summonerData.name
    const summonerLv = summonerData.lv
    const summonerImg = summonerData.profileImage
    useEffect(() => {
        const fetchRank = async () => {
            const response = await axios.get(`https://${server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.encryptedSummonerId}?api_key=${ApiKey}`)
            dispatch(setSummonerRank(response.data))
        }
        fetchRank()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        fetchSavedSummoner(localId)
        for (let key in savedSummoner) {
            if (savedSummoner[key].name === summonerName) {
                setIsSaved(true)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [savedSummoner])

    const renderRank = () => {
        return rank.map((rank: any, index: number) => {
            const soloQ = () => {
                if (rank.queueType === 'RANKED_SOLO_5x5') {
                    return "soloQ"
                } else if (rank.queueType === 'RANKED_TFT_DOUBLE_UP') {
                    return 'TFT'
                } else {
                    return 'Flex'
                }
            }
            return <div key={index} className='rank d-flex flex-column text-center bg-primary p-2 m-2'>
                <h3>{soloQ()}</h3>
                <h4>{rank.tier} {rank.rank} </h4>
                <h4>lp: {rank.leaguePoints}</h4>
                <div className='d-flex justify-content-center'>
                    <h6 className='me-2'>Win: {rank.wins}</h6>
                    <h6>Lose: {rank.losses}</h6>
                </div>
            </div>
        })
    }

    const savePrefSummoner = () => {
        dispatch(saveSummoner({
            id: summonerData.puuid,
            encryptedId: summonerData.encryptedSummonerId,
            name: summonerName,
            localId,
            savedSummoner,
            lv: summonerLv,
            img: summonerImg
        }))
        setIsSaved(true)
    }


    const deletePrefSummoner = () => {
        const getIdKey: any = () => {
            for (let key in savedSummoner) {
                if (savedSummoner[key].name === summonerName) {
                    return key
                }
            }
        }
        const idKey = getIdKey()
        dispatch(deleteSavedSummoner({ localId, arrayId: idKey, savedSummoner, sumName: summonerName }))
        setIsSaved(false)
    }
    return <div>
        {error ? <Errors /> : null}
        <div>
            <div className='bio d-md-flex justify-content-around mt-4 w-75 m-auto'>
                <div className='d-flex align-items-center'>
                    <img height='100px' src={`${DragonDatabase}/cdn/12.22.1/img/profileicon/${summonerImg}.png`} alt="" />
                    <div className='ms-2'>
                        {token ?
                            <div className='d-flex'>
                                <h1>{summonerName}</h1>
                                {isSaved ? <StarFill onClick={deletePrefSummoner} className='ms-2' size={30} /> : <Star onClick={savePrefSummoner} className='ms-2' size={30} />}
                            </div>
                            :
                            <div className='d-flex'>
                                <h1>{summonerName}</h1>
                            </div>}
                        <h3>Lv: {summonerLv}</h3>
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