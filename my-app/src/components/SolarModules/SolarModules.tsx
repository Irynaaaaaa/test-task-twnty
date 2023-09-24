import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

import { getModules } from '../../redux/slices/modulesSlice'
import SolarModule from '../SolarModule/SolarModule'
import './styles.scss'

const SolarModules = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    allModules: modules,
    status,
    selectedModules,
  } = useAppSelector((state) => state.modules)

  const totalPrice = Object.values(selectedModules).reduce(
    (acc, { price, count }) => (acc += price * count),
    0
  )

  useEffect(() => {
    dispatch(getModules())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderModules = () => {
    if (status === 'failed') return <span> oops something went wrong </span>
    if (status === 'loading') return <span> Loading...</span>
    if (status === 'idle' && modules) {
      const modulesList = Object.entries(modules)
      return (
        <>
          <h2 className="modules-header"> Solar Modules</h2>
          {modulesList.map(([name, props]) => {
            const count = selectedModules[name]
              ? selectedModules[name].count
              : 0
            return (
              <SolarModule key={name} name={name} count={count} {...props} />
            )
          })}
        </>
      )
    }
    return <span> There are no available solar modules </span>
  }

  return (
    <>
      <div className="modules">{renderModules()}</div>
      <div className="modules-footer">
        <span className="modules-footer-total">Total Price: {totalPrice} </span>
        <button
          className="modules-footer-submit"
          disabled={!Object.keys(selectedModules).length}
          onClick={() => navigate('/submission')}
        >
          Submit Order
        </button>
      </div>
    </>
  )
}

export default SolarModules
