
import { ServerConfig } from '../dto/dto';
import { Entity, Schema, Client } from 'redis-om'
import { enviroment } from '../util/enviroment';
import serverConfigRepository from './repository/serverConfig.repository';


class ServerConfigEntity extends Entity { };




class ServerConfigDao {

    public async save(serverConfig: ServerConfig) {
        return (await serverConfigRepository).createAndSave(serverConfig);
    }

    public async getServerConfig(): Promise<any> {
        console.log('getting serverConfigFromRedis')
        return (await serverConfigRepository).search().return.first();
    }



}

export default new ServerConfigDao();