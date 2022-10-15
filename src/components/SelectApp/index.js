import './SelectApp.css'
import { Select, Button} from 'antd';
import {useState} from 'react';
const { Option } = Select;


export default function SelectApp(){
    const [appData,setAppData] = useState(null)
    const handleChangeApp = (value)=>{
        setAppData(value)
    }
    const appOptionList = [
        {
            appName:'test',
            description:'测试App'
        }
    ]
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
                            {appOption.description}
                        </div>
                    </Option>)
                    })
                }
                </Select> 
            </div>
            <div>
                <Button type="link">
                    创建新APP
                </Button>
            </div>
        </div>
    )
}