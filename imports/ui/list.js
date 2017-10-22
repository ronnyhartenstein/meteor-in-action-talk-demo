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
})

Template.listitem.events({
    'click .map'(event) {
        const [h, v] = this.coordinates
        const name = encodeURI(this.name)
        // const url = `https://www.google.de/maps/place/${name}/@${v},${h},17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d${v}!4${h}`
        const url = `http://maps.google.com/maps?t=h&q=loc:${v},${h}&z=20 `
        window.open(url)
    },
    'click .star'() {
        Playgrounds.update(this._id, {$set: { stars: this.stars + 1 }})
    }
    // 'click .commentSubmit'(event) {
    //
    //     Meteor.call('playgrounds.comment', this, (error) => {
    //         if (error) {
    //             alert(error.error)
    //         }
    //     })
    // },
})
