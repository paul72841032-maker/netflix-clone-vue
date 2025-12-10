// src/firebase.ts
import { initializeApp, type FirebaseOptions } from 'firebase/app'
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'

const firebaseConfig: FirebaseOptions = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,              // ← 환경변수로 변경
    authDomain: 'netflix-clone-64140.firebaseapp.com',
    projectId: 'netflix-clone-64140',
    storageBucket: 'netflix-clone-64140.firebasestorage.app',
    messagingSenderId: '832824402998',
    appId: '1:832824402998:web:ee431de6cd958bf263a497',
    measurementId: 'G-JPEQSW15NX',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence).catch(() => {})
