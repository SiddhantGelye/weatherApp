const request = require('postman-request');

const forecast = (latitude, longitude , callback)=>{
    const url =`http://api.weatherstack.com/current?access_key=9d16274c381f43ae8e792901f55f3318&query=${latitude},${longitude}`;
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connet to weatherStack API',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            const data = body.current;
            callback(undefined, data)
        }
    })
}
module.exports = forecast;

