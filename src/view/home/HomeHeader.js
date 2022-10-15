import Icon from './icon.png';
import SelectApp from '../../components/SelectApp/index'
export default function HomeHeader() {
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
                <SelectApp />
            </div>
        </div>
    )
}