import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    typeDef: {},
    functionDef: {},
    controlDef: {}
  },
  getters: {
    typeDef(state) {
      return state.typeDef
    },
    findTypeDef: (state) => (qualifiedName) => {
      return state.typeDef[qualifiedName]
    },
    functionDef(state) {
      return state.functionDef
    },
    findFunctionDef: (state) => (qualifiedName) => {
      return state.functionDef[qualifiedName]
    },
    controlDef(state) {
      return state.controlDef
    },
    findControlDef: (state) => (qualifiedName) => {
      return state.controlDef[qualifiedName]
    },
  },
  mutations: {
    overrideTypeDef(state, payload) {
      state.typeDef = payload
    },
    overrideFunctionDef(state, payload) {
      state.functionDef = payload
    },
    overrideControlDef(state, payload) {
      state.controlDef = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
