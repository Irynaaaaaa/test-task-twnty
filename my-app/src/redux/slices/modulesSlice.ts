import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchModules } from '../../API/modulesAPI'

export type SolarModuleCharacteristics = {
  quantity: number
  price: number
}

export type SolarModules = {
  [key: string]: SolarModuleCharacteristics
}

export type SelectedSolarModules = {
  [key: string]: SolarModuleCharacteristics & {
    count: number
  }
}

export type ModulesState = {
  allModules: SolarModules | null
  selectedModules: SelectedSolarModules
  status: 'idle' | 'loading' | 'failed'
}

const initialState: ModulesState = {
  allModules: null,
  selectedModules: {},
  status: 'loading',
}

export const getModules = createAsyncThunk(
  'modules/fetchModules',
  async () => await fetchModules()
)

export const modulesSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    addToList: (state, action: PayloadAction<SelectedSolarModules>) => {
      const [name, moduleProps] = Object.entries(action.payload)[0]
      state.selectedModules[name] = moduleProps
    },
    removeFromList: (state, action: PayloadAction<string>) => {
      delete state.selectedModules[action.payload]
    },
    increaseModuleAmount: (
      state,
      action: PayloadAction<{ name: string; price: number; quantity: number }>
    ) => {
      const { name, price, quantity } = action.payload
      if (state.selectedModules[name]) {
        state.selectedModules[name].count++
      } else {
        state.selectedModules[name] = {
          count: 1,
          price,
          quantity,
        }
      }
    },
    decreaseModuleAmount: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload
      if (state.selectedModules[name].count === 1) {
        delete state.selectedModules[name]
      } else {
        state.selectedModules[name].count--
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getModules.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getModules.fulfilled, (state, action) => {
        state.status = 'idle'
        state.allModules = action.payload
      })
      .addCase(getModules.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const {
  addToList,
  increaseModuleAmount,
  decreaseModuleAmount,
  removeFromList,
} = modulesSlice.actions

export default modulesSlice.reducer
