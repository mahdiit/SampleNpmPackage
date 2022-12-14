import Dexie from "dexie"
import  IRepository from "./IRepository";

export type Filter<T> = (item: T) => boolean;

export default class Repository<IEntity, Key> implements IRepository<IEntity, Key> {
    private _Dexie: Dexie;
    private _tableName: string;
    private _filter: any;

    constructor(dexie: Dexie, tableName: string) {
        this._Dexie = dexie;
        this._tableName = tableName;
    }

    async Remove(id: Key){
        await this.GetTable().delete(id);
    }

    async Update(item: IEntity, id: Key){
        await this.GetTable().put(item, id);
    }

    async Count(): Promise<number> {
        return await this.GetTable().count();
    }
    async Add(item: IEntity): Promise<Key> {
        return await this.GetTable().add(item);
    }
    async GetFilterResult(): Promise<IEntity[]> {
        return await this.GetTable().filter(this._filter).toArray();
    }

    SetFilter(filter: Filter<IEntity>): Repository<IEntity, Key> {
        this._filter = filter;
        return this;
    }

    GetTable(): Dexie.Table {
        return this._Dexie.table(this._tableName);
    }

    async GetById(id: any): Promise<IEntity> {
        return await this.GetTable().get(id);
    }

    async GetPaged(sort: string, pageIndex: number, pageSize: number): Promise<IEntity[]> {

        var query = this.GetTable().orderBy(sort).reverse();
        if (this._filter != null)
            query = query.filter(this._filter);

        return await query.offset(pageIndex * pageSize).limit(pageSize).toArray();
    }

    async GetAll(): Promise<IEntity[]> {
        return await this.GetTable().toArray();
    }

}