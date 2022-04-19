<template>
  <div class="filter">
    <div>
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
        <select v-model="rank">
          <option v-for="rank in ranksArray" :key="rank">
            {{ rank }}
          </option>
        </select>
      </label>
    </div>
    <div class="flex">
      <button @click="$emit('filter-members', login, from, to, rank)">
        применить
      </button>
      <router-link
        class="url"
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
      ranksArray: this.$store.state.members.reduce(
        (acc, member) =>
          acc.find((it) => it === member.rank) ? acc : [...acc, member.rank],
        []
      ),
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
  text-align: start;
  @media screen and (max-width: 400px) {
    width: 90%;
  }
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
    @media screen and (max-width: 400px) {
      width: 100%;
    }
  }
  select {
    @extend input;
    width: 100%;
    display: block;
    background: #fff;
  }
}

.amount input {
  width: 60px;
  @media screen and (max-width: 400px) {
    width: 50%;
  }
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 400px) {
    flex-direction: column;
  }
}

button {
  font-size: 18px;
  padding: 5px 15px;
  background: #778899;
  border: 1px solid black;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
  &:active {
    background: #000;
  }
  @media screen and (max-width: 400px) {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
