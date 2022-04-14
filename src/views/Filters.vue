<template>
  <div class="filter">
    <label>
      <span>логин:</span>
      <div><input type="text" v-model.trim="login" /></div>
    </label>

    <label>
      <span>количество:</span>
      <div class="amount flex">
        <span>от <input type="number" v-model.number="from" /></span>
        <span>до <input type="number" v-model.number="to" /></span>
      </div>
    </label>

    <label>
      <span>статус:</span>
      <div><input type="text" v-model.trim="rank" /></div>
    </label>
    <!-- <button @click="setFilters"> -->
    <div class="flex">
      <button @click="$emit('filter-members', login, from, to, rank)">
        применить
      </button>
      <router-link
        :to="{
          name: 'Filtered',
          query: {
            login: `${login}`,
            from: `${from}`,
            to: `${to}`,
            rank: `${rank}`,
          },
        }"
        >URL</router-link
      >
      <!-- <button @click="setInitialValue">очистить</button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Filtered',
  data() {
    return {
      login: '',
      from: null,
      to: null,
      rank: '',
    };
  },
  methods: {
    setInitialValue() {
      this.login = '';
      this.from = null;
      this.to = null;
      this.rank = '';
      this.$emit('initial-value', this.login, this.from, this.to, this.rank);
    },
  },
  watch: {
    $route() {
      if (this.$route.name === 'Home') {
        this.setInitialValue();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.filter {
  display: inline-block;
  text-align: start;
}

label {
  display: block;
  margin-bottom: 20px;

  span {
    display: inline-block;
    margin-bottom: 5px;
  }
  input {
    font-size: 16px;
    padding: 5px;
    outline: none;
    border: 1px solid gray;
    border-radius: 5px;
  }
}

.amount input {
  width: 70px;
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
