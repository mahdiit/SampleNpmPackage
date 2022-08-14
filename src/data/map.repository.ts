import Entity from "../core/entity";
import IRepository from "../core/repository";

export default class MapRepository<Key, T extends Entity<Key>>
    implements IRepository<Key, T>{

    private _storage: Map<Key, T>;

    constructor() {
        this._storage = new Map<Key, T>();
    }

    add(entity: T): void {
        this._storage.set(entity.id, entity);
    }

    get(id: Key): T {
        return this._storage.get(id);
    }
}