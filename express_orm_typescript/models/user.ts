import { Project } from './project';
'use strict';
import { DataTypes, Model } from "sequelize";
import db from "../models/index";

interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
}
export class User extends Model<Partial<UserAttributes>> {}
User.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: "User",
  }
);
export function associateUserProjects(): void {
  User.belongsToMany(Project, {
    // foreignKey: "ProjectId",
    through: "ProjectUsers",
    // as: "ProjectUsers"
  });
}

// interface UserAttributes {
//   id?: number;
//   name: string;
//   email: string;
//   password: string;
// }

// module.exports = (sequelize: any, DataTypes: any) => {
//   class User extends Model<UserAttributes> 
//   implements UserAttributes {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     id!: number;
//     name!: string;
//     email!: string;
//     password!: string;
//     static associate(models: any) {
//       // define association here
//       User.belongsToMany(models.Project, {
//         through: 'ProjectUsers'
//       })
//     }
//   };
//   User.init({
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement:true
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true
//     }, 
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
 
// };

