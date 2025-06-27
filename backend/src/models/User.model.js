import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcrypt"

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM("superadmin", "provider"),
    defaultValue: "provider"
  }
}, {
  tableName: "users",
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed("password")) {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
      }
    }
  }
});

export default User;