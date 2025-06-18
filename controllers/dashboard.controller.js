const Usuario = require('../models/user');
const Producto = require('../models/product');

const getDashboardData = async (req, res) => {
  try {
    const totalUsuarios = await Usuario.countDocuments();
    const totalProductos = await Producto.countDocuments();

    // Si aún no tienes órdenes, puedes dejarlo en 0
    const totalOrdenes = 0;

    // Sumar el total de ventas (precio_venta de cada producto)
    const productos = await Producto.find();
    const totalVentas = productos.reduce((acc, p) => acc + (p.pv || 0), 0);

    res.json({
      totalUsuarios,
      totalProductos,
      totalOrdenes,
      totalVentas
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener datos del dashboard', error });
  }
};

module.exports = { getDashboardData };
