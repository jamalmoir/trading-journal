import { firebaseConfig as devConfig } from './dev'
import { firebaseConfig as prodConfig } from './dev' // TODO: prod config

export const firebaseConfig =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig
