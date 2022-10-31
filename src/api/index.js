export async function getApi(url,params = {}) {
    const paramsString = Object.entries(params).map(e=>`${e[0]}=${e[1]}`).join('&')
    if(paramsString) {
        url+=`?${paramsString}`
    }
    const resp = await fetch(url);
    return await resp.json()
}

export async function postApi(url,postData={}) {
    const resp = await fetch(url,{
        method:'post',
        body:JSON.stringify(postData),
        headers:{
            'Content-Type':'application/json; charset=utf-8'
        }
    });
    return await resp.json()
}

export async function putApi(url,postData={}) {
    const resp = await fetch(url,{
        method:'put',
        body:JSON.stringify(postData),
        headers:{
            'Content-Type':'application/json; charset=utf-8'
        }
    });
    return await resp.json()
}