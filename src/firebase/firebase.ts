import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseConfig } from './keys';


firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;