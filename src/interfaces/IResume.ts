/**
 * @module Resume
 * In this file we have all the necessary interfaces to work with the models, controllers and
 * services of the endpoint resume...
 */
import { ITechNoResumeId } from "./ITechnologies";
import { ISchoolingNoIdResume } from "./ISchooling";
import { ICourseNoResumeId } from "./ICourses";
import { IExperienceNoResumeId } from "./IExperience";

// experience interface...
// elemtns of this iinterface...
enum Position {
    Front = 'front',
    Back = 'back',
    Full = 'full'
}

enum TypeExpe {
    Work = 'work',
    Project = 'project'
}

// resume interface
interface IResume {
    id_resume: number;
    user_id: string;
    pdf_resume: string;
    profile_resume: string;
    logo: string;
    email: string;
}
// to recive information...
interface ICreateResume extends Omit<IResume, 'id_resume' | 'user_id'>{}

// resume service interfece...
interface IResumeService {
    resume: IResume;
    technologies: ITechNoResumeId [];
    experience: IExperienceNoResumeId [];
    courses: ICourseNoResumeId [];
    schooling: ISchoolingNoIdResume [];
}


export{ Position, TypeExpe ,IResume, ICreateResume, IResumeService };