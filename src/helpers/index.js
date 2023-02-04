export const generarId = () => {
  const random = Math.random().toString(36).substr(2) + Date.now().toString(36)
  return random
}

export const formatearFecha = (fecha) => {
  const fechaNueva = new Date(fecha)
  const opciones = {
    year: 'numeric',
    month: 'long',
    fay: '2-digit'
  }
  return fechaNueva.toLocaleDateString('es-ES', opciones)
}

export const formatearCantidad = (cantidad) => {
  return cantidad.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
