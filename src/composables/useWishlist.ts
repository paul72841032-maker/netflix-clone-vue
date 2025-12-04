export interface Movie { id: number; title: string; poster_path: string }

const KEY = 'movieWishlist'

export class WishlistManager {
    private wishlist: Movie[] = []
    constructor() {
        try { this.wishlist = JSON.parse(localStorage.getItem(KEY) || '[]') } catch { this.wishlist = [] }
    }
    get items() { return this.wishlist }
    has(id: number) { return this.wishlist.some(m => m.id === id) }
    toggleWishlist(movie: Movie) {
        const idx = this.wishlist.findIndex(m => m.id === movie.id)
        idx === -1 ? this.wishlist.push(movie) : this.wishlist.splice(idx, 1)
        this.saveWishlist()
    }
    private saveWishlist() { localStorage.setItem(KEY, JSON.stringify(this.wishlist)) }
}
