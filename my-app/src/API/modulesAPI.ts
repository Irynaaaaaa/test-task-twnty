import { SolarModules } from '../redux/slices/modulesSlice'

const url = 'https://testtask.twnty.de/'

export const fetchModules = (): Promise<SolarModules> => {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json() as Promise<SolarModules>
  })
}
