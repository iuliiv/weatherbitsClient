import { CRUD } from "../interfaces/crud.interface";
import weatherDao from "../dao/weather.dao"; import { Weather } from "../dto/dto";
'../dao/weather.dao';


class WeatherService implements CRUD {

    async list() {
        return weatherDao.getWeatherForAllCities();
    }

    async create(weathr: Weather): Promise<any> {
        return weatherDao.addWeather(weathr);
    }
    async find(cityId: number): Promise<any> {
        return weatherDao.getWeather(cityId)
    }

    async getAllWeatherForCity(cityId: number): Promise<any[]> {
        return weatherDao.getAllWeatherForCity(cityId)
    }
    async getAllWeather(): Promise<any[]> {
        return weatherDao.getAllWeather()
    }
};

export default new WeatherService();