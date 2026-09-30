const DB_NAME='demand-radar-browser-v1';
let opened;
export function database(){
  return opened ||= new Promise((resolve,reject)=>{
    const request=indexedDB.open(DB_NAME,1);
    request.onupgradeneeded=()=>{request.result.createObjectStore('scans',{keyPath:'id'});request.result.createObjectStore('settings');};
    request.onsuccess=()=>resolve(request.result);
    request.onerror=()=>{opened=null;reject(new Error('无法打开浏览器存储，请检查隐私模式或网站存储权限。'));};
    request.onblocked=()=>reject(new Error('请关闭其他雷达标签页后再试。'));
  });
}
async function transaction(store,mode,action){
  const db=await database();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction(store,mode);let result;
    const request=action(tx.objectStore(store));
    if(request)request.onsuccess=()=>{result=request.result;};
    tx.oncomplete=()=>resolve(result);
    tx.onerror=tx.onabort=()=>reject(new Error('浏览器保存失败：可能空间不足或存储权限被禁用。请先导出已有报告。'));
  });
}
export const allScans=()=>transaction('scans','readonly',s=>s.getAll());
export const readScan=id=>transaction('scans','readonly',s=>s.get(id));
export const saveScan=scan=>transaction('scans','readwrite',s=>s.put(structuredClone(scan)));
export const deleteScan=id=>transaction('scans','readwrite',s=>s.delete(id));
export const clearScans=()=>transaction('scans','readwrite',s=>s.clear());
export const readSettings=()=>transaction('settings','readonly',s=>s.get('api'));
export const saveSettings=value=>transaction('settings','readwrite',s=>s.put(value,'api'));
export const clearSettings=()=>transaction('settings','readwrite',s=>s.delete('api'));
