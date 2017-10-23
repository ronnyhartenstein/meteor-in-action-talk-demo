import { Meteor } from 'meteor/meteor'
import Playgrounds from '../both/playgrounds.js'

Meteor.publish('playgrounds.all', function () {
    return Playgrounds.find()
})
1