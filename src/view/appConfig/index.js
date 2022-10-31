import SelectApp from '../../components/SelectApp/index'
import AppForm from '../../components/AppForm/index'
import { Modal } from 'antd';
import { useState, useContext, useEffect } from 'react'
import {AppContext} from '../../context/app';


export default function AppConfig() {
    const [selectAppModelOpen, setSelectAppModelOpen] = useState(false)
    const {appName} = useContext(AppContext)
    useEffect(()=>{
        if(!appName) {
            setSelectAppModelOpen(true);
        }
    },[appName])
    const selectAppModelHandleOk = () => {
        setSelectAppModelOpen(false);
      };
    const selectAppModelHandleCancel = () => {
        setSelectAppModelOpen(false);
    };

    const createAppEventHandle = () => {
        setSelectAppModelOpen(false);
    };
    return (
        <div>
            <Modal title="请选择App" 
            width="550px"
            open={selectAppModelOpen}
            onOk={selectAppModelHandleOk}
            okText="完成"
            onCancel={selectAppModelHandleCancel}
            cancelText="取消"
            >
                    <SelectApp clearAppEvent={createAppEventHandle} clearAppText="创建新App"/>
            </Modal>
            <div className='flex-center' style={{padding:'32px'}}>
                <div  style={{width:'600px'}}>
                    <AppForm/>
                </div>
            </div>

        </div>
        
    );
}
  