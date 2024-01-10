const { Schema, model } = require("mongoose");
const { planetColumns } = require('./../data/configData')

const planetSchema = new Schema(
  planetColumns,
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Planet", planetSchema);
