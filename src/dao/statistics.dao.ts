
import { Statistics } from '../dto/dto';
import { Entity, Schema } from 'redis-om'
import statisticsRepository from './repository/statistics.repository';




class StatisticsDao {



    public async addStatistics(statistics: Statistics): Promise<any> {
        return (await statisticsRepository).createAndSave(statistics);
    }

    public async getStatistics(cityId: number = 0): Promise<any> {
        return (await statisticsRepository).search()
            .where('cityId').eq(cityId)
            .returnMax('date');
    }





}

export default new StatisticsDao();