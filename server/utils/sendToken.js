
export const sendToken = (res, user, statusCode, message) => {

    const token = user.getJWTToken();

    const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        tasks: user.tasks,
        verified: user.verified,
    }

    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    }

    res.status(statusCode).
        cookie("authToken", token, options)
        .json({
            message,
            user: userData,
        })
}