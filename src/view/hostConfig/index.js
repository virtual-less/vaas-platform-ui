import './hostConfig.css'
import { useState, useEffect } from 'react'
import { getApi } from '../../api';
import {Col, Row, Button } from 'antd';
import OneHostConfig from './oneHostConfig';

export default function HostConfig() {
    const [hostList, sethostList] = useState([])
    const [appOptionList, setAppOptionList] = useState([])
    async function getData() {
        const getAllHostListJSON = await getApi('/platform/getAllHostList')
        sethostList(getAllHostListJSON.data.map(hostData=>{
            hostData.isNew=false
            return hostData
        }))
        const getAllAppListJSON = await getApi('/platform/getAllAppList')
        setAppOptionList(getAllAppListJSON.data)
    }
    useEffect(()=>{
        getData()
    },[])

    const addHost = ()=>{
        const newHostList=[...hostList]
        newHostList.push({appName:'',host:'', isNew:true})
        sethostList(newHostList)
    }

    const updateHostData = async (hostData)=>{
        hostData.isNew = false
        sethostList([...hostList])
        await getData()
    }
    const deleteHostData = async (hostData)=>{
        if(hostData.host) {
            await getData()
        } else {
            hostList.splice(hostList.indexOf(hostData),1)
            sethostList([...hostList])
        }
    }
    

    return (
        <div>
            {
                hostList.map((hostData)=>{
                    return (
                        <OneHostConfig 
                        key={hostData.host}
                        hostData={hostData}
                        appOptionList={appOptionList}
                        onUpdate={()=>{updateHostData(hostData)}}
                        onDelete={()=>{deleteHostData(hostData)}}
                        />
                    )
                })
            }
            <Row className='marginTop20' gutter={16}>
                <Col  offset={2} span={14}>
                    <Button type="primary" onClick={addHost}>新增</Button>
                </Col>
            </Row>
            
        </div>
    );
}