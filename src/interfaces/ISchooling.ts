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

export { ISchooling, ISchoolingNoIdResume };