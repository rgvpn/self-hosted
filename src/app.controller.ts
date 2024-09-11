import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

import { DeviceDto } from './models/device.model';
import { UserDto } from './models/user.model';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  getUsers() {
    return this.appService.getUsers();
  }

  @Get('users/:id')
  getUser(@Param('id') id: string) {
    return this.appService.getUser(id);
  }

  @Post('users')
  createUser(@Body() user: UserDto) {
    return this.appService.createUser(user);
  }

  @Patch('users/:id')
  updateUser(@Param('id') id: string, @Body() user: UserDto) {
    return this.appService.updateUser(id, user) && { result: true };
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.appService.deleteUser(id) && { result: true };
  }

  @Get('users/:userId/devices')
  getUserDevices(@Param('userId') userId: string) {
    return this.appService.getUserDevices(userId);
  }

  @Get('users/:userId/devices/:id')
  getUserDevice(@Param('userId') userId: string, @Param('id') id: string) {
    return this.appService.getUserDevice(userId, id);
  }

  @Post('users/:userId/devices')
  createUserDevice(@Param('userId') userId: string, @Body() device: DeviceDto) {
    return this.appService.createUserDevice(userId, device);
  }

  @Patch('users/:userId/devices/:id')
  updateUserDevice(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() device: DeviceDto,
  ) {
    return (
      this.appService.updateUserDevice(userId, id, device) && { result: true }
    );
  }
}
