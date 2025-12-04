import { auth } from '../firebase'
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    signOut,
} from 'firebase/auth'

// 팝업이 차단될 수 있는 환경(iOS 사파리 등) 대비: redirect도 준비
const provider = new GoogleAuthProvider()

export async function loginWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider)
        const user = result.user
        localStorage.setItem('loggedIn', 'true')
        localStorage.setItem('loginId', user.email || '')
        return user
    } catch (e: any) {
        // 팝업 차단/모바일 브라우저는 redirect 시도
        if (e?.code === 'auth/popup-blocked' || e?.code === 'auth/operation-not-supported-in-this-environment') {
            await signInWithRedirect(auth, provider)
            return null
        }
        throw e
    }
}

export async function completeRedirectIfNeeded() {
    // signinWithRedirect 이후 돌아왔을 때 결과 처리
    const res = await getRedirectResult(auth)
    if (res?.user) {
        localStorage.setItem('loggedIn', 'true')
        localStorage.setItem('loginId', res.user.email || '')
        return res.user
    }
    return null
}

export async function logout() {
    await signOut(auth)
    localStorage.setItem('loggedIn', 'false')
    localStorage.removeItem('loginId')
}
