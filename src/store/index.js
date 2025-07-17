import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editor: undefined,
    area: undefined,
    typeDef: {},
    functionDef: {},
    controlDef: {}
  },
  getters: {
    editor(state) {
      return state.editor
    },
    area(state) {
      return state.area
    },
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
    overrideEditor(state, payload) {
      state.editor = payload
    },
    overrideArea(state, payload) {
      state.area = payload
    },
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
