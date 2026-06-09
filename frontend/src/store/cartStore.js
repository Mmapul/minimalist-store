import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],

  addToCart: (product) => {
    const exists = get().cartItems.find(item => item._id === product._id)
    let updatedCart
    if (exists) {
      updatedCart = get().cartItems.map(item =>
        item._id === product._id ? { ...item, qty: item.qty + 1 } : item
      )
    } else {
      updatedCart = [...get().cartItems, { ...product, qty: 1 }]
    }
    localStorage.setItem('cartItems', JSON.stringify(updatedCart))
    set({ cartItems: updatedCart })
  },

  removeFromCart: (id) => {
    const updatedCart = get().cartItems.filter(item => item._id !== id)
    localStorage.setItem('cartItems', JSON.stringify(updatedCart))
    set({ cartItems: updatedCart })
  },

  clearCart: () => {
    localStorage.removeItem('cartItems')
    set({ cartItems: [] })
  },

  getTotal: () => {
    return get().cartItems.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2)
  }
}))

export default useCartStore 
