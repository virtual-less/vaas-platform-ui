import './hostConfig.css'
import { useState, useEffect } from 'react'
import { getApi } from '../../api';
import { Input, Select, Col, Row, Button } from 'antd';

export default function HostConfig() {
    const [hostList, sethostList] = useState([])
    const [appOptionList, setAppOptionList] = useState([])
    useEffect(()=>{
        async function getData() {
            const getAllHostListJSON = await getApi('/platform/getAllHostList')
            sethostList(getAllHostListJSON.data)
            const getAllAppListJSON = await getApi('/platform/getAllAppList')
            setAppOptionList(getAllAppListJSON.data)
        }
        getData()
    },[])
    return (
        <div>
            {
                hostList.map(hostData=>{
                    return (
                        <Row className='marginTop20' gutter={16}>
                            <Col  offset={2} span={14}>
                                <Input placeholder='请输入域名'  value={hostData.host} disabled={true}/>
                            </Col>
                            <Col span={8}>
                                <Select value={hostData.appName}>
                                {
                                    appOptionList.map((appOption)=>{
                                        return (<Select.Option 
                                            key={appOption.appName} 
                                            value={appOption.appName} 
                                            label={appOption.description}
                                        >
                                        <div>
                                        {appOption.appName}({appOption.description})
                                        </div>
                                    </Select.Option>)
                                    })
                                }
                                </Select>
                                <Button type="link">修改</Button>
                                <Button type="link" danger>删除</Button>
                            </Col>
                        </Row>
                    )
                })
            }
            <Row className='marginTop20' gutter={16}>
                <Col  offset={2} span={14}>
                    <Button type="primary" onClick={()=>{
                        alert('todo')
                    }}>新增</Button>
                </Col>
            </Row>
            
        </div>
    );
}