// technologies interface...
interface ITech {
    id_tech: number;
    name_tech: string;
    icon_tech: string;
    id_resume: number;
}
// technologies interface without id_resume...
interface ITechNoResumeId extends Omit<ITech, 'id_resume'>{};

export { ITech, ITechNoResumeId };