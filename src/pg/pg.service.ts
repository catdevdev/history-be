import { Injectable } from '@nestjs/common';
import { Client } from 'node-postgres';

export interface FieldDef {
  name: string;
  tableID: number;
  columnID: number;
  dataTypeID: number;
  dataTypeSize: number;
  dataTypeModifier: number;
  format: string;
}

export interface QueryResultBase {
  command: string;
  rowCount: number;
  oid: number;
  fields: FieldDef[];
}

export interface QueryResult<T> extends QueryResultBase {
  rows: T[];
}

@Injectable()
export class PgService {
  query = async <T>(username: string, password: string, query: string) => {
    const client = new Client({
      host: 'localhost',
      port: 5432,
      database: 'horror',
      user: username,
      password,
    });
    await client.connect();
    const res = await client.query(query);
    await client.end();

    return res as QueryResult<T>;
  };
}
