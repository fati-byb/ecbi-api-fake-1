// controllers/table.controller.js
const Table = require('../../models/table.model');
const Zone = require('../../models/zone.model'); // Import the Zone model for validation


const tableController = {};

tableController.createTable = async (req, res) => {
  try {
    const { nom, places, min, zone } = req.body;

    // Check if the zone exists
    const existingZone = await Zone.findOne({"libele":zone});
    if (!existingZone) {
      return res.status(404).json({ message: 'Zone not found' });
    }

    // Create a new table
    const newTable = new Table({
      nom,
      places,
      min,
      zone: existingZone._id, // Use the _id of the zone
    });

     await newTable.save();

    return res.status(201).json(newTable);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating table', error: error.message });
  }
};

// Get all tables
tableController.getAllTables = async (req, res) => {
  try {
    const tables = await Table.find().populate('zone'); // Populate the zone field
    return res.status(200).json(tables);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching tables', error: error.message });
  }
};

// Get a table by ID
tableController.getTableById = async (req, res) => {
  try {
    const { id } = req.params;
    const table = await Table.findById(id).populate('zone');

    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    return res.status(200).json(table);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching table', error: error.message });
  }
};

tableController.updateDisplayTable = async(req, res)=>{
  try {
    const { id } = req.params;

    // Find the table by its ID
    const table = await Table.findById(id);

    if (!table) {
        return res.status(404).json({ message: 'Table not found' });
    }

    // Toggle the display field
    table.display = !table.display;

    // Save the updated table
    await table.save();

    return res.status(200).json({ message: 'Display status updated successfully', table });
} catch (error) {
    return res.status(500).json({ message: 'Error toggling display', error: error.message });
}
}
tableController.updateTable = async (req, res) => {
   console.log('piwehf', req.body)
  try {
    const { id } = req.params;
    const { nom, places, min, zone, status } = req.body;
   
    // Initialize an object to hold the updated fields
    const updateFields = {};

    // Check if the zone exists (if it's being updated)
    if (zone) {
      const existingZone = await Zone.findOne({ "libele": zone.libele });
      if (!existingZone) {
        return res.status(404).json({ message: 'Zone not found' });
      }
      updateFields.zone = existingZone._id; // Use the _id of the zone if it exists
    }

    // Only add fields to updateFields if they are provided
    if (nom) updateFields.nom = nom;

    if (places) updateFields.places = places;
    if (min) updateFields.min = min;
    if (status) updateFields.status = status;

    // Update the table fields
    const updatedTable = await Table.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedTable) {
      return res.json({ message: 'Table not found' });
    }

    return res.status(200).json(updatedTable);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating table', error: error.message });
  }
};


// Delete a table by ID
tableController.deleteTable = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTable = await Table.findByIdAndDelete(id);

    if (!deletedTable) {
      return res.status(404).json({ message: 'Table not found' });
    }

    return res.status(200).json({ message: 'Table deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting table', error: error.message });
  }
};

module.exports= tableController;