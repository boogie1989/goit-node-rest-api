import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { USER_TABLE_NAME } from './user.js';

export const Contact = sequelize.define(
    'contact', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        ref: USER_TABLE_NAME
    }
});
