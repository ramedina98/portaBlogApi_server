/**
 * In this file I have all the needed interfaces for schooling's module...
 */
// schooling interface...
interface ISchooling {
    id_sch: number;
    career_name: string;
    university_nam: string;
    start_date: Date;
    end_date: Date;
    delete_schooling: boolean;
    id_resume: number;
}
interface ISchoolingNoIdResume extends Omit<ISchooling, 'id_resume'>{};
interface ISchoolingNoIdNoResumeId extends Omit<ISchoolingNoIdResume, 'id_sch'>{};
interface ISchoolingNoId extends Omit<ISchooling, 'id_sch'>{};

export { ISchooling, ISchoolingNoIdResume, ISchoolingNoIdNoResumeId, ISchoolingNoId };