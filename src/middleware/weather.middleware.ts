import express, { Request, Response, NextFunction } from "express";
import { errorCodes } from "../errors/errorStatusCode";
import { cityValidator, weatherValidator } from "../validators/validator";


class WeatherMidlleware {
    async validateRequiredWeatherBodyFields(req: Request, res: Response, next: NextFunction) {
        const { error } = weatherValidator.validate(req.params);
        if (!error) {
            next();
        } else {
            res.status(errorCodes.VALIDATION_ERROR).send({ error: "invalid weather" });
        }
    }

    async validateCityId(req: Request, res: Response, next: NextFunction) {

        const { error } = cityValidator.validate(req.params);
        if (!error) {
            next();
        } else {
            res.status(errorCodes.VALIDATION_ERROR).send({ error: "invalid cityId" });
        }
    }

}

export default new WeatherMidlleware();