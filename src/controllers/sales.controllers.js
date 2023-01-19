const sales = require('../services/sales.services');

const getAllSales = async (req, res) => {
  const allSales = await sales.getAllSales();
  res.status(200).send(allSales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const sale = await sales.getSalesById(id);
  if (sale.length < 1) return res.status(404).send({ message: 'Sale not found' });
  res.status(200).send(sale);
};

// const createSale = async (req, res, next) => {
//   // try { 
//   // const {algo} = req.body;
//   // const newProduct = await sales.createProduct(algo);
//   // res.status(201).json({ id: newProduct, algo });
//   // } catch (error) {
//   //   next(error);
//   // }
// };

module.exports = {
  getAllSales,
  getSalesById,
  // createSale,
};