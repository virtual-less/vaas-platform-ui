import { Form, Input, InputNumber, Button, Divider, message } from 'antd';
import { Select } from 'antd';
import {useContext, useEffect} from 'react';
import {AppContext} from '../../context/app';
import { postApi, putApi, getApi } from '../../api';


const allowModuleSet = new Set([
    '*','async_hooks','buffer','child_process',
    'cluster','crypto','dns',
    'events','fs','http','http2','https',
    'inspector','module','net','os','path',
    'querystring','readline','stream','string_decoder',
    'tls','tty','dgram','url','util','v8','vm',
    'wasi','worker_threads','zlib',
])

export default function AppForm(){
    const {appName, setAppName} = useContext(AppContext)
    const [form] = Form.useForm();
    const getFormDefaultValue = () =>{
        return {
            appName: '',
            description: '',
            allowModuleSet:['*'],
            maxWorkerNum:2,
            timeout:3000,
            maxYoungGenerationSizeMb:32,
            maxOldGenerationSizeMb:1024,
            codeRangeSizeMb:2,
            stackSizeMb:4
        }
    }
    const convertFormData2ServerData = (formData) => {
        return {
            appName: formData.appName,
            description: formData.description,
            maxWorkerNum:formData.maxWorkerNum,
            allowModuleSet:formData.allowModuleSet,
            timeout:formData.timeout,
            resourceLimits:{
                maxYoungGenerationSizeMb:formData.maxYoungGenerationSizeMb,
                maxOldGenerationSizeMb:formData.maxOldGenerationSizeMb,
                codeRangeSizeMb:formData.codeRangeSizeMb,
                stackSizeMb:formData.stackSizeMb
            },
        }
    }
    const convertServerData2FormData = (serverData) => {
        const formData = {
            appName: serverData.appName,
            description: serverData.description,
            allowModuleSet:serverData?.appConfig?.allowModuleSet,
            maxWorkerNum:serverData?.appConfig?.maxWorkerNum,
            timeout:serverData?.appConfig?.timeout,
            maxYoungGenerationSizeMb:serverData?.appConfig?.resourceLimits?.maxYoungGenerationSizeMb,
            maxOldGenerationSizeMb:serverData?.appConfig?.resourceLimits?.maxOldGenerationSizeMb,
            codeRangeSizeMb:serverData?.appConfig?.resourceLimits?.codeRangeSizeMb,
            stackSizeMb:serverData?.appConfig?.resourceLimits?.stackSizeMb,
        }
        return Object.assign(getFormDefaultValue(),formData)
    }
    useEffect(()=>{
        const getAppData = async () =>{
            if(appName) {
               const result = await getApi('/platform/getAppByName', {appName})
               form.setFieldsValue(convertServerData2FormData(result.data))
            } else {
                form.setFieldsValue(getFormDefaultValue())
            }
        }
        getAppData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[appName])

    const getSubmitText = () => {
        return (appName?`更新(${appName})`:'创建')
    }

    const onFinish = async (formData)=>{
        const postData = convertFormData2ServerData(formData)
        let result;
        if(appName) {
            result = await putApi('/platform/updateAppConfig', postData)
        } else {
            result = await postApi('/platform/createAppConfig', postData)
        }
        if(result.errmsg) {
            return message.error(result.errmsg)
        }
        setAppName(postData.appName)
        message.success(getSubmitText()+' 成功')
    }
    return (
        <Form
            name="basic"
            form={form}
            initialValues={getFormDefaultValue()}
            onFinish={onFinish}
        >
            <Form.Item
                label="app名称"
                name="appName"
                rules={[
                    { required: true, message: '请输入你的app名称!' },
                    { pattern:/^\w+$/, message: 'app名称只能支持数字字母下划线!' }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="描述"
                name="description"
                rules={[
                    { required: true, message: '请输入你的app名称!' },
                    { max:'127', message: '描述最多支持127个字符输入!' }
                ]}
            >
                <Input.TextArea  rows={5}/>
            </Form.Item>
            <Divider orientation="left">以下为app偏好设置(非必填)</Divider>
            <Form.Item
                label="可被允许调用系统模块(一般用于权限控制)"
                name="allowModuleSet"
                rules={[
                    { required: true, message: '填入值必须可被允许调用系统模块！默认全部为*' },
                ]}
            >
                <Select
                mode="multiple"
                >
                    {
                        [...allowModuleSet].map((module)=>{
                            return (<Select.Option key={module} >
                                {module}
                            </Select.Option>)
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item
                label="app最大线程数"
                name="maxWorkerNum"
                rules={[
                    { required: true, message: '请输入app最大线程数！' },
                    {type:'number',min:1,max:16, message: '请输入正确的app最大线程数！'}
                ]}
            >
                <InputNumber min={1} max={16}/>
            </Form.Item>
            <Form.Item
                label="请求超时时间(毫秒)"
                name="timeout"
                rules={[
                    { required: true, message: '请输入请求超时时间(毫秒)！' },
                    {type:'number',min:3000, message: '请输入正确的请求超时时间(毫秒)！'}
                ]}
            >
                <InputNumber min={3000}/>
            </Form.Item>
            <Form.Item
                label="最大新生代空间(MB)"
                name="maxYoungGenerationSizeMb"
                rules={[
                    { required: true, message: '请输入最大新生代空间(MB)！' },
                    {type:'number',min:8, max:256, message: '请输入正确最大新生代空间(MB)！'}
                ]}
            >
                <InputNumber min={8} max={256}/>
            </Form.Item>
            <Form.Item
                label="最大老生代空间(MB)"
                name="maxOldGenerationSizeMb"
                rules={[
                    { required: true, message: '请输入最大老生代空间(MB)！' },
                    {type:'number',min:128, max:4096, message: '请输入正确最大老生代空间(MB)！'}
                ]}
            >
                <InputNumber min={128} max={4096}/>
            </Form.Item>

            <Form.Item
                label="代码生成预分配(MB)"
                name="codeRangeSizeMb"
                rules={[
                    { required: true, message: '请输入代码生成预分配(MB)！' },
                    {type:'number',min:1, max:8, message: '请输入正确代码生成预分配(MB)！'}
                ]}
            >
                <InputNumber min={1} max={8}/>
            </Form.Item>
            <Form.Item
                label="堆栈大小(MB)"
                name="stackSizeMb"
                rules={[
                    { required: true, message: '请输入堆栈大小(MB)！' },
                    {type:'number',min:1, max:16, message: '请输入正确堆栈大小(MB)！'}
                ]}
            >
                <InputNumber min={1} max={16}/>
            </Form.Item>
            <Form.Item style={{marginTop: 32}}  wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                {getSubmitText()}
                </Button>
            </Form.Item>
        </Form>
    )
}