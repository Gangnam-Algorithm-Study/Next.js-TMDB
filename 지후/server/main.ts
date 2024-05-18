import * as mongoose from 'mongoose';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { router as userRoute } from './routes/userRoute';
import { router as movieRoute } from './routes/movieRoutes';
import { Server } from 'socket.io';

dotenv.config();

const PORT = process.env.PORT;
const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRoute);
app.use('/movie', movieRoute);

const server = app.listen(PORT, () => {
    runMongoDB();
    console.log(`Run ${PORT}`);
})


const io = new Server(server, {
    cors: {
        origin: '*',
        credentials: true,
    }
});

io.on('connection', (socket) => {
    console.log(socket.id, 'socket connected');
    io.on('likeMovie', (data) => {
        console.log(data, 'like_movie');
    })

    io.emit('hello', 'hello');
})


io.on('hello', (data) => {
    console.log(data, 'hello');
});

io.on('disconnect', (socket) => {
    console.log(socket.id, 'socket disconnected');
})




const runMongoDB = async () => {
    await mongoose.connect(process.env.MONGO_URL as string);

    console.log('MongoDB connected');
}