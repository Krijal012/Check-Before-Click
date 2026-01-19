import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const ScanSession = sequelize.define(
  "scan_session",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    url: { type: DataTypes.TEXT, allowNull: false },
    risk_score: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    status: {
      type: DataTypes.ENUM("safe", "risky", "blocked"),
      allowNull: false,
      defaultValue: "safe",
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { timestamps: false }
);
