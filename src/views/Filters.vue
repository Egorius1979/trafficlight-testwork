<template>
  <div class="filter">
    <label>
      логин:
      <div><input type="text" v-model.trim="login" /></div>
    </label>

    <label>
      количество:
      <div class="amount">
        <span>от <input type="number" v-model.number="from" /></span>&nbsp;
        <span>до <input type="number" v-model.number="to" /></span>
      </div>
    </label>

    <label>
      статус:
      <div><input type="text" v-model.trim="rank" /></div>
    </label>
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
};
</script>

<style lang="scss" scoped>
.filter {
  display: inline-block;
  text-align: start;
}

label {
  display: block;
  margin-bottom: 10px;
  input {
    border-radius: 5px;
  }
}

.amount input {
  width: 50px;
}
</style>
