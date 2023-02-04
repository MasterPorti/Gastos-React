import { useEffect, useState } from 'react'
import './App.css'
import Filtro from './components/Filtro'
import Hearder from './components/Hearder'
import ListadoGastos from './components/ListadoGastos'
import Modales from './components/Mosadal'
import AgregarGasto from './img/nuevo-gasto.svg'
function App () {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValid, SetIsValid] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [editar, setEditar] = useState({})
  const [gastos, setGastos] = useState(
    JSON.parse(localStorage.getItem('gastos')) ?? []
  )
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    if (presupuesto > 0)SetIsValid(true)
  }, [])
  useEffect(() => localStorage.setItem('gastos', JSON.stringify(gastos) ?? []), [gastos])

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(gastos => gastos.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  const handleNuevoGasto = () => {
    setTimeout(() => {
      setAnimarModal(true)
    }, 100)
    setModal(true)
  }
  const handleEditarGasto = (gasto) => {
    setEditar(gasto)
    setTimeout(() => {
      setAnimarModal(true)
    }, 100)
    setModal(true)
  }
  const deleteGastos = (id) => {
    const gastosUpdate = gastos.filter(gastoOne => gastoOne.id !== id)
    setGastos(gastosUpdate)
  }
  const guardarGasto = (valor) => {
    setGastos([...gastos, valor])
  }
  return (
    <div className={modal ? 'fijar' : ''}>
      <Hearder
        setGastos={setGastos}
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValid={isValid}
        SetIsValid={SetIsValid}
      />
      {isValid && (
        <>
          <main>
            <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
              gastos={gastos}
              deleteGastos={deleteGastos}
              handleEditarGasto={handleEditarGasto}
            />
          </main>
          <div className='nuevo-gasto'>
            <img src={AgregarGasto} alt='boton de agregar' onClick={handleNuevoGasto} />
          </div>
        </>)}
      {modal && <Modales
        setGastos={setGastos}
        gastos={gastos}
        editar={editar}
        setEditar={setEditar}
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
                />}
    </div>
  )
}

export default App
