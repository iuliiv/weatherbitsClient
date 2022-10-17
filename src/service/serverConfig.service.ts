import { CRUD } from "../interfaces/crud.interface";
import { ServerConfig } from "../dto/dto";
import serverConfigDao from "../dao/serverConfig.dao";


class ServerConfigService implements CRUD {
    async list() {
        return serverConfigDao.getServerConfig();
    }
    async create(serverConfig: ServerConfig): Promise<any> {
        return serverConfigDao.save(serverConfig);
    }
    async find(id: number): Promise<ServerConfig> {
        return this.list()
    }
};
export default new ServerConfigService();
