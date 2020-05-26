// const req = require('request');
const http = require('http');

const getForCast = (latLng, callbackFun) => {
 
    const weatherStackUrl = `http://api.weatherstack.com/current?access_key=bd34dc2e633f217cbd733160152c875c&query=${latLng}&units=m`;
 
    req({ url : weatherStackUrl, json: true}, (err, {body: { success , error, current}}) => {
        if(err) {
            callbackFun('unable to connect!', undefined);
        } else if(success === false) {
            callbackFun(error.info, undefined);
        } else {
            callbackFun(undefined, `${current.weather_descriptions[0]}, It is currently ${current.temperature} degrees out. It feelis like ${current.feelslike} degrees out`)
        }
    })
}

const getForCastData = (latLng, callbackFun) => {
    let data = '';

    http.request(`http://api.weatherstack.com/current?access_key=bd34dc2e633f217cbd733160152c875c&query=${latLng}&units=m`, (response) => {

        response.on('data', (chunk) => {
            data = data + chunk;
        })
                
        response.on('end', () => {
            const res = JSON.parse(data)
            if(res && res.success === false) {
                callbackFun(res.error.info, undefined)
            } else if(res.current)  {
                callbackFun(undefined, {
                    foreCastWeatherSummary : `${res.current.weather_descriptions[0]}, It is currently ${res.current.temperature} degrees out. It feelis like ${res.current.feelslike} degrees out`, 
                    weatherStatusIcon: res.current.weather_icons[0]
                })
            }
        })
        
    }).on('error', (err) => {
        console.log('err Ala', err)
    }).end()
}


module.exports = { getForCast: getForCast , getForCastData: getForCastData};