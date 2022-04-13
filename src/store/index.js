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
    // url: '',
  },
  mutations: {
    // SET_URL(state, login, from, to, rank) {
    //   state.url = `?`;
    // },
  },
  actions: {},
  modules: {},
});
