import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(email: string, password: string) {
    const user = await this.userRepo.create({ email, password });

    return this.userRepo.save(user);
  }

  async findOne(id: number) {
    if(!id){
      return null;
    }
    const user = await this.userRepo.findOne(id);

    if(!user){
      throw new NotFoundException('user not found');
    }

    return user;
  }

  find(email: string) {
    return this.userRepo.find({ email });
  }

  async updateOne(id: number, attr: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    Object.assign(user, attr);

    return this.userRepo.save(user);
  }

  async deleteOne(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.userRepo.remove(user);
  }
}
