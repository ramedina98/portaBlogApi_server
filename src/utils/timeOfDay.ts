/**
 * This function in utils hepls me to determine the time of the day,
 * the only parameter that it receive is the time zone o f the client, to be precise...
 */
import moment from "moment-timezone";

const determineTimeTimeOfDay = (timeZone: string): string => {
    const currentHour: number = moment.tz(timeZone).hour(); // returns the client's current Hour...

    // determine if is morning, afternoon or evening

    if(currentHour >= 6 && currentHour <12){
        return 'morning';
    } else if(currentHour >= 12 && currentHour < 18){
        return 'afternoom';
    } else{
        return 'evening';
    }
}

export { determineTimeTimeOfDay };