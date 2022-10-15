import { Form, Input, InputNumber, Button, Collapse } from 'antd';
import { Select } from 'antd';

const {Panel} = Collapse

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
    return (
        <Form
            name="basic"
        >
            <Form.Item
                label="app名称"
                name="appName"
                rules={[
                    { required: true, message: '请输入你的app名称!' },
                    { type:"regexp", pattern:/^w+$/, message: 'app名称只能支持数字字母下划线!' }
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
            <Collapse>
                <Panel header="app偏好设置(非必填)">
                <Form.Item
                    label="域名转发到当前App"
                    name="hostList"
                    rules={[
                        { max:'1024', message: '描述最多支持1024个字符输入!' }
                    ]}
                >
                    <Input.TextArea  rows={3} placeholder="一行一个域名，多个域名请换行"/>
                </Form.Item>
                <Form.Item
                    label="可被允许调用系统模块(一般用于权限控制)"
                    name="allowModuleSet"
                    rules={[
                        { required: true, message: '可被允许调用系统模块！' },
                    ]}
                >
                    <Select
                    mode="multiple"
                    defaultValue={['*']}
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
                    <InputNumber min={1} max={16} defaultValue={2}/>
                </Form.Item>
                <Form.Item
                    label="请求超时时间(毫秒)"
                    name="timeout"
                    rules={[
                        { required: true, message: '请输入请求超时时间(毫秒)！' },
                        {type:'number',min:3000, message: '请输入正确的请求超时时间(毫秒)！'}
                    ]}
                >
                    <InputNumber min={3000}  defaultValue={3000}/>
                </Form.Item>
                <Form.Item
                    label="最大新生代空间(MB)"
                    name="maxYoungGenerationSizeMb"
                    rules={[
                        { required: true, message: '请输入最大新生代空间(MB)！' },
                        {type:'number',min:8, max:256, message: '请输入正确最大新生代空间(MB)！'}
                    ]}
                >
                    <InputNumber min={8} max={256}  defaultValue={32}/>
                </Form.Item>
                <Form.Item
                    label="最大老生代空间(MB)"
                    name="maxOldGenerationSizeMb"
                    rules={[
                        { required: true, message: '请输入最大老生代空间(MB)！' },
                        {type:'number',min:128, max:4096, message: '请输入正确最大老生代空间(MB)！'}
                    ]}
                >
                    <InputNumber min={128} max={4096}  defaultValue={1024}/>
                </Form.Item>

                <Form.Item
                    label="代码生成预分配(MB)"
                    name="codeRangeSizeMb"
                    rules={[
                        { required: true, message: '请输入代码生成预分配(MB)！' },
                        {type:'number',min:1, max:8, message: '请输入正确代码生成预分配(MB)！'}
                    ]}
                >
                    <InputNumber min={1} max={8}  defaultValue={2}/>
                </Form.Item>
                <Form.Item
                    label="堆栈大小(MB)"
                    name="stackSizeMb"
                    rules={[
                        { required: true, message: '请输入堆栈大小(MB)！' },
                        {type:'number',min:1, max:16, message: '请输入正确堆栈大小(MB)！'}
                    ]}
                >
                    <InputNumber min={1} max={16}  defaultValue={4}/>
                </Form.Item>
                </Panel>
            </Collapse>
            <Form.Item style={{marginTop: 32}}  wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
        </Form>
    )
}