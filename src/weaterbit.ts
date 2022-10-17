import axios from 'axios'
import { weatherBitsEntryValidation } from '../validators/validator';
import RedisCache from '../db/redisCache';
import { errorCodes } from '../errors/errorStatusCode'
import { WeatherError } from '../errors/weatherError';
import { WeatherLogger } from '../logger/weatherLogger';
import { Weather } from '../model/weatherInterface';
import { enviroment } from '../util/enviroment';

const logger = new WeatherLogger();


const api_key = enviroment.WEATHERBIT_API_KEY;
const weather_endpoint = enviroment.WEATHER_URL;
const redisCache = new RedisCache();


const weatherBitFetch = (cityId = 4487042, units = 'I', language = 'en') => {
    const { error } = weatherBitsEntryValidation.validate({ cityId, units, language });
    if (error) {
        throw new WeatherError(error.message, errorCodes.VALIDATION_ERROR);
    }
    const requestUrl = `${weather_endpoint}?city_id=${cityId}&lang=${language}&key=${api_key}&units=${units}`;

    const options = {
        method: 'GET',
        url: requestUrl
    }

    axios.request(options).then(response => {
        if (response.status >= 200 && response.status < 300) {
            logger.debug(`saving weather for ${cityId}, temperature=${response.data.data[0].app_temp}`)
            const weather: Weather = {
                cityId: cityId,
                temperature: response.data.data[0].app_temp,
                time: new Date()
            }
            redisCache.storeWeather(weather);


        } else {
            throw new WeatherError(`Reciebed ${response.status} status when requesting data from weatherbits`, errorCodes.WEATHERBIT_COMMUNICATION_ERROR);
        }


    }, (err: Error) => {
        return new WeatherError(err.message, errorCodes.WEATHERBIT_COMMUNICATION_ERROR);
    });


}


export default weatherBitFetch;