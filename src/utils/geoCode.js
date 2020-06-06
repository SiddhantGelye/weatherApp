const request = require('postman-request');

const getCode =(address, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2lkZ2VseWUiLCJhIjoiY2thOW0zanpyMG9hdzJ0bWtzMjg4dXFwciJ9.SlOXejSi6WWndUsxz84YEw`
    request({url:url, json:true}, (error, {body})=>{// removing the body from response  using the destructring 
        if(error){
            callback('Unable to connect to weather api', undefined);
        }
        else if(body.message){
            callback('Unable to find location',undefined)
        }
        else{
            console.log(body);
            const data =body.features[0].center;
            const longitude = data[0];
            const latitude = data[1];
            const location = body.features[0].place_name; 
            const points  ={
                longitude:longitude,
                latitude:latitude,
                location:location
            }
            callback(undefined,points);
        }
    })
}

module.exports = getCode;