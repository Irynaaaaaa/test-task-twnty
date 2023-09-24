import {
  SolarModuleCharacteristics,
  addToList,
  decreaseModuleAmount,
  increaseModuleAmount,
  removeFromList,
} from '../../redux/slices/modulesSlice'
import { useAppDispatch } from '../../redux/hooks'

import './styles.scss'

type SolarModuleProps = {
  name: string
  count: number
} & SolarModuleCharacteristics

const SolarModule = ({ name, quantity, price, count }: SolarModuleProps) => {
  const dispatch = useAppDispatch()

  const onCheckboxChange = () => {
    if (count) {
      return dispatch(removeFromList(name))
    }
    return dispatch(
      addToList({
        [name]: { count: 1, price, quantity },
      })
    )
  }

  const increaseAmount = () => {
    dispatch(increaseModuleAmount({ name, price, quantity }))
  }

  const decreaseAmount = () => {
    dispatch(decreaseModuleAmount({ name }))
  }

  return (
    <div className="module">
      <p className="module-available">
        available:
        <span className="module-available-quantity">{quantity - count}</span>
      </p>
      <div className="module-content">
        <input
          type="checkbox"
          checked={!!count}
          onChange={onCheckboxChange}
          className="module-content-checkbox"
        />
        <span className="module-content-name">{name}</span>
        <div className="module-content-count">
          <button
            className="module-content-count-increase"
            onClick={increaseAmount}
            disabled={count === quantity}
          >
            +
          </button>
          <span className="module-content-count-value">{count}</span>
          <button
            className="module-content-count-decrease"
            onClick={decreaseAmount}
            disabled={!count}
          >
            -
          </button>
        </div>
        <span className="module-content-price">{price} $</span>
      </div>
    </div>
  )
}

export default SolarModule
