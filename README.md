# 🚀 Welcome to Dexie Repository Sample

sample usage, define repository:

```
//AppDb.ts

import Dexie from "dexie";
import { DbEntity } from "../core/DbEntity";
import Repository from "../core/repository";

export class DbContact extends DbEntity {
    id?: number; // Primary key. Optional (autoincremented)
    first: string; // First name
    last: string; // Last name
}

export class AppDb extends Dexie {

    public Contact: Repository<DbContact, number>;    

    constructor() {
        super("AppDb");

        this.version(1).stores({
            contacts: '++id, first, last'            
        });

        this.Contact = new Repository<DbContact, number>(this, "contacts");        
    }
}
```

all method has promise. using async/wait

```
var clientDb = new myDb.AppDb();  
var allContact = await clientDb.Contact.GetAll();
```

