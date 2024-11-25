// controllers/optionController.js
const Option = require('../../models/option.models');
const Product = require('../../models/product.model');

// Create a new option


// Delete an option
exports.deleteOption = async (req, res) => {
  try {
    const { optionId } = req.params;

    // Find the option to delete
    const option = await Option.findById(optionId);
    if (!option) {
      return res.status(404).json({ message: 'Option not found' });
    }

    // Remove the option ID from the product's options array
    await Product.findByIdAndUpdate(option.product, { $pull: { options: optionId } });

    // Delete the option itself
    await Option.findByIdAndDelete(optionId);

    return res.status(200).json({ message: 'Option deleted successfully' });
  } catch (error) {
    console.error('Error deleting option:', error);
    return res.status(500).json({ message: error.message });
  }
};


// Update an option
exports.updateOption = async (req, res) => {
  try {
    const { optionId } = req.params;
    const { name, elements } = req.body;

    // Validate input
    if (!name || !elements || !Array.isArray(elements) || elements.length === 0) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    // Find and update the option
    const updatedOption = await Option.findByIdAndUpdate(
      optionId,
      { name, elements },
      { new: true } // Return the updated document
    );

    if (!updatedOption) {
      return res.status(404).json({ message: 'Option not found' });
    }

    return res.status(200).json(updatedOption);
  } catch (error) {
    console.error('Error updating option:', error);
    return res.status(500).json({ message: error.message });
  }
};

exports.createOption = async (req, res) => {

  try {
    const {productId,data } = req.body;
    const namee = data[0].name;
const elementss = data[0].elements


console.log('data', productId, namee, elementss)
    // Validate input
    if (!namee || !elementss || !Array.isArray(elementss) || elementss.length === 0 || !productId) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    // Find the product to associate with the option
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create the new option
    const option = new Option({
      name:namee,
      elements:elementss,
      product: productId,
    });

    const savedOption = await option.save();

    // Update the product to include the new option
    product.options.push(savedOption._id);
    await product.save();

    return res.status(201).json(savedOption);
  } catch (error) {
    console.error('Error creating option:', error);
    return res.status(500).json({ message: error.message });
  }
};
exports.getProductsOptions = async (req, res) => {
  try {
    const options = await Option.find()
      .populate('product', 'libele') // Replace 'libele' with the product field(s) you want to retrieve
      .exec();

    return res.status(200).json(options);
  } catch (error) {
    console.error('Error retrieving options:', error);
    return res.status(500).json({ message: error.message });
  }
};
// Add other methods for updating, deleting, and retrieving options as needed
