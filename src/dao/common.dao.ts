import { Client, Entity, Schema } from "redis-om";
import { enviroment } from '../util/enviroment';

class CommonEntity extends Entity { }
export abstract class CommonDao {
    client: Client = new Client();
    schema = new Schema(CommonEntity, {});
    indexedCreated: boolean = false;
    repository: any;


    constructor() {
        console.log('connecting to REDIS', this.schema.entityCtor)
        if (!this.client.isOpen()) {
            try {
                this.client.open(`redis://${enviroment.REDIS_HOST}:${enviroment.REDIS_PORT}`);
            } catch (err) {
                console.log(`error connecting to redis ${this.schema.entityCtor}`)
            }
        }
    }

    async init() {
        console.log('init ', this.schema.entityCtor)
        this.repository = this.client.fetchRepository(this.schema);
        try {
            if (!this.indexedCreated) {
                this.repository.createIndex();
                this.indexedCreated = true;
            }
        } catch (err) {
            console.log(`error creating index ${this.schema.entityCtor}`, err);
        }
    }




}