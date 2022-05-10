import { User } from './user';
'use strict';
import { Model ,DataTypes} from 'sequelize';
import db from "../models/index";

interface ProjectAttributes {
  id?: number;
  title: string;
  status: string;
 
}
// module.exports = (sequelize:any, DataTypes:any) => {
//   class Project extends Model<ProjectAttributes> implements ProjectAttributes{
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//      id!: number;
//      title!: string;
//      status!: string;
//     static associate(models:any) {
//       // define association here
//     }
//   }
//   Project.init({
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     status: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   }, {
//     sequelize,
//     modelName: 'Project',
//   });
//   return Project;
// };

export class Project extends Model<Partial<ProjectAttributes>> {}
Project.init(
  {
    id:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement: true
    },
    title:  DataTypes.STRING,
    status:  DataTypes.STRING
  },
  {
    sequelize: db,
    modelName: "Project",
  }
);
