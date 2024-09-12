// This utils helps me to check if there is any empty result...
import logging from "../config/logging";

const checkEmptyResults = (results: any []): boolean => {
    const [technologies, experience, courses, schooling] = results;

    if (!technologies || technologies.length === 0) {
        logging.warning('No technologies were found.');
        return true;
    }

    if (!experience || experience.length === 0) {
        logging.warning('No experience was found.');
        return true;
    }

    if (!courses || courses.length === 0) {
        logging.warning('No courses were found.');
        return true;
    }

    if (!schooling || schooling.length === 0) {
        logging.warning('No schooling was found.');
        return true;
    }

    return false;
}

export { checkEmptyResults };