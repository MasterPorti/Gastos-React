import { useEffect, useState } from 'react'
import { generarId } from '../helpers'
import cerrarModal from '../img/cerrar.svg'

const Modales = ({ gastos, setModal, animarModal, setAnimarModal, guardarGasto, editar, setEditar, setGastos }) => {
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  const [mensaje, setMensaje] = useState()
  useEffect(() => {
    if (editar.nombre) {
      setNombre(editar.nombre)
      setCantidad(editar.cantidad)
      setCategoria(editar.categoria)
    }
  }, [])
  const handleNuevoGasto = () => {
    setModal(false)
    setAnimarModal(false)
    setEditar({})
  }
  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (cantidad < 0) {
      setMensaje('Cantidad no valida ')
      return
    }
    if ([nombre, cantidad, categoria].includes('')) {
      setMensaje('Todos los campos son obligatorios')
      setTimeout(() => setMensaje(), 5000)
      return
    }
    if (editar.nombre) {
      const gastoUpdate = { nombre, cantidad: Number(cantidad), categoria, id: editar.id, fecha: editar.fecha }
      const gastosUpdate = gastos.map(gastos => gastos.id === editar.id ? gastoUpdate : gastos)
      setGastos(gastosUpdate)
      handleNuevoGasto()
      return
    }
    guardarGasto({ nombre, cantidad: Number(cantidad), categoria, id: generarId(), fecha: Date.now() })
    setNombre('')
    setCantidad('')
    setCategoria('')
    handleNuevoGasto()
  }
  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img src={cerrarModal} alt='cerrar agregar' onClick={handleNuevoGasto} />
      </div>
      <form className={`formulario ${animarModal && 'animar'}`} onSubmit={handleOnSubmit}>
        <legend>{editar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
        {mensaje && <div className='alerta error'>{mensaje}</div>}
        <div className='campo'>
          <label htmlFor='nombre'>Nombre Gasto</label>
          <input
            type='text'
            placeholder='Añade el Nombre de Gasto'
            id='nombre'
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className='campo'>
          <label htmlFor='cantidad'>Cantidad</label>
          <input
            type='number'
            placeholder='Añade la cantidad ej. 300'
            id='cantidad'
            value={cantidad}
            onChange={e => setCantidad(e.target.value)}
          />
        </div>
        <div className='campo'>
          <label htmlFor='categoria'>Categoria</label>
          <select
            id='categoria'
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          >
            <option value=''>-- Selecione--</option>
            <option value='Ahorro'>Ahorro</option>
            <option value='Comida'>Comida</option>
            <option value='Casa'>Casa</option>
            <option value='Gastos'>Gastos Varios</option>
            <option value='Ocio'>Ocio</option>
            <option value='Salud'>Salud</option>
            <option value='Suscripciones'>Suscripciones</option>
          </select>
          <input
            type='submit'
            value={editar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}
          />
        </div>
      </form>
    </div>
  )
}

export default Modales
