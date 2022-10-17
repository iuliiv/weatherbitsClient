import { Entity, Schema } from 'redis-om'
import client from '../client/client'

class StatisticsEntity extends Entity { }


const schema = new Schema(StatisticsEntity, {
    cityId: { type: 'number' },
    temperature: { type: 'number' },
    date: { type: 'date', sortable: true }
});




const createRepository = async () => {

    const repository = (await client).fetchRepository(schema)
    try {
        await repository.createIndex();
    } catch (err) { }
    return repository;
}

export default createRepository();

