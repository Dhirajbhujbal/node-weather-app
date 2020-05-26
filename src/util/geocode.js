// const req = require('request');
const https = require('https');

const getGecode = (address, callbackFun) => {

    const geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=place&limit=1&access_token=pk.eyJ1IjoiZGhpcmFqLTE3OSIsImEiOiJja2FsZWFvYTgwOWNxMnhxdzI4eWN3a3o4In0.9YZfP_EIQX3zFYtHmwglig`;

    req({ url : geoCodeUrl, json: true}, (error, {body }) => {
        if(error) {
            callbackFun('unable to connect!', undefined);
        } else if(body.message) {
            callbackFun(body.message, undefined);
        } else {
            let geoCoddingData = body.features[0];
            const lagLng = geoCoddingData.center.reverse().toString();
            callbackFun(undefined, { lagLng, place_name: geoCoddingData.place_name});
        }
    })
}

const getGecodeData = (address , callbackFun) => {

    let data = '';

    const geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=place&limit=1&access_token=pk.eyJ1IjoiZGhpcmFqLTE3OSIsImEiOiJja2FsZWFvYTgwOWNxMnhxdzI4eWN3a3o4In0.9YZfP_EIQX3zFYtHmwglig`;

    https.request(geoCodeUrl, (response) => {

        response.on('data', (chunk) => {
            data = data + chunk;
        });

        response.on('end', () => {
            const res = JSON.parse(data);
            if(res.message) {
                callbackFun(res.message, undefined);
            } else {
                let geoCoddingData = res.features[0];
                if(!geoCoddingData) {
                    callbackFun(`data not found for the requested address ${address}`, undefined);
                } else {
                    const lagLng = geoCoddingData.center.reverse().toString();
                    callbackFun(undefined, { lagLng, place_name: geoCoddingData.place_name});
                }
            }

        })

    }).on('error', (error) => {
        callbackFun('unable to connect!', undefined);
    }).end();

}

module.exports = { getGecode: getGecode, getGecodeData: getGecodeData};