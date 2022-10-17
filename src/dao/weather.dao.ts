
import { Weather } from '../dto/dto';
import { Entity, Schema, Client } from 'redis-om'
import { WeatherError } from '../errors/weatherError';
import { errorCodes } from '../errors/errorStatusCode';
import weatherRepository from './repository/weather.repository';



class WeatherEntity extends Entity { };

class WeatherDao {

    schema = new Schema(WeatherEntity, {
        cityId: { type: 'number' },
        temperature: { type: 'number' },
        date: { type: 'date', sortable: true }
    });



    public async addWeather(weather: Weather) {
        return (await weatherRepository).createAndSave(weather);
    }
    public async getWeather(cityId: number) {

        const weatherData = (await weatherRepository).search()
            .where('cityId').eq(cityId)
            .returnMax('date');
        return weatherData;
    }
    public async getAllWeatherForCity(cityId: number) {

        const weatherData = (await weatherRepository).search()
            .where('cityId').eq(cityId)
            .return.all();
        return weatherData;
    }
    public async getAllWeather() {

        const weatherData = (await weatherRepository).search()
            .return.all();
        return weatherData;
    }
    public async getWeatherForAllCities() {
        try {
            return (await weatherRepository).search().return.all()
        } catch (err) {
            throw new WeatherError(`Error getting all weather data from REDIS`, errorCodes.REDIS_SEARCH_ERROR);
        }
    }




}

export default new WeatherDao();