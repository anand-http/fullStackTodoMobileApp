import app from './app.js';
import connectDb from './config/database.js';
import cloudinary from 'cloudinary';


const port = process.env.PORT || 5151


connectDb();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

app.listen(port, () => {
    console.log("Server is running on port",port);
})