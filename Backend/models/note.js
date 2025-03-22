const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  console.log("✅ Loading Note model...");

  const Note = sequelize.define("Note", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tags: {
      type: DataTypes.TEXT, // Store as a comma-separated string
      allowNull: true,
      get() {
        const value = this.getDataValue("tags");
        return value ? value.split(",") : []; // Convert to array
      },
      set(value) {
        // Ensure value is always an array
        const tagsArray = Array.isArray(value) ? value : [value];
        this.setDataValue("tags", tagsArray.join(",")); // Convert to string
      },
    },
  });

  return Note;
};
