
import { City } from '../dto/dto';
import { Entity, Schema, Client } from 'redis-om'
import { enviroment } from '../util/enviroment';
import { CommonDao } from './common.dao';
import cityRepository from './repository/city.repository';


class CityEntity extends Entity { };



class CityDao extends CommonDao {



    schema = new Schema(CityEntity, {
        cityId: { type: 'number' },
        name: { type: 'string' }
    });




    public async addCity(city: City) {

        return (await cityRepository).createAndSave(city);

    }
    public async addCities(cities: City[]) {
        cities.forEach(city => {
            this.addCity(city)
        })
    }
    public async getAllCities(): Promise<any[]> {
        return (await cityRepository).search().return.all();

    }

    public async getCity(cityId: number): Promise<any> {
        return (await cityRepository).search().where('cityId').eq(cityId).return.first();
        //return this.repository.search().where('cityId').eq(cityId).return().first();
    }

}

export default new CityDao();