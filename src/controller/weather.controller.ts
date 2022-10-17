import { Request, Response } from 'express';
import weatherService from '../service/weather.service';

class WeatherController {
    async listWeather(req: Request, res: Response) {
        const allWeather = await weatherService.list();
        res.status(200).send(allWeather);
    }
    async createWeather(req: Request, res: Response) {
        const weather = await weatherService.create(req.body);
        res.status(200).send(weather);
    }
    async latestWeather(req: Request, res: Response) {

        const weather = await weatherService.find(Number.parseInt(req.params.cityId));
        res.status(200).send(weather);
    }
}

export default new WeatherController();