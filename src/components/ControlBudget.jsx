import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
function ControlBudget ({ presupuesto, gastos, SetIsValid, setPresupuesto, setGastos }) {
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)
  const [porcentage, SetPorcentage] = useState(0)

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }
  useEffect(() => {
    const totalGastado = gastos.reduce((total, gast) => gast.cantidad + total, 0)
    const nuevoPorcentage = (((presupuesto - totalGastado) / presupuesto) * 100).toFixed(2)
    setTimeout(() => SetPorcentage(nuevoPorcentage), 500)
    setGastado(totalGastado)
    setDisponible(presupuesto - totalGastado)
  }, [gastos])
  const handleReset = () => {
    setPresupuesto(0)
    setGastos([])
    SetIsValid(false)
  }
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div><CircularProgressbar
        styles={buildStyles({
          pathColor: '#3B82F6',
          trailColor: '#F5F5F5'
        })}
        value={porcentage}
        text={`${porcentage}%`}
           />
      </div>
      <div className='contenido-presupuesto'>
        <button className='reset-app' type='button' onClick={handleReset}>Reset App</button>
        <p>
          <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
        </p>
        <p className={disponible < 0 ? 'negativo' : ''}>
          <span>Disponible:</span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado:</span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  )
}

export default ControlBudget
