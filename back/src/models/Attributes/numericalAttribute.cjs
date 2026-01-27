const mongoose = require("mongoose");
const Attribute = require("./attribute");

const numericalAttributeSchema = new mongoose.Schema({
  min: { type: Number, required: false },
  max: { type: Number, required: false },
});

numericalAttributeSchema.pre("validate", function (next) {
  if (this.min !== undefined && this.max !== undefined && this.min > this.max) {
    return next(
      new Error(
        `Minimum value ${this.min} cannot be greater than maximum value ${this.max}`,
      ),
    );
  }
  next();
});

const NumericalAttribute = Attribute.discriminator(
  "NumericalAttribute",
  numericalAttributeSchema,
);

module.exports = NumericalAttribute;
