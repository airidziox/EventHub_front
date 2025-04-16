import { create } from 'zustand'

const useStore = create((set) => ({
    loggedUser: null,
    events: [],
    updateLoggedUser: (loggedUser) => set({ loggedUser }),
    updateEvents: (events) => set({ events }),
}))

export default useStore