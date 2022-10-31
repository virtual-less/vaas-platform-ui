import {message } from 'antd'

function catchData(jsonData) {
    if(jsonData.errmsg) {
        message.error(jsonData.errmsg)
        throw new Error((jsonData.errmsg))
    }
    return jsonData
}

export async function getApi(url,params = {}) {
    const paramsString = Object.entries(params).map(e=>`${e[0]}=${e[1]}`).join('&')
    if(paramsString) {
        url+=`?${paramsString}`
    }
    const resp = await fetch(url);
    return catchData(await resp.json())
}

export async function deleteApi(url) {
    const resp = await fetch(url,{
        method:'delete',
        headers:{
            'Content-Type':'application/json; charset=utf-8'
        }
    });
    return catchData(await resp.json())
}

export async function postApi(url,postData={}) {
    const resp = await fetch(url,{
        method:'post',
        body:JSON.stringify(postData),
        headers:{
            'Content-Type':'application/json; charset=utf-8'
        }
    });
    return catchData(await resp.json())
}

export async function putApi(url,postData={}) {
    const resp = await fetch(url,{
        method:'put',
        body:JSON.stringify(postData),
        headers:{
            'Content-Type':'application/json; charset=utf-8'
        }
    });
    return catchData(await resp.json())
}