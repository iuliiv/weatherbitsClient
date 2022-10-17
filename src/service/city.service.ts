import { CRUD } from "../interfaces/crud.interface";
import { City } from "../dto/dto";
import cityDao from "../dao/city.dao";


class CityService implements CRUD {
    async list(): Promise<City[]> {
        return cityDao.getAllCities();
    }
    async create(city: City): Promise<any> {
        return cityDao.addCity(city);
    }
    async saveList(cities: City[]) {
        cityDao.addCities(cities);
    }
    async find(cityId: number): Promise<City> {
        return cityDao.getCity(cityId)
    }
};
export default new CityService();
