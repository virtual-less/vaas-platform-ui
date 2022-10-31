import './SelectApp.css'
import { Select, Button} from 'antd';
import {useState, useEffect, useContext} from 'react';
import { getApi } from '../../api';
import {AppContext} from '../../context/app';
const { Option } = Select;


export default function SelectApp(props){
    const [appData,setAppData] = useState(null)
    const {appName,setAppName} = useContext(AppContext)
    
    useEffect(()=>{
        setAppData(appName)
    },[appName])
    const handleChangeApp = (appName)=>{
        setAppData(appName)
        setAppName(appName)
    }
    const [appOptionList, setAppOptionList] = useState([])
    useEffect(()=>{
        async function getData() {
            const getAllAppListJSON = await getApi('/platform/getAllAppList')
            setAppOptionList(getAllAppListJSON.data)
        }
        getData()
    },[])
    const filterAppOptionList = (input, option) => {
        return option.value.includes(input) || option.label.includes(input)
    }
    return (
        <div className='inline-flex'>
            <div>
                请选择您的app: <Select
                    showSearch
                    value={appData}
                    style={{ width: '200px' }}
                    placeholder="请选择您的app"
                    onChange={handleChangeApp}
                    filterOption={filterAppOptionList}
                    optionLabelProp="label"
                >
                {
                    appOptionList.map((appOption)=>{
                        return (<Option 
                            key={appOption.appName} 
                            value={appOption.appName} 
                            label={appOption.description}
                        >
                        <div>
                        {appOption.appName}({appOption.description})
                        </div>
                    </Option>)
                    })
                }
                </Select> 
            </div>
            <div>
                <Button type="link" onClick={props.createAppEvent}>
                    创建新APP
                </Button>
            </div>
        </div>
    )
}