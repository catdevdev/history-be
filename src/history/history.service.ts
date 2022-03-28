import { Injectable } from '@nestjs/common';
import { PgService } from 'src/pg/pg.service';
import { History } from './dto/history.dto';

@Injectable()
export class HistoryService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private pgService: PgService) {}

  async story(id: number): Promise<History> {
    const res = await this.pgService.query<History>(
      'postgres',
      'postgres',
      'select now()',
    );

    console.log(res.rowCount);

    res.rows[0].;

    return {
      id: 3,
      title: '123',
      content: '123',
    };
  }

  async stories(): Promise<History[]> {
    const res = await this.pgService.query(
      'postgres',
      'postgres',
      'select now()',
    );

    console.log(res.rows);

    return [
      {
        id: 0,
        title: '123',
        content: 'sfd',
      },
      {
        id: 1,
        title: '1234',
        content: 'sfdf',
      },
    ];
  }
}
