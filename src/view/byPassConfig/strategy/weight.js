import { Select, InputNumber, Button, message } from 'antd';
import { useState } from 'react'

export default function Weight(props) {
    const [weightList] = useState(
        props.strategyData?.weight || [{
            version:'',
            weight:1
        }]
    )
    const addWeight = ()=>{
        weightList.push({
            version:'',
            weight:1
        })
        props.updateWeightList({weightList})
    }
    const changeWeightVersion = (weight)=>{
        return (version)=>{
            weight.version = version
            props.updateWeightList({weightList})
        }
    }
    const changeWeightWeight  = (weight)=>{
        return (weightValue)=>{
            weight.weight = weightValue
            props.updateWeightList({weightList})
        }
    }
    const delWeight = (weight)=>{
        return ()=>{
            if(weightList.length<=1) {
                return message.error('权重版本至少需要一个权重配置')
            }
            weightList.splice(weightList.indexOf(weight),1)
            props.updateWeightList({weightList})
        }
    }

    return (
        <div style={{padding:'5px'}}>
            {
                weightList.map((weight,index)=>{
                    return (
                        <div 
                            key={index}
                            style={{padding:'3px'}}>
                            版本选择: &nbsp;
                            <Select
                            value={weight.version}
                            style={{ width: 120 }}
                            onChange={changeWeightVersion(weight)}
                            options={props.versionOptions}
                            />
                            &nbsp;&nbsp;
                            权重输入：&nbsp;
                            <InputNumber 
                                value={weight.weight}
                                min={1} max={100}
                                onChange={changeWeightWeight(weight)}
                            />
                            &nbsp;&nbsp;
                            <Button danger onClick={delWeight(weight)}>
                                删除
                            </Button>
                        </div>
                    )
                })
            }
            
            <Button onClick={addWeight}>
                添加权重
            </Button>
        </div>
    )
}