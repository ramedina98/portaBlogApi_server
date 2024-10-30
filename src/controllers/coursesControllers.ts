/**
 * @module Courses
 */
import { Request, Response } from "express";
import { ICourseNoResumeId } from "../interfaces/ICourses";
import {
    getCourses
} from "../services/coursesServices";

/**
 * @method get
 * This controller helps me to manage the get Courses Service and get data from the
 * table, data related to a specific user...
 */
const getCoursesResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_user }: { id_user: string } = req.body;

        const courses: ICourseNoResumeId[] | number = await getCourses(id_user);

        if(typeof courses === 'number'){
            let message: string = '';

            if(courses === 1){
                message = 'User does not exist';
            } else if(courses === 2){
                message = 'User does not have a resume attached jet';
            } else if(courses === 3){
                message = 'Technologies not found';
            }

            res.status(400).json({ message });
        }

        res.status(200).json({ message: 'Successfully', courses });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' + error.message });
    }
}

export { getCoursesResponse };