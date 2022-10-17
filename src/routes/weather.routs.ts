import { Application, Request, Response } from "express";
import { Client } from "redis-om";
import WeatherController from "../controller/weather.controller";
import WeatherMiddleware from "../middleware/weather.middleware";
import { CommonRoutesConfig } from "./common.routes.config";

export class WeatherRoutes extends CommonRoutesConfig {
    configureRoutes(): Application {
        this.app
            .route(`/weather`)
            .get(WeatherController.listWeather);

        this.app
            .route(`/weather/:cityId`)
            .all(WeatherMiddleware.validateCityId)
            .get(WeatherController.latestWeather);


        return this.app;

    }
    constructor(app: Application) {
        super(app, 'WeatherRoutes')
    }

}