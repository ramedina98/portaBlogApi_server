/**
 * In this file I have all the needed interfaces for courses' module...
 */
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
interface ICourseNoResumeId extends Omit<ICourse, 'id_resume'>{};

export { ICourse, ICourseNoResumeId };