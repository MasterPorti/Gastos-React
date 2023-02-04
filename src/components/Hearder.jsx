import React from 'react'
import ControlBudget from './ControlBudget'
import NewBudget from './NewBudget'
function Hearder ({ setPresupuesto, presupuesto, isValid, SetIsValid, gastos, setGastos }) {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      {isValid
        ? <ControlBudget presupuesto={presupuesto} gastos={gastos} SetIsValid={SetIsValid} setPresupuesto={setPresupuesto} setGastos={setGastos} />
        : <NewBudget
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            isValid={isValid}
            SetIsValid={SetIsValid}
          />}
    </header>
  )
}

export default Hearder
