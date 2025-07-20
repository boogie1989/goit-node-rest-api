import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const USER_TABLE_NAME = 'user';
const subscription = ['starter', 'pro', 'business'];

export const User = sequelize.define(
    USER_TABLE_NAME, {
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    verify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    verificationToken: {
        type: DataTypes.STRING,
    },
    subscription: {
        type: DataTypes.ENUM,
        values: subscription,
        defaultValue: subscription[0]
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    avatarURL: DataTypes.STRING,
});
