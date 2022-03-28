import { Injectable } from '@nestjs/common';
import { PgService } from 'src/pg/pg.service';

import { UserInput } from './inputs/user.input';
import { User } from './model/user.model';

@Injectable()
export class UsersService {
  constructor(private pgService: PgService) {}

  async createUser(userInput: UserInput): Promise<User> {
    const user = await this.pgService.query`
        
    `;
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('boxes').exec();
  }

  async findOneByName(username: string, boxId?: string): Promise<User> {
    const filterMatch = boxId && {
      match: {
        _id: {
          $eq: boxId,
        },
      },
    };

    return this.userModel
      .findOne({ username })
      .populate({
        path: 'boxes',
        ...filterMatch,
        populate: {
          path: 'warehouse',
          populate: {
            path: 'warehouseGroup',
          },
        },
      })
      .exec();
  }
}
