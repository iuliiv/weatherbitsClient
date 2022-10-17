import { CRUD } from "../interfaces/crud.interface";
import { Statistics } from "../dto/dto";
import statisticsDao from "../dao/statistics.dao";


class StatisticsService implements CRUD {

    async list() {
        return statisticsDao.getStatistics();
    }
    async create(statistic: Statistics): Promise<Statistics> {
        return statisticsDao.addStatistics(statistic);
    }
    async find(cityId: number): Promise<Statistics> {
        return statisticsDao.getStatistics(cityId)
    }
};
export default new StatisticsService();
