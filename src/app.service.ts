import { Injectable } from '@nestjs/common';
import { User, UserDto } from './models/user.model';
import { Device, DeviceDto } from './models/device.model';

@Injectable()
export class AppService {
  async getUsers() {
    return await User.findAll();
  }

  async getUser(id: string) {
    return await User.findByIdOrThrow(id);
  }

  async createUser(user: UserDto) {
    return await User.create({
      ...user,
    });
  }

  async updateUser(id: string, user: UserDto) {
    return await User.update(user, { where: { id } });
  }

  async deleteUser(id: string) {
    return await User.destroy({ where: { id } });
  }

  async getUserDevice(userId: string, id: string) {
    return await Device.findByUserIdAndIdOrThrow(userId, id);
  }

  async getUserDevices(userId: string) {
    return await Device.findAllByUserId(userId);
  }

  async createUserDevice(userId: string, device: DeviceDto) {
    return await Device.create({ ...device, userId });
  }

  async updateUserDevice(userId: string, id: string, device: DeviceDto) {
    return await Device.update(device, { where: { id, userId } });
  }
}
