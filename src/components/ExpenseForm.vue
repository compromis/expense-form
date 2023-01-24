<script setup>
import { computed } from 'vue'
import BInputGroup from '@compromis/blobby/components/inputs/BInputGroup.vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const expenses = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

const types = {
  BUS: { text: 'Autobús', tip: 'Classe turista' },
  TRAIN: { text: 'Tren', tip: 'Classe turista' },
  URBANBUS: { text: 'Bus urbà', tip: 'Suma màxima de bus, metro, taxi i aparcament: 8€/dia', urban_transport: true },
  METRO: { text: 'Metro', tip: 'Suma màxima de bus, metro, taxi i aparcament: 8€/dia', is_vehicle: false, urban_transport: true },
  TAXI: { text: 'Taxi', tip: 'Suma màxima de bus, metro, taxi i aparcament: 8€/dia', is_vehicle: false, urban_transport: true },
  PARKING: { text: 'Aparcament', tip: 'Suma màxima de bus, metro, taxi i aparcament: 8€/dia', is_vehicle: false, urban_transport: true },
  HIGHWAY: { text: 'Peatge autopista', tip: 'Màxim 8€/dia' },
  CAR: { text: 'Vehicle particular', tip: 'Preu a 0,19€/km', per_km: 0.19, is_vehicle: true },
  BREAKFAST: { text: 'Desdejuni', tip: 'Màxim 3€/persona/dia', requires_people: true },
  LUNCH: { text: 'Dinar', tip: 'Màxim 10€/persona/dia', requires_people: true },
  DINNER: { text: 'Sopar', tip: 'Màxim 12€/persona/dia', requires_people: true },
  LODGING: { text: 'Allotjament', requires_people: true },
}

const addExpense = () => {
  expenses.value.push({ id: uniqueId(), type: null, price: 0, people: 0, kms: 0 })
}

const deleteExpense = (id) => {
  const expenseIndex = expenses.value.findIndex(expense => expense.id === id)
  return expenseIndex > -1 && expenses.value.splice(expenseIndex, 1)
}

const uniqueId = () => Math.random().toString(36).substr(2, 9)
</script>

<template>
  <b-input-group title="Despeses">
    <div v-for="expense in expenses" :key="expense.id" class="expense span-4">
      <select v-model="expense.type">
        <option disabled selected>Tipus de despesa</option>
        <option v-for="(type, id) in types" :key="id" :value="type">
          {{ type.text  }}
        </option>
      </select>
      <div v-if="expense.type?.requires_people">
        <input type="number" min="1" v-model="expense.people" />
      </div>
      <input type="number" min="0.00" max="10000.00" step="0.01" v-model="expense.price" />
      <span v-if="expense.type?.tip">{{ expense.type.tip }}</span>

      <div v-if="expense.type?.is_vehicle">
        <input type="number" min="1" v-model="expense.kms" />
        Model Matricula Trajecte
      </div>

      <button @click="deleteExpense(expense.id)">X</button>
    </div>
    <button @click="addExpense" type="button">Afegir</button>
  </b-input-group>
</template>

<style lang="scss">
.expense {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
</style>