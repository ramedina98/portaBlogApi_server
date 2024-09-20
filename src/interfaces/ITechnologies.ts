/**
 * @TechnologiesInterfaces
 * This file has all the interfeces needed to handle the technologies module...
 */

// technologies interface...
interface ITech {
    id_tech: number;
    name_tech: string;
    icon_tech: string;
    delete_tech: boolean;
    id_resume: number;
}

interface ITechNoId extends Omit<ITech, 'id_tech'>{};
// technologies interface without id_resume...
interface ITechNoResumeId extends Omit<ITech, 'id_resume'>{};
// technologies interface without id_tech...
interface ITechNoIdNoresumeId extends Omit<ITechNoResumeId, 'id_tech'>{};

export { ITech, ITechNoResumeId, ITechNoIdNoresumeId, ITechNoId };