import { Request, Response } from 'express';
import cityService from '../service/city.service';

class CityController {
    async listCity(req: Request, res: Response) {
        const allcities = await cityService.list();
        res.status(200).send(allcities);
    }
    async createCity(req: Request, res: Response) {
        const city = await cityService.create(req.body);
        res.status(200).send(city);
    }
    async getStatistics(req: Request, res: Response) {
        const city = await cityService.find(req.body.cityId);
        res.status(200).send(city);
    }
}

export default new CityController();