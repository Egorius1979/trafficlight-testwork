<template>
  <div class="home">
    <table class="table">
      <tr>
        <th
          v-for="column in tabColumns"
          :key="column"
          @click="sortByClick(column)"
        >
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
      <tr v-for="member in members" :key="member.id">
        <td :aria-label="tabColumns[0]">{{ member.id }}</td>
        <td :aria-label="tabColumns[1]">{{ member.login }}</td>
        <td :aria-label="tabColumns[2]">{{ member.confirmedOrder }}</td>
        <td :aria-label="tabColumns[3]">{{ member.rank }}</td>
      </tr>
    </table>
    <filters
      @filter-members="filterMembers"
      @initial-value="setInitialState"
      :field="field"
      :filteredFieldCounter="filteredFieldCounter"
    />
  </div>
</template>

<script>
import Filters from '@/components/Filters';
export default {
  name: 'Table',
  components: { Filters },
  data() {
    return {
      tabColumns: ['Место', 'Логин', 'Подтвержденные заказы', 'Статус'],
      isInitialFromFiltered: false,
      members: this.$store.state.members,
      field: 'Место',
      filteredFieldCounter: 1,
    };
  },
  mounted() {
    if (this.$route.name === 'Filtered') {
      this.isInitialFromFiltered = true;
      this.$store.commit('SET_FILTERS', {
        login: this.$route.query.login,
        from: !+this.$route.query.from ? null : +this.$route.query.from,
        to: !+this.$route.query.to ? null : +this.$route.query.to,
        rank: this.$route.query.rank,
      });
      this.filterMembers();
    }
  },
  computed: {
    login() {
      return this.$store.state.login;
    },
    from() {
      return this.$store.state.from;
    },
    to() {
      return this.$store.state.to;
    },
    rank() {
      return this.$store.state.rank;
    },
  },
  methods: {
    setInitialState() {
      this.field = 'Место';
      this.filteredFieldCounter = 1;
      this.members = this.$store.state.members;
    },
    filterMembers() {
      this.members = this.$store.state.members
        .filter((member) => member.login.includes(this.login.toLowerCase()))
        .filter((member) => {
          if (!this.from && !this.to) {
            return member;
          }
          if (!this.to) {
            return member.confirmedOrder >= this.from;
          }
          return (
            member.confirmedOrder >= this.from &&
            member.confirmedOrder <= this.to
          );
        })
        .filter((member) =>
          member.rank.toLowerCase().includes(this.rank.toLowerCase())
        );
      if (this.isInitialFromFiltered) {
        this.field = this.$route.query.field;
      }
      this.sorting(this.field);
      this.push();
    },
    sortByClick(column) {
      if (this.field === column) {
        this.filteredFieldCounter += 1;
        return this.reverseArray();
      }
      this.field = column;
      this.filteredFieldCounter = 1;
      this.sorting(column);
    },
    sorting(column) {
      if (this.isInitialFromFiltered) {
        this.filteredFieldCounter = +this.$route.query.filteredFieldCounter;
      }

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
      typeof this.members[0][key] === 'string'
        ? this.members.sort((a, b) => a[key].localeCompare(b[key]))
        : this.members.sort((a, b) => a[key] - b[key]);

      if (!(this.filteredFieldCounter % 2)) {
        this.reverseArray();
      }
      if (this.isInitialFromFiltered) {
        this.isInitialFromFiltered = false;
      }
      this.push();
    },
    reverseArray() {
      this.push();
      return this.members.reverse();
    },
    push() {
      this.$router
        .push({
          name: 'Filtered',
          query: {
            login: this.login,
            from: `${this.from}`,
            to: `${this.to}`,
            rank: this.rank,
            field: this.field,
            filteredFieldCounter: this.filteredFieldCounter,
          },
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .flex {
    @extend .home;
    flex-direction: row;
  }
}
table {
  margin: 0px auto 100px;
  border: 1px solid gray;
  border-collapse: collapse;
  padding: 10px 20px;
  td {
    @extend table;
    margin: 0;
  }
  th {
    @extend table;
    cursor: pointer;
    user-select: none;
    background: #efefef;
  }
}

@media screen and (max-width: 700px) {
  table tr {
    display: block;
    border-bottom: 2px solid #e8e9eb;
  }
  table td {
    border: none;
    display: block;
    text-align: right;
  }
  table td:before {
    content: attr(aria-label);
    float: left;
    font-weight: bold;
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
</style>
