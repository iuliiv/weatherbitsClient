import { Request, Response } from 'express';
import statisticsService from '../service/statistics.service';
import weatherService from '../service/weather.service';
import { Get, Route, Path } from "tsoa";


/**
 * 
 * @param cityId The id of the city. For testing use any of these: 4487042, 4494942, 4504871 
 * 
 */
class StatisticsController {

    async listStatistics(req: Request, res: Response) {
        let statistics = await statisticsService.find(0);
        if (!statistics || !statistics.temperature || !statistics.date || ((new Date().getTime() - statistics.date.getTime()) > 5 * 60 * 1000)) {
            try {
                const allWeather = await weatherService.getAllWeather();
                let average = 0;
                average = allWeather.reduce((total: number, next: any) => total + next.temperature, 0) / allWeather.length;
                statistics = {
                    cityId: 0,
                    temperature: average,
                    date: new Date()
                };
                statisticsService.create(statistics)
            } catch (err) {
                console.log(err);
            }
        }

        res.status(200).send(statistics);
    }
    async createStatistics(req: Request, res: Response) {
        const statistics = await statisticsService.create(req.body);
        res.status(200).send(statistics);
    }

    async getStatistics(req: Request, res: Response) {
        const cityId = Number.parseInt(req.params.cityId);
        let statistics = await statisticsService.find(cityId);
        if (!statistics || !statistics.temperature || !statistics.date || ((new Date().getTime() - statistics.date.getTime()) > 5 * 60 * 1000)) {
            try {
                const allWeather = await weatherService.getAllWeatherForCity(cityId);
                let average = 0;
                average = allWeather.reduce((total: number, next: any) => total + next.temperature, 0) / allWeather.length;
                statistics = {
                    cityId: cityId,
                    temperature: average,
                    date: new Date()
                };
                statisticsService.create(statistics)
            } catch (err) {
                console.log(err);
            }
        }
        res.status(200).send(statistics);
    }

}

export default new StatisticsController();