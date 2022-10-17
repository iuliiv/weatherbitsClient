import { Client } from 'redis-om'
import { enviroment } from '../../util/enviroment'


const createClient = async (): Promise<Client> => {

    return await new Client().open(`redis://${enviroment.REDIS_HOST}:${enviroment.REDIS_PORT}`);
}

export default createClient();