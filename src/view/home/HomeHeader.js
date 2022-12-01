import Icon from './icon.png';
import SelectApp from '../../components/SelectApp/index'
import { useNavigate } from "react-router-dom";
import {Button } from 'antd';

export default function HomeHeader() {
    const navigate = useNavigate()
    return (
        <div className='flex-space-between min-width-1024'>
            <div>
                <img 
                src={Icon} 
                alt="" width="30" height="30" 
                />
                Virtual as a Service Platform
                &nbsp;&nbsp;&nbsp;
                <Button onClick={()=>{navigate('/appConfig')}} >APP配置</Button>
                &nbsp;&nbsp;&nbsp;
                <Button onClick={()=>{navigate('/hostConfig')}} >域名配置</Button>
            </div>
            <div>
            <SelectApp />
            </div>
        </div>
    )
}