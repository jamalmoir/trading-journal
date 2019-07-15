import { FireBaseConfig as devConfig} from './dev';
import { FireBaseConfig as prodConfig} from './dev'; // TODO: prod config

export const FireBaseConfig = process.env.NODE_ENV === "production" ? prodConfig : devConfig