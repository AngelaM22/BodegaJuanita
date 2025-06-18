const Producto = require('../models/product');

// Calcular campos derivados
function calcularDatos(producto) {
  const precio_costo_unitario = producto.precio_costo / producto.cantidad;
  const precio_venta = producto.precio_venta_unitario * producto.cantidad;
  const ganancia_total = precio_venta - producto.precio_costo;
  const porcentaje_ganancia = ganancia_total / producto.precio_costo;

  return {
    ...producto,
    precio_costo_unitario,
    precio_venta,
    ganancia_total,
    porcentaje_ganancia
  };
}

// Crear producto
exports.createProduct = async (req, res) => {
  try {
    const datosCalculados = calcularDatos(req.body);
    const nuevoProducto = new Producto(datosCalculados);
    await nuevoProducto.save();
    res.json({ msg: 'Producto registrado correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al registrar', error });
  }
};

// Obtener todos los productos
exports.getProducts = async (req, res) => {
  try {
    const productos = await Producto.find().sort({ fecha_creacion: -1 });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ msg: 'Error al listar productos', error });
  }
};

// Editar producto
exports.updateProduct = async (req, res) => {
  try {
    const datosCalculados = calcularDatos(req.body);
    await Producto.findByIdAndUpdate(req.params.id, datosCalculados);
    res.json({ msg: 'Producto actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar', error });
  }
};

// Eliminar producto
exports.deleteProduct = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar', error });
  }
};
