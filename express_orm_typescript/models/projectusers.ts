"use strict";
import { Model,DataTypes } from "sequelize";
import db from "../models/index";


interface ProjectUserAttributes {
 ProjectId: number,
 UserId: number
}

export class ProjectUsers extends Model<Partial<ProjectUserAttributes>>  {}
  ProjectUsers.init(
    {
      ProjectId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        references:{
          model: 'Project',
          key: 'id'
        }
      },
      UserId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        references:{
          model: 'User',
          key: 'id'
        }
      }
    },
    {
      sequelize: db,
      modelName: "ProjectUsers",
    }
  );

