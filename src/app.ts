import express, { Application } from 'express';
import { CommonRoutesConfig } from './routes/common.routes.config';
import { WeatherRoutes } from './routes/weather.routs';
import { StatisticsRoutes } from './routes/statistics.routes';
import swaggerUi from "swagger-ui-express";

import { initializeData } from './util/initialData';
import { enviroment } from './util/enviroment';

const app: Application = express();

const routes: CommonRoutesConfig[] = [];


routes.push(new WeatherRoutes(app));
routes.push(new StatisticsRoutes(app));

app.use(express.json());
app.use(express.static("public"));

app.use(
    "/swagger",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    })
);






app.listen(enviroment.PORT, () => {
    //initializeData();

    console.log("===========================================================================================");
    console.log(`========================= Server is running on port ${enviroment.PORT} ==================================`);
    console.log("===========================================================================================");
})


export default app;