import React from 'react'
import { formatearFecha } from '../helpers'

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'

import 'react-swipeable-list/dist/styles.css'

import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'

function ListadoGastos ({ gastos, deleteGastos, handleEditarGasto, filtro, gastosFiltrados }) {
  return (
    <div className='listado-gastos contenedor'>
      <h2>{gastos.length ? 'Gastos' : 'No hay gastos aun'}</h2>
      {filtro
        ? (
            gastosFiltrados.map(gasto => <Gasto
              gasto={gasto}
              handleEditarGasto={handleEditarGasto}
              cantidad={gasto.cantidad}
              nombre={gasto.nombre}
              categoria={gasto.categoria}
              fecha={gasto.fecha}
              key={gasto.id} id={gasto.id}
              deleteGastos={deleteGastos}
                                         />)
          )
        : (gastos.map(gasto => <Gasto
            gasto={gasto}
            handleEditarGasto={handleEditarGasto}
            cantidad={gasto.cantidad}
            nombre={gasto.nombre}
            categoria={gasto.categoria}
            fecha={gasto.fecha}
            key={gasto.id} id={gasto.id}
            deleteGastos={deleteGastos}
                               />))}
      {}
    </div>
  )
}

const Gasto = ({ gasto, cantidad, nombre, categoria, fecha, id, deleteGastos, handleEditarGasto }) => {
  const diccionarioIconos = {
    Ahorro: IconoAhorro,
    Comida: IconoComida,
    Casa: IconoCasa,
    Gastos: IconoGastos,
    Ocio: IconoOcio,
    Salud: IconoSalud,
    Suscripciones: IconoSuscripciones
  }
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => handleEditarGasto(gasto)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => deleteGastos(id)} destructive
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )
  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='gasto sombra'>
          <div className='contenido-gasto'>
            <img src={diccionarioIconos[categoria]} alt={`imagen de ${categoria}`} />
            <div className='descripcion-gasto'>
              <p className='categoria'>
                {categoria}
              </p>
              <p className='nombre-gasto'>
                {nombre}
              </p>
              <p>{formatearFecha(fecha)}</p>
            </div>

          </div>
          <p className='cantidad-gasto'>${cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default ListadoGastos
