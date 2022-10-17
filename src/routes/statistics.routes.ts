import { Application } from "express";
import StatisticsController from "../controller/statistics.controller";
import StatisticsMiddleware from "../middleware/statistics.middleware ";
import { CommonRoutesConfig } from "./common.routes.config";

export class StatisticsRoutes extends CommonRoutesConfig {
    configureRoutes(): Application {
        this.app
            .route(`/stats`)
            .get(StatisticsController.listStatistics);

        this.app
            .route(`/stats/:cityId`)
            .all(StatisticsMiddleware.validateCityId)
            .get(StatisticsController.getStatistics);


        return this.app;

    }
    constructor(app: Application) {
        super(app, 'StatisticsRoutes')
    }

}