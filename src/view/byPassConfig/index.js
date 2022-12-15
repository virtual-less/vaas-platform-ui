import { Select, Button, message } from 'antd';
import { useState, useEffect, useContext } from 'react'
import { getApi, putApi } from '../../api';
import {AppContext} from '../../context/app';
import Latest from './strategy/latest';
import Lock from './strategy/lock';
import Weight from './strategy/weight';

export default function ByPassConfig() {
    const {appName} = useContext(AppContext)
    const [strategyType, setStrategyType] = useState(null)
    const [strategyData, setStrategyData] = useState({})
    const [versionOptions, setVersionOptions] = useState([])
    async function getData() {
        if(!appName) {return}
        const versionListJSON = (await getApi('/platform/getAllVsersionByAppName',{appName})).data || []
        setVersionOptions(versionListJSON.map(version=>{
            return {
                value: version,
                label: version,
            }
        }))
        const byPassDataJSON = (await getApi('/platform/getByPassDataByAppName',{appName})).data || {}
        setStrategyType(byPassDataJSON.type)
        setStrategyData(byPassDataJSON)
    }
    useEffect(()=>{
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[appName])
    if(!appName) {
        return (
            <div style={{padding:'32px'}}>
                <h1>请先选择App,才能进行分流配置</h1>
            </div>
        )
    }
    const strategyOptions = [
        {
        value: 'latest',
        label: '最新版本',
        },
        {
        value: 'lock',
        label: '锁定版本',
        },
        {
        value: 'weight',
        label: '权重版本',
        },
    ]
    
    
    const strategyTypeChangeHandle = (value) => {
        setStrategyType(value)
    };

    const saveByPassFlowStrategy = async () => {
        strategyData.type = strategyType
        if(!strategyData.type) {
            return message.error(`分流类型不能为空`)
        }
        if(strategyData.type === 'lock') {
            if(!strategyData?.lock?.version) {
                return message.error(`锁定版本不能为空`)
            }
        }
        if(strategyData.type === 'weight') {
            if(!strategyData.weight) {
                return message.error(`请先配置权重版本`)
            }
            for(const weight of strategyData.weight) {
                if(!weight.version) {
                    return message.error(`权重版本不能为空`)
                }
                if(!weight.weight) {
                    return message.error(`权重值不能为空`)
                }
            }
        }
        await putApi('/platform/updateByPassConfig',{appName, strategy:strategyData})
        message.success(`修改App(${appName})分流配置成功`)
    };

    const changeLockVersion = ({version}) => {
        const newStrategyData = {...strategyData}
        newStrategyData.lock = {version}
        setStrategyData(newStrategyData)
    };
    const updateWeightList = ({weightList}) => {
        const newStrategyData = {...strategyData}
        newStrategyData.weight = weightList
        setStrategyData(newStrategyData)
    };
    
    return (
        <div style={{padding:'32px'}}>
            分流类型: &nbsp;<Select
            value={strategyType}
            style={{ width: 120 }}
            onChange={strategyTypeChangeHandle}
            options={strategyOptions}
            />
            {
                strategyType==='latest'?<Latest strategyData={strategyData}/>:''
            }
            {
                strategyType==='lock'?<Lock 
                strategyData={strategyData} 
                versionOptions={versionOptions} 
                changeLockVersion={changeLockVersion}
                />:''
            }
            {
                strategyType==='weight'?<Weight 
                strategyData={strategyData} 
                versionOptions={versionOptions} 
                updateWeightList={updateWeightList} 
                />:''
            }
            <Button type="primary" onClick={saveByPassFlowStrategy}>
                保存分流配置
            </Button>
        </div>
    )
}