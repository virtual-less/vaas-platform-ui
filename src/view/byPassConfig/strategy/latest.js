export default function Latest(props) {
    return (
        <div style={{padding:'5px'}}>
            <h1>当前最新版本: {props.strategyData?.latest?.version || '未发布无法获取最新版本'}</h1>
        </div>
    )
}