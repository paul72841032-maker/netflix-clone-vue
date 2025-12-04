// src/firebase.ts
import { initializeApp, type FirebaseOptions } from 'firebase/app'
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'
// (선택) Analytics를 쓰고 싶으면 아래 주석 해제
// import { getAnalytics, isSupported } from 'firebase/analytics'

// ✅ 콘솔에서 받은 값을 "그대로" 문자열로 넣습니다.
const firebaseConfig: FirebaseOptions = {
    apiKey: 'AIzaSyAJHjJc0F_vELao2cgQ5QPyUTUeM6rAXts',
    authDomain: 'netflix-clone-64140.firebaseapp.com',
    projectId: 'netflix-clone-64140',
    storageBucket: 'netflix-clone-64140.firebasestorage.app',
    messagingSenderId: '832824402998',
    appId: '1:832824402998:web:ee431de6cd958bf263a497',
    measurementId: 'G-JPEQSW15NX', // 있어도 되고 없어도 됩니다.
}

// ✅ Firebase 초기화 (import 문은 항상 파일 "맨 위"에 있어야 합니다)
const app = initializeApp(firebaseConfig)

// ✅ Auth 인스턴스 export
export const auth = getAuth(app)

// ✅ 로그인 상태 유지(localStorage)
setPersistence(auth, browserLocalPersistence).catch(() => {
    /* 실패해도 앱은 계속 동작하도록 무시 */
})

/* ─────────────────────────────────────────────────────────
   (선택) Analytics 사용하려면 주석 해제
   Vite 개발 환경/SSR 대비: 지원 브라우저에서만 초기화
----------------------------------------------------------------
if (typeof window !== 'undefined') {
  isSupported().then((ok) => {
    if (ok) getAnalytics(app)
  })
}
*/
