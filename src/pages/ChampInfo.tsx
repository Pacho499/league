import { useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Carousel from 'react-bootstrap/Carousel'
import Spinner from '../components/Spinner'
import { useSelector } from 'react-redux'
import '../style/championInfo.scss'
import { Star, StarFill } from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux'
import { saveChamp, deleteSavedChamp } from '../store/actions/handleAccount'
import { fetchSavedChamp } from '../store/actions/handleAccount'
const ChampInfo: React.FC = () => {

    const props = useParams()
    const [champ, setChamp] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [isSaved, setIsSaved] = useState<boolean>(false)
    const language = useSelector((state: any) => state.settingsReducer.language)
    const token = useSelector((state: any) => state.authReducer.token)
    const localId = useSelector((state: any) => state.authReducer.localId)
    const savedChamp = useSelector((state: any) => state.accountReducer.champName)
    const dispatch: any = useDispatch()
    const champName: any = props.champName

    useEffect(() => {
        const fetchChamp: () => void = async () => {
            const res = await Axios.get(
                `http://ddragon.leagueoflegends.com/cdn/12.20.1/data/${language}/champion/${champName}.json`
            );
            const data = res.data.data[champName]
            setChamp(data)
            setLoading(true)
        }
        fetchChamp()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language])

    useEffect(() => {
        (fetchSavedChamp(localId))
        for (let key in savedChamp) {
            if (savedChamp[key] === champName) {
                setIsSaved(true)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [savedChamp])

    const renderChampTag = () => {
        const champTag = champ.tags
        return champTag.map((value: string, index: number) => {
            return <h5 className='me-2' key={index}>{value} |</h5>
        })
    }

    const renderAllyTips = () => {
        const tips = champ.allytips
        return tips.map((tip: string, index: number) => {
            return <p className='border-bottom' key={index}>{index + 1} {"=>"} {tip}</p>
        }
        )
    }
    const renderEnemyTips = () => {
        const tips = champ.enemytips
        return tips.map((tip: string, index: number) => {
            return <p className='border-bottom' key={index}>{index + 1} {"=>"} {tip}</p>
        }
        )
    }

    const renderSpells = () => {
        const command = ['Q', 'W', 'E', 'R']
        const spells = champ.spells
        for (let i = 0; i < spells.length; i++) {
            Object.assign(spells[i], command[i])
        }
        return spells.map((spell: any, index: number) => {
            return <Tab key={index} tabClassName='text-white' eventKey={spell[0]} title={spell[0]}>
                <div className='d-flex align-items-center ms-2 my-2'>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/spell/${champ.spells[index].image.full}`} alt="" />
                    <h3 className='ms-3'>{spell.name}</h3>
                </div>
                <div className='ms-2'>
                    <h5>{spell.description}</h5>
                    <h5>Cost : {spell.costBurn}</h5>
                </div>

            </Tab>
        })
    }

    const renderSkins = () => {
        const skinDefault = champ.skins
        const skinsId: number[] = []
        const champName: string = champ.id
        for (let i = 0; i < skinDefault.length; i++) {
            skinsId.push(champ.skins[i].num)
        }
        return skinsId.map((value: number, index: number) => {
            return <Carousel.Item key={index}>
                <img className='carousel' width="700px" src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_${value}.jpg`} alt="" />
            </Carousel.Item>
        })
    }

    const prefChamp = () => {
        dispatch(saveChamp(champName, localId, savedChamp))
    }

    const deletePrefChamp = () => {
        const getIdKey: any = () => {
            for (let key in savedChamp) {
                if (savedChamp[key] === champName) {
                    return key
                }
            }
        }
        const idKey = getIdKey()
        dispatch(deleteSavedChamp(localId, idKey, savedChamp, champName))
        setIsSaved(false)
    }
    return <div>
        {loading ?

            <div className='champContainer d-md-flex justify-content-around mt-5'>
                <div className='champInfoContainer col-md-6 mb-3 me-3 p-1'>
                    <div className='d-flex align-items-center'>
                        <img src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${champ.id}.png`} alt="" />
                        <div className='ms-2'>
                            {token ? <div className='d-flex'>
                                <h1>{champ.name}</h1>
                                {isSaved ? <StarFill onClick={deletePrefChamp} className='ms-2' size={30} /> : <Star onClick={prefChamp} className='ms-2' size={30} />}
                            </div> :
                                <div className='d-flex'>
                                    <h1>{champ.name}</h1>
                                </div>}

                            <h3>{champ.title}</h3>
                            <div className='d-flex'>
                                {renderChampTag()}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1>Tips</h1>
                        <Tabs
                            defaultActiveKey="Ally Tips"
                            className="mb-3"
                            justify
                        >
                            <Tab tabClassName='text-white' eventKey="Ally Tips" title="Ally Tips">
                                {renderAllyTips()}
                            </Tab>
                            <Tab tabClassName='text-white' eventKey="Enemy Tips" title="Enemy Tips">
                                {renderEnemyTips()}
                            </Tab>

                        </Tabs>
                    </div>
                    <div>
                        <h1>Spells</h1>
                        <div>
                            <Tabs
                                defaultActiveKey="Passive"

                                className="mb-3"
                                justify
                            >
                                <Tab tabClassName='text-white' eventKey="Passive" title="Passive">
                                    <div className='d-flex align-items-center ms-2 my-2'>
                                        <img src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/passive/${champ.passive.image.full}`} alt="" />
                                        <h3 className='ms-3'>{champ.passive.name}</h3>
                                    </div>
                                    <h5 className='ms-2'>{champ.passive.description}</h5>
                                </Tab>
                                {renderSpells()}
                            </Tabs>
                        </div>
                    </div>
                </div>
                <div className='champLoreContainer col-md-6'>
                    <div className=' mb-3 me-3 p-2'>
                        <h1 className='text-center'>Lore</h1>
                        <p>{champ.lore}</p>
                    </div>
                    <div className='mb-3 p-1 text-center d-none d-lg-block'>
                        <h1>Skins</h1>
                        <Carousel>
                            {renderSkins()}
                        </Carousel>
                    </div>
                </div>

            </div>
            : <Spinner />}
    </div>
}

export default ChampInfo