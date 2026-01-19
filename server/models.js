// models.js
import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

// Scan session model
export const ScanSession = sequelize.define("ScanSession", {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add other columns if needed
}, {
  tableName: "scan_sessions",
  timestamps: true, // for createdAt/updatedAt
});

// Link model
export const Link = sequelize.define("Link", {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  risk_percentage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "links",
  timestamps: false,
});

// Associations
ScanSession.hasMany(Link, { foreignKey: "session_id" });
Link.belongsTo(ScanSession, { foreignKey: "session_id" });
