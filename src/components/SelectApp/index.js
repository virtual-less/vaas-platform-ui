import './SelectApp.css'
import { Select, Button, message} from 'antd';
import {useState, useEffect, useContext} from 'react';
import { getApi, deleteApi } from '../../api';
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
    const clearAppEventHandle = ()=> {
        if(props.clearAppEvent) {
            props.clearAppEvent()
        }
        setAppName('')
    }
    const deleteApp = async ()=>{
        const deleteAppConfigSON = await deleteApi(`/platform/deleteAppConfig/${appName}`)
        if(deleteAppConfigSON.errmsg) {
            return message.error(deleteAppConfigSON.errmsg)
        }
        setAppName('')
        message.success(`删除(${appName})成功`)
    }
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
                            label={`${appOption.appName}(${appOption.description})`}
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
                <Button type="link" onClick={clearAppEventHandle}>
                    {props.clearAppText || '清除当前App选择'}
                </Button>
                {
                    appName && 
                    <Button type="link" onClick={deleteApp} danger>
                        删除APP
                    </Button>
                }
                
            </div>
        </div>
    )
}