const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String,enum:["seller",'buyer'], default: 'buyer' },
    profileImage: String,
    bio: { type: String, maxlength: 200 },
    createdAt: { type: Date, default: Date.now },
    profileImage: {type:String},

});

// Pre-save middleware to hash the password and assign IPL team
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;


    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = model('User', userSchema);
module.exports = User;
