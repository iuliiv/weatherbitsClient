import { startWeatherJob } from "../job/weatherbit.job";
import { ServerConfig, City } from "../dto/dto";
import cityService from "../service/city.service";
import serverConfigService from "../service/serverConfig.service";

let serverSetup: ServerConfig = { dataInit: false };
const cities: City[] = [
    {
        name: "Timisoara",
        cityId: 665087
    },
    {
        name: "Iasi",
        cityId: 675810

    },
    {
        name: "Cluj Napoca",
        cityId: 681290

    }]

export const initializeData = async () => {

    (async function (next) {
        const cashedServerSetup = await serverConfigService.list();
        if (cashedServerSetup) {
            startWeatherJob();
            return;
        }
        next();
    }(async function () {
        if (!serverSetup || !serverSetup.dataInit) {
            console.log('initializing data');

            await cityService.saveList(cities).finally(async () => {
                serverSetup.dataInit = true;
                await serverConfigService.create(serverSetup).finally(async () => {
                    startWeatherJob();
                });
            })
        }
    }))
}

