import { Injectable } from '@nestjs/common';
import { Client } from 'node-postgres';

@Injectable()
export class PgService {
  query = async (username: string, password: string, query: string) => {
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
    return res;
  };
}
