// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'
import Playgrounds from '../both/playgrounds.js'


Meteor.startup(() => {
    // if the Links collection is empty
    if (Playgrounds.find().count() === 0) {
        // Spielplätze vom GIS Chemnitz
        //http://portal-chemnitz.opendata.arcgis.com/datasets/spielplaetze
        const url = 'https://opendata.arcgis.com/datasets/89148f4133c4419b921a62d987a4d6a1_0.geojson'
        HTTP.call('GET', url, (error, result) => {
            // console.log("error", error, "result", result)
            if (!error) {
                result.data.features.forEach(item => {
                    let name = item.properties.Name
                    let coordinates = item.geometry.coordinates
                    console.log("fixture", name, coordinates)
                    Playgrounds.insert({name, coordinates, comments: [], stars: 0})
                })
            }
        })
    }
})
