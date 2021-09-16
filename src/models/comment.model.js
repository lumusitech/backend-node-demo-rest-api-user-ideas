const mongoose = require('mongoose')
const { Schema, model } = mongoose

const commentSchema = new Schema({
    comment: { type: String, required: true },
    autor: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
        autopopulate: true
    }
})

commentSchema.plugin(require('mongoose-autopopulate'))

module.exports = model('comment', commentSchema)