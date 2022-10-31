import Icon from './icon.png';
import SelectApp from '../../components/SelectApp/index'
import { useContext } from 'react'
import {AppContext} from '../../context/app';
export default function HomeHeader() {
    const {setAppName} = useContext(AppContext)
    const createAppEventHandle = () => {
        setAppName('')
    };

    return (
        <div className='flex-space-between'>
            <div>
                <img 
                src={Icon} 
                alt="" width="30" height="30" 
                />
                Virtual as a Service Platform
            </div>
            <div>
            <SelectApp createAppEvent={createAppEventHandle} />
            </div>
        </div>
    )
}