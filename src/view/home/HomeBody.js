import SelectApp from '../../components/SelectApp/index'
import AppForm from '../../components/AppForm/index'
import { Modal } from 'antd';
import { useState } from 'react';

export default function HomeBody() {
    const [selectAppModelOpen, setSelectAppModelOpen] = useState(true)

    const selectAppModelHandleOk = () => {
        setSelectAppModelOpen(false);
      };
    const selectAppModelHandleCancel = () => {
        setSelectAppModelOpen(false);
    };
    
    return (
        <div>
            <Modal title="请选择App" 
            open={selectAppModelOpen}
            onOk={selectAppModelHandleOk}
            okText="完成"
            onCancel={selectAppModelHandleCancel}
            cancelText="取消"
            >
                    <SelectApp />
            </Modal>
            <div className='flex-center' style={{padding:'32px'}}>
                <div  style={{width:'600px'}}>
                    <AppForm/>
                </div>
            </div>
            
        </div>
    )
}