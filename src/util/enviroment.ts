import { resolve } from 'path';
import dotenv from 'dotenv';


dotenv.config({ path: resolve(__dirname, "../.env") });

export const enviroment = {
    PORT: process.env.PORT,
    WEATHER_URL: process.env.WEATHER_URL,
    WEATHERBIT_REQUEST_INTERVAL: process.env.WEATHERBIT_REQUEST_INTERVAL,
    WEATHERBIT_API_KEY: process.env.WEATHERBIT_API_KEY,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_HOST: process.env.REDIS_HOST,
    LOG_LEVEL: process.env.LOG_LEVEL,
    LOG_LEVEL_ORDER: { 'debug': 1, 'info': 2, 'warn': 3, 'error': 4 },
}


