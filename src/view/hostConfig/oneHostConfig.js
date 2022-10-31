import './oneHostConfig.css'
import { deleteApi, postApi, putApi } from '../../api';
import { Input, Select, Col, Row, Button, message } from 'antd';
import { useState } from 'react'

export default function OneHostConfig(props) {
    const [hostValue, setHostValue] = useState(props.hostData.host)
    const [appNameValue, setAppNameValue] = useState(props.hostData.appName)

    const setHost = async (hostData)=>{
        if(!(/\.\w+$/.exec(hostValue))) {
            return message.error(`${hostValue}不是一个域名`)
        }
        if(!appNameValue) {
            return message.error(`请选择一个app进行转发`)
        }
        if(hostData.isNew) {
            await postApi('/platform/createHostConfig',{
                host:hostValue,
                appName:appNameValue
            })
        } else {
            await putApi('/platform/updateHostConfig',{
                host:hostValue,
                appName:appNameValue
            })
        }
        props.onUpdate(hostData)
        message.success(`修改(${hostValue})成功`)
    }

    const delHost = async (hostData)=>{
        if(hostData.host) {
            await deleteApi(`/platform/deleteHostConfig/${hostData.host}`)
            message.success(`删除(${hostData.host})成功`)
        }
        props.onDelete(hostData)
    }

    

    return (<Row 
        className='marginTop20' gutter={16}
    >
        <Col  offset={2} span={14}>
            <Input placeholder='请输入域名'  
            defaultValue={props.hostData.host} 
            disabled={!props.hostData.isNew}
            onChange={(input)=>{
                setHostValue(input.target.value)
            }}
            />
        </Col>
        <Col span={8}>
            <Select 
            defaultValue={props.hostData.appName} 
            onChange={setAppNameValue}
            style={{width:'100px'}}>
            {
                props.appOptionList.map((appOption, appOptionIndex)=>{
                    return (
                    <Select.Option 
                            key={appOptionIndex} 
                            value={appOption.appName} 
                            label={appOption.appName}
                        >
                        {appOption.appName}
                    </Select.Option>)
                })
            }
            </Select>
            <Button type="link" onClick={()=>setHost(props.hostData)}>修改</Button>
            <Button type="link" danger onClick={()=>delHost(props.hostData)}>删除</Button>
        </Col>
    </Row>)
}