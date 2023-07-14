import { createStore } from 'vuex'

const store = createStore({
  state: {
    eventId: null,
    userId: null
  },
  mutations: {
    setEventId(state, eventId) {
      state.eventId = eventId;
    },
    setUserId(state, userId) {
      state.userId = userId;
    }
  }
})

export default store
