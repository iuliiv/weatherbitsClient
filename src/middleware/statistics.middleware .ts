import express, { Request, Response, NextFunction } from "express";
import { errorCodes } from "../errors/errorStatusCode";
import { cityValidator, statisticsValidator } from "../validators/validator";


class StatisticsMidlleware {
    async validateRequiredStatisticsBodyFields(req: Request, res: Response, next: NextFunction) {
        const { error } = statisticsValidator.validate(req.params);
        if (!error) {
            next();
        } else {
            res.status(errorCodes.VALIDATION_ERROR).send({ error: "invalid statistics" });
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

export default new StatisticsMidlleware();