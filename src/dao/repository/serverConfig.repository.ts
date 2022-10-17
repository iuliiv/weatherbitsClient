import { Entity, Repository, Schema } from 'redis-om'
import client from '../client/client'

class ServerConfigEntity extends Entity { }


const schema = new Schema(ServerConfigEntity, {
    dataInit: { type: 'boolean' }

});



const createRepository = async () => {

    const repository = (await client).fetchRepository(schema)
    try {
        await repository.createIndex();
    } catch (err) { } return repository;
}

export default createRepository();

