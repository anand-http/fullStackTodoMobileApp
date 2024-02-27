import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import taskRoute from './routes/taskRoute.js';
import cors from "cors";
import fileUpload from 'express-fileupload';

const app = express();


dotenv.config({
    path: "./config/.env"
})


const corsOptions = {
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

//middleware
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
}))


//routes
app.get('/server-check', (req, res) => {
    res.json({
        success: true,
        message: "Server is running fine"
    })
})

app.use('/api/users', userRoute);
app.use('/api/tasks', taskRoute);



export default app;