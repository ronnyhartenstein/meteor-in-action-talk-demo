import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Playgrounds from '../both/playgrounds.js'

Meteor.methods({
    'playgrounds.comment'(name) {
        check(name, String)

        return Playgrounds.insert({
            name,
            createdAt: new Date(),
        })
    }
})

Meteor.publish('playgrounds.all', function () {
    return Playgrounds.find()
})
1