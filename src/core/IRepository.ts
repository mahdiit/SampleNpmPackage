import Dexie from "dexie";
import { Filter } from "./Repository";


export interface IRepository<IEntity, Key> {
    Add(item: IEntity): Promise<Key>;
    Remove(id: Key): void;
    Update(item: IEntity, id: Key): void;

    GetAll(): Promise<IEntity[]>;
    GetById(id: Key): Promise<IEntity>;
    GetPaged(sort: string, pageIndex: number, pageSize: number): Promise<IEntity[]>;
    Count(): Promise<number>;
    GetTable(): Dexie.Table;

    SetFilter(filter: Filter<IEntity>): IRepository<IEntity, Key>;
    GetFilterResult(): Promise<IEntity[]>;
}
