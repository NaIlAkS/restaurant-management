// controllers/menuController.js
const Menu = require('../models/Menu');

exports.addMenuItem = async (req, res) => {
  const { name, description, price, available } = req.body;
  const item = await Menu.create({ name, description, price, available });
  res.json(item);
};

exports.getMenuItems = async (req, res) => {
  const items = await Menu.findAll();
  res.json(items);
};

exports.updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, available } = req.body;
  await Menu.update({ name, description, price, available }, { where: { id } });
  res.json({ message: 'Menu item updated' });
};

exports.deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  await Menu.destroy({ where: { id } });
  res.json({ message: 'Menu item deleted' });
};
