import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    typeDefinition: {},
    functionDefinition: {},
    controlFlowDefinition: {}
  },
  getters: {
    typeDefinition(state) {
      return state.typeDefinition
    },
    findTypeDefinition: (state) => (qualifiedName) => {
      return state.typeDefinition[qualifiedName]
    },
    functionDefinition(state) {
      return state.functionDefinition
    },
    findFunctionDefinition: (state) => (qualifiedName) => {
      return state.functionDefinition[qualifiedName]
    },
    controlFlowDefinition(state) {
      return state.controlFlowDefinition
    },
    findControlFlowDefinition: (state) => (qualifiedName) => {
      return state.controlFlowDefinition[qualifiedName]
    },
  },
  mutations: {
    overrideTypeDefinition(state, payload) {
      state.typeDefinition = payload
    },
    overrideFunctionDefinition(state, payload) {
      state.functionDefinition = payload
    },
    overrideControlFlowDefinition(state, payload) {
      state.controlFlowDefinition = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
