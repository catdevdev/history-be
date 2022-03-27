import { Injectable } from '@nestjs/common';
import { History } from './dto/history.dto';

@Injectable()
export class HistoryService {
  story(id: number): History {
    return {
      id,
      title: '123',
      content: 'sfd',
    };
  }

  stories(): History[] {
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
