export default interface IRepository<Key, T> {
    get(id: Key): T;
    add(entity: T): void;
}