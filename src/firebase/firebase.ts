import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { FireBaseConfig } from './keys';


firebase.initializeApp(FireBaseConfig);
firebase.firestore();

export default firebase;