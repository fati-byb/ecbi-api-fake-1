const Zone = require('../../models/zone.model');
const zonesController = {};

 zonesController.createZone = async (req, res) => {
  try {
    const { libele } = req.body;

    if (!libele) {
      return res.status(400).json({ message: 'Libele is required' });
    }

    const zone = new Zone({
      libele
    });

    await zone.save();
    return res.status(201).json(zone);
  } catch (error) {
    console.error('Error creating zone:', error);
    return res.status(500).json({ message: error.message });
  }
};

 zonesController.getZones = async (req, res) => {
  try {
    const zones = await Zone.find();
    return res.status(200).json(zones);
  } catch (error) {
    console.error('Error fetching zones:', error);
    return res.status(500).json({ error: 'Failed to fetch zones' });
  }
};

 zonesController.getZoneById = async (req, res) => {
  try {
    const { id } = req.params;
    const zone = await Zone.findById(id);

    if (!zone) {
      return res.status(404).json({ message: 'Zone not found' });
    }

    return res.status(200).json(zone);
  } catch (error) {
    console.error('Error fetching zone by ID:', error);
    return res.status(500).json({ error: 'Failed to fetch zone by ID' });
  }
};

zonesController.updateZone = async (req, res) => {
  try {
    const { id } = req.params;
    const { libele } = req.body;

    if (!libele) {
      return res.status(400).json({ message: 'Libele is required' });
    }

    const zone = await Zone.findByIdAndUpdate(id, { libele }, { new: true, runValidators: true });

    if (!zone) {
      return res.status(404).json({ message: 'Zone not found' });
    }

    return res.status(200).json({ success: true, data: zone });
  } catch (error) {
    console.error('Error updating zone:', error);
    return res.status(500).json({ error: 'Failed to update zone' });
  }
};


zonesController.deleteZone = async (req, res) => {
  try {
    const { id } = req.params;

    const zone = await Zone.findByIdAndDelete(id);

    if (!zone) {
      return res.status(404).json({ message: 'Zone not found' });
    }

    return res.status(200).json({ success: true, message: 'Zone deleted successfully' });
  } catch (error) {
    console.error('Error deleting zone:', error);
    return res.status(500).json({ error: 'Failed to delete zone' });
  }
};

module.exports = zonesController;
