import { useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import '../style/championInfo.scss'
const ChampInfo: React.FC = () => {

    const props = useParams()
    const [champ, setChamp] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const champName: any = props.champName
        const fetchChamp = async () => {
            const res = await Axios.get(
                `http://ddragon.leagueoflegends.com/cdn/12.20.1/data/it_IT/champion/${champName}.json`
            );
            const data = res.data.data[champName]
            setChamp(data)
            setLoading(true)
        }
        fetchChamp()
    }, [])
    console.log(champ)
    return <div>
        {loading ?
            <div className='champContainer d-md-flex justify-content-around mt-5'>
                <div className='border col-md-6 mb-3 me-3 p-1'>
                    <div className='d-flex align-items-center'>
                        <img src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${champ.id}.png`} alt="" />
                        <div className='ms-2'>
                            <h1>{champ.name}</h1>
                            <h3>{champ.title}</h3>
                            <h5>{champ.tags}</h5>
                        </div>
                    </div>
                    <div>
                        <h1>Spells</h1>
                        <div>
                            <Tabs
                                defaultActiveKey="Passive"
                                id="justify-tab-example"
                                className="mb-3"
                                justify
                            >
                                <Tab tabClassName='text-white' eventKey="Passive" title="Passive">
                                    <div className='d-flex align-items-center ms-2 my-2'>
                                        <img src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/passive/${champ.passive.image.full}`} alt="" />
                                        <h3 className='ms-3'>{champ.passive.name}</h3>
                                    </div>
                                    <p className='ms-2'>{champ.passive.description}</p>
                                </Tab>
                                <Tab tabClassName='text-white' eventKey="Q" title="Q">

                                </Tab>
                                <Tab tabClassName='text-white' eventKey="W" title="W">

                                </Tab>
                                <Tab tabClassName='text-white' eventKey="E" title="E">

                                </Tab>
                                <Tab tabClassName='text-white' eventKey="R" title="R">

                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
                <div className='border col-md-3 mb-3 me-3 p-2'>
                    <h1 className='text-center'>Lore</h1>
                    <p>{champ.lore}</p>
                </div>
                <div className='border col-md-3 mb-3 p-1'>
                    skin
                </div>
            </div>
            : <h1>caricamento</h1>}
    </div>
}

export default ChampInfo