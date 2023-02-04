import React, { useState } from 'react'

function NewBudget ({ setPresupuesto, presupuesto, isValid, SetIsValid }) {
  const [error, setError] = useState(false)
  const handleOnChange = (e) => {
    setPresupuesto(Number(e.target.value))
  }
  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (presupuesto < 1) {
      setError(true)
      return ''
    }
    setError(false)
    SetIsValid(true)
  }
  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form className='formulario' onSubmit={handleOnSubmit}>
        <div className='campo'>
          <label>Definir Presupuesto</label>
          <input className='nuevo-presupuesto' type='number' placeholder='Añade tu presupuesto' onChange={handleOnChange} value={presupuesto} />
          <input type='submit' value='Añadir' />
          {error && <div className='alerta error'>No es un presupesto valido</div>}
        </div>
      </form>
    </div>
  )
}

export default NewBudget
