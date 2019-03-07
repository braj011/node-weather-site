const request = require('request')

const forecast = (lat, lon, callback) => {
  const url = `https://api.darksky.net/forecast/0704ff94499f7fe08a94e354152f59ec/${lat},${lon}?units=si`
  // response destructured to { body }
  request({ url , json: true}, (error, {body}, temperature) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined, undefined)
    } else if (body.error){
      callback('Unable to find location. Try another search.', undefined, undefined)
  } else {
      callback(undefined, `${body.daily.data[0].summary}, It is currently ${body.currently.temperature} degrees. There is a ${body.currently.precipProbability}% chance of rain.`, body.currently.temperature )
  }
  })
} 

module.exports = forecast



// request({url: url, json: true}, (error, response) => {
//   console.log(error)
//   if (error) {
//     console.log("Unable to connect to weather service.")
//   }
//   else if (response.body.error) {
//     console.log("Unable to find location")
//   }
//   else { 
//     console.log(`${response.body.daily.data[0].summary}, It is currently ${response.body.currently.temperature} degrees. There is a ${response.body.currently.precipProbability}% chance of rain.`)
//   }
// })\