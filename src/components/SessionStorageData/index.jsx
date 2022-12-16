import React,{useEffect, useState} from 'react'
import './index.scss'
export default function SessionStorageData({data, download,defaultData}){
    const [defaultHistory, setDefaultHistory] = useState(defaultData)
    const [history, setHistory] = useState([])
    useEffect(async ()=>{
        if (!data){
            let arr = []
            for (let i = 0; i<4;i++){
                arr.push(
                    <tr key={i}>
                        <td align="left">&nbsp;</td>
                        <td align="center">&nbsp;</td>
                        <td align="center">&nbsp;</td>
                        <td align="right">&nbsp;</td>
                    </tr>
                )
            }
            setDefaultHistory(arr)
            return;
        };
        if (data){
            let _defaultHistory = [...defaultHistory];
            _defaultHistory.splice(0, 1);
            await setDefaultHistory(_defaultHistory)
        }
        const _history = [data,...history];
        await setHistory(_history)
    }, [data]);
    const handleDownHistory = (item)=>{
        download(item.data,item.name)
    }
    const Time = (time)=>{
        return `${new Date(time).toLocaleTimeString()} ${new Date(time).toLocaleDateString()}`
    }
    return (
            <div className="sessionStorage">
                <table>
                    <caption>
                        <h3>本地记录</h3>
                    </caption>
                    <colgroup>
                        <col className="column1" />
                        <col className="columns2plus3" span="2" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th align="left">创建时间</th>
                            <th align="center">文件名</th>
                            <th align="center">创建数量</th>
                            <th align="right"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((row) => (
                            <tr key={row.name}>
                                <td align="left">{Time(row.createTime)}</td>
                                <td align="center">{row.name}</td>
                                <td align="center">{row.data.length}</td>
                                <td align="right">
                                    <button onClick={()=>{handleDownHistory(row)}}>
                                        下载
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {defaultHistory}
                    </tbody>
                </table>
            </div>
    )
}
