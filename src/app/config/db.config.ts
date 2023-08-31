import {DBConfig} from "ngx-indexed-db";

export const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'users',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [ // nombre, apellido, puesto, edad, teléfono, dirección, usuario, contraseña
        { name: 'firstname', keypath: 'firstname', options: { unique: false } },
        { name: 'lastname', keypath: 'lastname', options: { unique: false } },
        { name: 'role', keypath: 'role', options: { unique: false } },
        { name: 'age', keypath: 'age', options: { unique: false } },
        { name: 'phone', keypath: 'phone', options: { unique: false } },
        { name: 'address', keypath: 'address', options: { unique: false } },
        { name: 'username', keypath: 'username', options: { unique: true } },
        { name: 'password', keypath: 'password', options: { unique: false } }
      ],
    },
    {
      store: 'inventory',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [ // nombre, precio, descripción, cantidad, precio de proveedor
        { name: 'name', keypath: 'name', options: { unique: true } },
        { name: 'price', keypath: 'price', options: { unique: false } },
        { name: 'description', keypath: 'description', options: { unique: false } },
        { name: 'count', keypath: 'count', options: { unique: false } },
        { name: 'provider_price', keypath: 'provider_price', options: { unique: false } }
      ],
    }
  ]
}

export interface User {
  firstname: string;
  lastname: string;
  role: string;
  age: number;
  phone: number;
  address: string;
  username: string;
  password: string;
}

export interface Product {
  name: string;
  price: number;
  description: string;
  count: number;
  provider_price: number;
}
