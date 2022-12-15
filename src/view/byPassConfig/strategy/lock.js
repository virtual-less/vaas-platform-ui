import { Select } from 'antd';
export default function Lock(props) {

    const changeLockVersion = (version) => {
        props.changeLockVersion({version})
    };
    return (
        <div style={{padding:'5px'}}>
            当前锁定版本：
            <Select
            value={props.strategyData?.lock?.version}
            style={{ width: 120 }}
            onChange={changeLockVersion}
            options={props.versionOptions}
            />
        </div>
    )
}