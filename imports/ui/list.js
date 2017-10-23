import Playgrounds from '../../both/playgrounds.js'
import { Template } from 'meteor/templating'

import './list.html'
import './listitem.js'

Template.body.onCreated(function helloOnCreated() {
    this.counter = new ReactiveVar(0)
    this.search = new ReactiveVar('')

    Meteor.subscribe('playgrounds.all')
})

Template.body.helpers({
    counter() {
        return Template.instance().counter.get()
    },
    playgrounds() {
        const search = Template.instance().search.get()
        if (search !== '') {
            return Playgrounds.find({name: {$regex: new RegExp(search, 'i')}})
        } else {
            return Playgrounds.find()
        }
    },
    search() {
        return Template.instance().search.get()
    }
})

Template.body.events({
    'click button'(event, instance) {
        instance.counter.set(instance.counter.get() + 1)
    },
    'keyup input[name=search]'(event, instance) {
        console.log("woop")
        const input = $(event.target)
        instance.search.set(input.val())
    }
})



