const Category = require("../../models/category.model");

const categoryController = {};

// Fetch all visible categories
categoryController.getCategories = async (req, res) => {
    try {
         // Fetch only categories with visibility set to "show"
        const categories = await Category.find();
 
        res.status(200).json(categories);
    } catch (error) {
        res.json({ error: 'Failed to fetch visible categories' });
    }
};
 
categoryController.getCategoryByName = async (req, res) => {
    try {
        const { name } = req.params;

         
        // Find the category by name (case-insensitive)
        const category = await Category.findOne({ name });
        
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(category._id);
    } catch (error) {
         res.status(500).json({ error: 'Failed to fetch category by name' });
    }
};

 

 

 
 
categoryController.createCategory = async (req, res, next) => {
     try {
        const { libele, description } = req.body;

        const existingCategory = await Category.findOne({ libele });
         if (existingCategory) {
            return res.json({ success: false, message: 'Category with this name already exists.' });
        }

        const newCategory = new Category({
            libele,
            description
        });

        const category = await newCategory.save();
        res.json({ success: true, data: category });
    } catch (err) {
         res.json({ error: 'Failed to create category' });
    }
};
categoryController.deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the category by ID and delete it
        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Send a success message or response back to the client
        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete category' });
    }
};
// Update a category
categoryController.updateCategory = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
  
    try {
      // Find the category by ID and update it
      const category = await Category.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  
      if (!category) {
        return res.json({ message: 'Category not found' });
      }
  
      // Send the updated category data back to the client
      res.status(200).json(category);
    } catch (error) {
      // Handle errors
      res.json({ message: error.message });
    }
};

module.exports = categoryController;
