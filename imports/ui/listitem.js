import Playgrounds from '../../both/playgrounds.js'
import { Template } from 'meteor/templating'

import './listitem.html'
import './listitem.css'

// Template.listitem.onCreated(() => {
// })

Template.listitem.helpers({
    commentsCount() {
        return this.comments.length
    },
    formatCreatedAt() {
        return this.createdAt ? moment(this.createdAt).calendar() : ''
    },
    loggedIn() {
        return !!Meteor.userId()
    },
    userEmail() {
        return Meteor.user() ? Meteor.user().emails[0].address : '?'
    }
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
    },
    'click .commentsSwitch, click .list-group-item-heading'(event) {
        $(event.target).closest('.list-group-item').find('.comments').toggleClass('hidden')
    },

    'submit .newComment'(event) {
        event.preventDefault()

        const target = event.target
        const autor = target.autor.value
        const text = target.text.value

        if (!autor || !text) return

        Playgrounds.update(this._id, {
            $set: { comments: [...this.comments, {autor, text, createdAt: new Date()}]}
        })

        target.autor = ""
        target.text = ""
    },
})