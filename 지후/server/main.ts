import * as mongoose from 'mongoose';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { router as userRoute } from './routes/userRoute';
import { router as movieRoute } from './routes/movieRoutes';
import { Server } from 'socket.io';
import { addLikeMovie, addLikeMovieList } from './controller/movieController';
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
        origin: "*",
        credentials: true,
    }
});

io.on('connection', (socket) => {
    console.log(socket.id, 'socket connected');

    socket.on('likeMovie', async (data) => {
        console.log(data);
        const { status, message } = await addLikeMovieList(
            data.user_id,
            data.movie,
        )

        if (status) {
            if (message === 'Movie removed successfully') {
                socket.emit(`movie_${data.movie.id}`, {
                    message: 'remove like movie',
                })
            } else {
                socket.emit(`movie_${data.movie.id}`, {
                    message: 'add like movie',
                })
            }
        }

        console.log(status)
    });

    socket.on('disconnect', () => {
        console.log(socket.id, 'socket disconnected');
    });
});

const runMongoDB = async () => {
    await mongoose.connect(process.env.MONGO_URL as string);

    console.log('MongoDB connected');
}