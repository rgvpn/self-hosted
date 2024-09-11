import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { JoiSchema, JoiSchemaOptions, CREATE, UPDATE } from 'nestjs-joi';
import * as Joi from 'joi';
import { NotFoundException } from '@nestjs/common';

interface XRayConfig {
  clientId: string;
  serverId: number;
}

const xrayConfigSchema = Joi.object({
  clientId: Joi.string().required(),
  serverId: Joi.number().required(),
});

interface AWGConfig {
  clientId: string;
  serverId: number;
}

const awgConfigSchema = Joi.object({
  clientId: Joi.string().required(),
  serverId: Joi.number().required(),
});

interface OutlineConfig {
  configId: string;
}

const outlineConfigSchema = Joi.object({
  configId: Joi.string().required(),
});

interface TailscaleConfig {
  inviteId: string;
}

const tailscaleConfigSchema = Joi.object({
  inviteId: Joi.string().required(),
});

@Table
export class Device extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  // Name
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  // User ID
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  // Tailscale Config
  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  tailscaleConfig: TailscaleConfig;

  // Outline Server Config ID
  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  outlineConfig: OutlineConfig;

  // Amnezia WireGuard Client ID
  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  awgConfig: AWGConfig;

  // Amnezia XRay Config
  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  xrayConfig: XRayConfig;

  // --------------

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  static async findAllByUserId(userId: string) {
    return await Device.findAll({ where: { userId } });
  }

  static async findByIdOrThrow(id: string) {
    const device = await Device.findByPk(id);
    if (!device) {
      throw new NotFoundException('Device not found');
    }
    return device;
  }

  static async findByUserIdAndIdOrThrow(userId: string, id: string) {
    const device = await Device.findOne({ where: { id, userId } });
    if (!device) {
      throw new NotFoundException('Device not found');
    }
    return device;
  }
}

@JoiSchemaOptions({
  allowUnknown: false,
})
export class DeviceDto {
  @JoiSchema([CREATE], Joi.string().required())
  @JoiSchema([UPDATE], Joi.string().optional())
  name: string;

  @JoiSchema([CREATE], tailscaleConfigSchema.optional())
  @JoiSchema([UPDATE], tailscaleConfigSchema.optional())
  tailscaleConfig: TailscaleConfig;

  @JoiSchema([CREATE], outlineConfigSchema.optional())
  @JoiSchema([UPDATE], outlineConfigSchema.optional())
  outlineConfig: OutlineConfig;

  @JoiSchema([CREATE], awgConfigSchema.optional())
  @JoiSchema([UPDATE], awgConfigSchema.optional())
  awgConfig: AWGConfig;

  @JoiSchema([CREATE], xrayConfigSchema.optional())
  @JoiSchema([UPDATE], xrayConfigSchema.optional())
  xrayConfig: XRayConfig;
}
