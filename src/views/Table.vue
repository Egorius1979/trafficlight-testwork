<template>
  <div class="home">
    <table>
      <tr>
        <th v-for="column in tabColumns" :key="column" @click="sorting(column)">
          <div class="flex">
            <span
              class="arrow"
              :class="[
                field !== column ? 'arrow-none' : '',
                filteredFieldCounter % 2 ? 'arrow-bottom' : 'arrow-top',
              ]"
            ></span>
            <span>{{ column }}</span>
          </div>
        </th>
      </tr>
      <tr v-for="member in members || fullMembersArray" :key="member.id">
        <td>{{ member.id }}</td>
        <td>{{ member.login }}</td>
        <td>{{ member.confirmedOrder }}</td>
        <td>{{ member.rank }}</td>
      </tr>
    </table>
    {{ filteredFieldCounter }}
    <filters @filter-members="filterMembers" @initial-value="setInitialState" />
  </div>
</template>

<script>
import Filters from '@/views/Filters';
export default {
  name: 'Table',
  components: { Filters },
  data() {
    return {
      tabColumns: ['Место', 'Логин', 'Подтвержденные заказы', 'Статус'],
      fullMembersArray: this.$store.state.members,
      members: null,
      field: 'Место',
      filteredFieldCounter: 1,
      isFiltered: false,
    };
  },
  mounted() {
    if (this.$route.name !== 'Home') {
      this.$router.push({ name: 'Home' });
    }
  },
  methods: {
    filterMembers(login, from, to, rank) {
      this.members = this.fullMembersArray
        .filter((member) => member.login.includes(login.toLowerCase()))
        .filter((member) => {
          if (!from && !to) {
            return member;
          }
          if (!to) {
            return member.confirmedOrder >= from;
          }
          return member.confirmedOrder >= from && member.confirmedOrder <= to;
        })
        .filter((member) =>
          member.rank.toLowerCase().includes(rank.toLowerCase())
        );
      this.isFiltered = true;
    },
    setInitialState() {
      this.isFiltered = false;
      this.field = 'Место';
      this.filteredFieldCounter = 1;
      this.members = null;
      this.$store.commit('SET_INITIAL_ARRAY');
    },
    sorting(column) {
      if (this.field === column) {
        this.filteredFieldCounter += 1;
        if (this.isFiltered) {
          this.members.reverse();
        }
        return this.$store.commit('REVERSE');
      }

      this.field = column;
      this.filteredFieldCounter = 1;
      if (column === 'Логин') {
        return this.sorting1('login');
      }
      if (column === 'Место') {
        return this.sorting1('id');
      }
      if (column === 'Статус') {
        return this.sorting1('rank');
      }
      return this.sorting1('confirmedOrder');
    },
    sorting1(key) {
      if (this.isFiltered) {
        typeof this.members[0][key] === 'string'
          ? this.members.sort((a, b) => a[key].localeCompare(b[key]))
          : this.members.sort((a, b) => a[key] - b[key]);
      }
      this.$store.commit('SORTING', key);
      console.log('table sorting: ', this.members);
    },
  },
  watch: {
    $route() {
      if (this.$route.name === 'Filtered') {
        this.filterMembers(
          this.$route.query.login,
          !+this.$route.query.from ? 0 : +this.$route.query.from,
          !+this.$route.query.to ? 0 : +this.$route.query.to,
          this.$route.query.rank
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
table,
td {
  margin: auto;
  border: 1px solid black;
  border-collapse: collapse;
  padding: 5px;
  th {
    @extend table;
    cursor: pointer;
    user-select: none;
  }
}

.arrow {
  border: 6px solid transparent;
  margin-right: 3px;

  &-top {
    border-top-color: black;
    border-bottom: 0;
  }

  &-bottom {
    border-bottom-color: black;
    border-top: 0;
  }

  &-none {
    visibility: hidden;
  }
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
