export function Fields<T>() {
    return new Proxy(
        {},
        {
            get: function (_target, prop, _receiver) {                                
                return prop;
            },
        }
    ) as {
            [P in keyof T]: P;
        };
};

export default class DbEntity {
    public GetFields(): any {
        return Fields<this>();
    }
}