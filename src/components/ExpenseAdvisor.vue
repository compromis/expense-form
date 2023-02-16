<script setup>
import { computed } from 'vue'
import { types } from '../helpers/types.js'

const props = defineProps({
  expenses: {
    type: Array,
    required: true
  },
  days: {
    type: [Number, String],
    required: true
  }
})

const publicTransportLimitSurpassed = computed(() => {
  const expenses = props.expenses.filter(expense => ['URBANBUS', 'METRO', 'TAXI', 'PARKING'].includes(expense.type?.ref))
  const sum = expenses.reduce((sum, li) => sum + li.amount, 0)
  return sum / props.days > 8
})

const tollLimitSurpassed = computed(() => {
  const expenses = props.expenses.filter(expense => ['TOLL'].includes(expense.type?.ref))
  const sum = expenses.reduce((sum, li) => sum + li.amount, 0)
  return sum / props.days > 8
})

const breakfastLimitSurpassed = computed(() => {
  const expenses = props.expenses.filter(expense => ['BREAKFAST'].includes(expense.type?.ref))
  const sumCost = expenses.reduce((sum, li) => sum + li.amount, 0)
  const sumPeople = expenses.reduce((sum, li) => sum + li.people, 0)
  return sumCost / props.days / sumPeople > 3
})

const lunchLimitSurpassed = computed(() => {
  const expenses = props.expenses.filter(expense => ['LUNCH'].includes(expense.type?.ref))
  const sumCost = expenses.reduce((sum, li) => sum + li.amount, 0)
  const sumPeople = expenses.reduce((sum, li) => sum + li.people, 0)
  return sumCost / props.days / sumPeople > 10
})

const dinnerLimitSurpassed = computed(() => {
  const expenses = props.expenses.filter(expense => ['DINNER'].includes(expense.type?.ref))
  const sumCost = expenses.reduce((sum, li) => sum + li.amount, 0)
  const sumPeople = expenses.reduce((sum, li) => sum + li.people, 0)
  return sumCost / props.days / sumPeople > 12
})
</script>

<template>
  <div class="alert alert-warning" v-if="publicTransportLimitSurpassed">
    <font-awesome-icon icon="fa-sharp fa-regular fa-circle-exclamation" />
    La suma de bus, metro, taxi i aparcament supera els 8€/dia
  </div>
  <div class="alert alert-warning" v-if="tollLimitSurpassed">
    <font-awesome-icon icon="fa-sharp fa-regular fa-circle-exclamation" />
    L'import de peatge supera els 8€/dia
  </div>
  <div class="alert alert-warning" v-if="breakfastLimitSurpassed">
    <font-awesome-icon icon="fa-sharp fa-regular fa-circle-exclamation" />
    L'import de desdejuni supera els 3€/persona/dia
  </div>
  <div class="alert alert-warning" v-if="lunchLimitSurpassed">
    <font-awesome-icon icon="fa-sharp fa-regular fa-circle-exclamation" />
    L'import de dinar supera els 10€/persona/dia
  </div>
  <div class="alert alert-warning" v-if="dinnerLimitSurpassed">
    <font-awesome-icon icon="fa-sharp fa-regular fa-circle-exclamation" />
    L'import de sopar supera els 12€/persona/dia
  </div>
</template>

<style lang="scss" scoped>
.alert {
  background: var(--yellow);
  border-radius: .5rem;
  padding: .5rem .75rem;
  margin-top: 1rem;
  font-weight: bold;
}
</style>