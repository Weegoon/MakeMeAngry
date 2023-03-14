
var gpID = getGPID();

function getGPID(){
    return location.search.substring(1).split("&").find((a) => {return a.startsWith('gpid')}).split("=")[1]
}