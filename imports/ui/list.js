import Playgrounds from '../../both/playgrounds.js'
import { Template } from 'meteor/templating'

import './list.html'

Template.body.onCreated(function helloOnCreated() {
    this.counter = new ReactiveVar(0)

    Meteor.subscribe('playgrounds.all')
})

Template.body.helpers({
    counter() {
        return Template.instance().counter.get()
    },
    playgrounds() {
        return Playgrounds.find({})
    },
})

Template.body.events({
    'click button'(event, instance) {
        instance.counter.set(instance.counter.get() + 1)
    },
    'click .star'(event) {
        event.preventDefault()

        const target = event.target
        const name = target.name

        Meteor.call('playgrounds.star', title.value, (error) => {
            if (error) {
                alert(error.error)
            }
        })
    },
})
