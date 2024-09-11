import {
  Column,
  DataType,
  Model,
  Table,
  PrimaryKey,
} from 'sequelize-typescript';
import { JoiSchema, JoiSchemaOptions, CREATE, UPDATE } from 'nestjs-joi';
import * as Joi from 'joi';
import { NotFoundException } from '@nestjs/common';

@Table
export class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column
  telegramId: string;

  @Column
  username: string;

  @Column
  email: string;

  @Column
  language: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  static async findByIdOrThrow(id: string) {
    const user = await User.findByPk(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}

@JoiSchemaOptions({
  allowUnknown: false,
})
export class UserDto {
  @JoiSchema([CREATE], Joi.number().min(10000).max(9999999999).required())
  telegramId!: number;

  @JoiSchema([CREATE], Joi.string().min(3).max(30).required())
  @JoiSchema([UPDATE], Joi.string().min(3).max(30).optional())
  username!: string;

  @JoiSchema([CREATE], Joi.string().email().optional())
  @JoiSchema([UPDATE], Joi.string().email().optional())
  email!: string;

  @JoiSchema([CREATE], Joi.string().max(2).required())
  @JoiSchema([UPDATE], Joi.string().max(2).optional())
  language!: string;
}
