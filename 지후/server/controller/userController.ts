import { User as IUser } from "../@types/SchemaTypes"
import { Request, Response, } from "express";
import { User } from "../model/userModel";
import bcrypt from 'bcrypt';
import { IResponse } from "../@types/ResponseTypes";
import { NextFunction } from "express";
import { Movie } from "../model/movieModel";

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, nickname, password }: IUser = req.body;

        const userCheck = await User.findOne({ id });
        const nicknameCheck = await User.findOne({ nickname });

        if (userCheck) {
            return res.status(400).json({
                message: 'User already exists',
                status: 400,
            })
        }

        if (nicknameCheck) {
            return res.status(400).json({
                message: 'Nickname already exists',
                status: 400,
            })
        }

        // 비밀번호 암호화 작업
        const hashPassword = await bcrypt.hash(password as string, 10);

        const user = await User.create({
            id,
            nickname,
            password: hashPassword,
        });

        await Movie.create({
            user_id: user._id,
            movie_list: [],
        })

        delete user?.password;

        return res.status(200).json({
            data: user,
            message: 'User created successfully',
            status: 200,
        });
    } catch (error) {
        console.error(error, '에러');
        next();
    } finally {
        console.log('회원가입 완료');
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, password }: IUser = req.body;

        const user = await User.findOne({ id });

        if (!user) {
            return res.status(400).json({
                message: 'User not found',
                status: 400,
            })
        }

        const isPasswordValid = await bcrypt.compare(password as string, user?.password as string);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'User not found',
                status: 400,
            })
        }

        delete user?.password;

        return res.status(200).json({
            data: user,
            status: 200,
        })
    } catch (error) {
        console.log(error);
        next();
    } finally {
        console.log('로그인 완료');
    }
}

export { register, login };