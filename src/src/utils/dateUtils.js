export function  formateDate(time){
    if(!time)return''
    let date = new Date(time)
    return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
}