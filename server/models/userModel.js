import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "password must be 8 character"],
        select: false,
    },
    avatar: {
        public_id: String,
        url: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },


    tasks: [
        {
            title: String,
            description: String,
            completed: Boolean,
            createdAt: Date,
        }
    ],

    verified: {
        type: Boolean,
        default: false,
    },

    otp: Number,

    otp_expiry: Date,

    forgotPasswordOtp: Number,
    forgotPasswordOtp_expiry: Date

});

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
})

userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error
    }

}


userSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
};

userSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 })

const User = mongoose.model("User", userSchema);

export default User;