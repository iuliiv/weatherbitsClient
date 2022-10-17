import { Entity, Repository, Schema } from 'redis-om'
import client from '../client/client'

class CityEntity extends Entity { }


const schema = new Schema(CityEntity, {
    cityId: { type: 'number' },
    name: { type: 'string' }
});



const createRepository = async () => {

    const repository = (await client).fetchRepository(schema);
    try {
        await repository.createIndex();
    } catch (err) { }
    return repository;
}

export default createRepository();

