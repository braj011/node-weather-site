const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYnJhajAxMSIsImEiOiJjanN1cXJmdGsxM3o2M3lxenhqMG8xYmZ2In0.WPg5CJlA2GqjYNbtzRopBw&limit=1`
    // response destructured to { body }
    request({ url: url, json: true }, (error, { body }) => {
          if (error) {
              callback('Unable to connect to location services!', undefined)
          } else if (body.features.length === 0) {
              callback('Unable to find location. Try another search.', undefined)
          } else {
              callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
              })
          }
      })
  } 

  module.exports = geocode 