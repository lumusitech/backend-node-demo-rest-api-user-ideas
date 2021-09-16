const mongoose = require('mongoose')
const { Schema, model } = mongoose
const { compareSync, hashSync, genSaltSync } = require('bcryptjs')

const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

userSchema.methods.toJSON = function () {
    let user = this.toObject()
    delete user.password
    return user
}

userSchema.methods.comparePasswords = function (password) {
    return compareSync(password, this.password)
}

userSchema.pre('save', async function (next) {
    const user = this
    if (!user.isModified('password')) next()

    const salt = genSaltSync(10)
    const hashedPassword = hashSync(user.password, salt)
    user.password = hashedPassword
    next()
})

userSchema.plugin(require('mongoose-autopopulate'))

module.exports = model('user', userSchema)