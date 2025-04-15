import { create } from 'zustand'

const useStore = create((set) => ({
    loggedUser: null,
    updateLoggedUser: (loggedUser) => set({ loggedUser }),
}))

export default useStore