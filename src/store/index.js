import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    members: [
      {
        id: 1,
        login: 'smith@gmail.com',
        confirmedOrder: 312,
        rank: 'Ценитель красоты',
      },
      {
        id: 2,
        login: 'lenin@gmail.com',
        confirmedOrder: 120,
        rank: 'Поставщик аксессуаров',
      },
      {
        id: 3,
        login: 'mask@gmail.com',
        confirmedOrder: 98,
        rank: 'Конкурент минздрава',
      },
      { id: 4, login: 'dog@mail.ru', confirmedOrder: 64, rank: 'рыбак' },
      {
        id: 5,
        login: 'nightmare@mail.ru',
        confirmedOrder: 34,
        rank: 'охотник',
      },
      {
        id: 6,
        login: 'cat@mail.ru',
        confirmedOrder: 1,
        rank: 'Ценитель красоты',
      },
    ],
  },
  mutations: {
    SORTING(state, key) {
      typeof state.members[0][key] === 'string'
        ? state.members.sort((a, b) => a[key].localeCompare(b[key]))
        : state.members.sort((a, b) => a[key] - b[key]);
    },
    REVERSE(state) {
      return state.members.reverse();
    },
    SET_INITIAL_ARRAY(state) {
      return state.members.sort((a, b) => a.id - b.id);
    },
  },
  actions: {},
  modules: {},
});
