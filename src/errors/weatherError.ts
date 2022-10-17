import { errorCodes } from './errorStatusCode';


const weatherLogger = console;

export class WeatherError extends Error {
    statusCode = 200;
    constructor(message: string, status?: number) {
        super(message);
        Object.setPrototypeOf(this, WeatherError);
        if (typeof status !== "undefined") this.statusCode = status;

        switch (status) {
            case errorCodes.REDIS_CONNECTION_ERROR: {
                weatherLogger.error(`${new Date()} Error connecting to REDIS database:`, message);
                break;
            }
            case errorCodes.WEATHERBIT_COMMUNICATION_ERROR: {
                weatherLogger.error(`${new Date()} Error getting data from weatherbits:`, message);
                break;
            }
            case errorCodes.REDIS_SEARCH_ERROR: {
                weatherLogger.error(`${new Date()} Could not get data from REDIS:`, message);
                break;
            }
            case errorCodes.OTHER_ERROR: {
                weatherLogger.error(`${new Date()} Another application error:`, message);
                break;
            }
            default: {
                weatherLogger.error(`${new Date()} Unexpected error:`, message);
            }


        }

    }

    getErrorMessage(): string {
        return `Something went wrong ${this.message}`;
    }

}