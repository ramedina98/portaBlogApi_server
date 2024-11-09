/**
 * @module Experience
 * In this file I have all the needed interfaces for Experience's module...
 */
import { Position, TypeExpe } from "./IResume";

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
interface IExperienceNoResumeId extends Omit<IExperience, 'id_resume'>{};

export { IExperience, IExperienceNoResumeId };