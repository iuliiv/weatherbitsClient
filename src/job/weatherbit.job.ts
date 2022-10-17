import * as schedule from "node-schedule";
import weatherBitFetch from '../service/weatherbit'
import { City } from '../dto/dto'
import cityService from "../service/city.service";
import weatherService from "../service/weather.service";
import { enviroment } from '../util/enviroment'


const logger = console;

/**
 * make cityIds configurable
 */


const WEATHERBIT_REQUEST_INTERVAL: number = parseInt(enviroment.WEATHERBIT_REQUEST_INTERVAL as string);
logger.debug(`setting the job to run every ${WEATHERBIT_REQUEST_INTERVAL} minutes`);




export const startWeatherJob = async () => {
    await requestWeatherForAllCityes();

    const rule = new schedule.RecurrenceRule();
    rule.minute = new schedule.Range(0, 59, WEATHERBIT_REQUEST_INTERVAL);
    schedule.scheduleJob(rule, requestWeatherForAllCityes);


}

const requestWeatherForAllCityes = async () => {
    const cities: City[] = await cityService.list();
    cities.forEach(city => { weatherBitFetch(city.cityId); })
}


