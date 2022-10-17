import axios from 'axios'
import { weatherBitsEntryValidation } from '../validators/validator';
import { enviroment } from '../util/enviroment';
import { WeatherError } from '../errors/weatherError'
import { errorCodes } from '../errors/errorStatusCode';
import weatherService from './weather.service';
import { Weather } from '../dto/dto';
//const logger = new WeatherLogger();


const api_key = enviroment.WEATHERBIT_API_KEY;
const weather_endpoint = enviroment.WEATHER_URL;



const weatherBitFetch = (cityId = 665087, units = 'M', language = 'en') => {
    const { error } = weatherBitsEntryValidation.validate({ cityId, units, language });
    if (error) {
        throw new WeatherError(error.message, errorCodes.VALIDATION_ERROR);
    }
    const requestUrl = `${weather_endpoint}?city_id=${cityId}&lang=${language}&key=${api_key}&units=${units}`;
    console.log(requestUrl)

    const options = {
        method: 'GET',
        url: requestUrl
    }

    axios.request(options).then(response => {
        if (response.status >= 200 && response.status < 300) {
            console.debug(`saving weather for ${cityId}, temperature=${response.data.data[0].app_temp}`)
            const weather: Weather = {
                cityId: cityId,
                temperature: response.data.data[0].app_temp,
                date: new Date()
            }
            weatherService.create(weather);


        } else {
            throw new WeatherError(`Recievd ${response.status} status when requesting data from weatherbits`, errorCodes.WEATHERBIT_COMMUNICATION_ERROR);
        }


    }, (err: Error) => {
        return new WeatherError(err.message, errorCodes.WEATHERBIT_COMMUNICATION_ERROR);
    });


}


export default weatherBitFetch;