const request = require("request");
const forecast = (lat,long , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e6fb082cd043622bd4c35a8bb7b67a58&query=' + lat+','+long +'&units=f';
    request({ url, json: true }, (err, res) => {
        if (err) {
            console.log("Unable to connect to weather service!");
        } else if (res.body.error) {
            console.log("Unable to find location!");
        } else {
           callback(undefined,res.body.current.temperature,res.body.current.precip);

        }
    });
}

exports.module = forecast;