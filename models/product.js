const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  proveedor: { type: String, required: true },
  precio_costo: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  precio_venta_unitario: { type: Number, required: true },

  // Calculados automáticamente
  precio_costo_unitario: Number,
  precio_venta: Number,
  ganancia_total: Number,
  porcentaje_ganancia: Number,

  fecha_creacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Producto', productSchema);
