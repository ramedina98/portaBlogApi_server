/**
 * In this file we have all the necessary interfaces to work with the models, controllers and
 * services of the endpoint resume...
 */
import { ITech } from "./ITechnologies";

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

interface IExperience {
    id_expe: number;
    title_expe: string;
    text_expe: string;
    position: Position;
    list_techs: string;
    type_expe: TypeExpe;
    start_date: Date;
    end_date: Date;
    id_resume: number;
}

// courses interface...
interface ICourse {
    id_course: number;
    course_title: string;
    text_course: string;
    provider: string;
    start_date: Date;
    end_date: Date;
    id_resume: number;
}

// schooling interface...
interface ISchooling {
    id_sch: number;
    career_name: string;
    university_nam: string;
    start_date: Date;
    end_date: Date;
    id_resume: number;
}

// resume interface
interface IResume {
    id_resume: number;
    user_id: string;
    pdf_resume: Buffer;
    profile_resume: string;
    logo_id: number;
    email: string;
}
// to recive information...
interface ICreateResume extends Omit<IResume, 'id_resume'>{}

// resume service interfece...
interface IResumeService {
    resume: IResume;
    technologies: ITech [];
    experience: IExperience [];
    courses: ICourse [];
    schooling: ISchooling [];
}


export{ IExperience, Position, TypeExpe, ICourse, ISchooling ,IResume, ICreateResume, IResumeService };