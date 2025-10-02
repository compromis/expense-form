<script setup>
import { computed } from 'vue'
import { formatCurrency } from '../helpers/format.js'
import { types } from '../helpers/types.js'
import UploadFile from './UploadFile.vue'
import CurrencyInput from './CurrencyInput.vue'

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

const addExpense = () => {
  expenses.value.push({ id: uniqueId(), type: null, amount: 0, people: 1, kms: 0, receipt: null })
}

const deleteExpense = (id) => {
  const expenseIndex = expenses.value.findIndex(expense => expense.id === id)
  return expenseIndex > -1 && expenses.value.splice(expenseIndex, 1)
}

const uniqueId = () => Math.random().toString(36).substr(2, 9)

const updateKms = (expense, e) => {
  expense.kms = e.target.value
  expense.amount = expense.type.per_km * expense.kms
}

const totalExpenses = computed(() => expenses.value.reduce((sum, li) => sum + li.amount, 0))
</script>

<template>
  <b-input-group title="Despeses">
    <div class="alert alert-warning" role="alert">
      No es pagarà cap despesa sense que adjunteu un suport documental: tiquet, factura, bitllet...
    </div>
    <table class="table expenses span-4">
      <thead>
        <tr>
          <th>Tipus de despesa</th>
          <th width="100" class="text-right">Persones</th>
          <th width="120" class="text-right">Import</th>
          <th width="100">Justificant</th>
          <th width="250">Notes</th>
          <th width="40"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="expense in expenses" :key="expense.id" class="expense">
          <td>
            <div class="expense-select">
              <select v-model="expense.type" required>
                <option disabled :value="null">Tipus de despesa</option>
                <option v-for="(type, id) in types" :key="id" :value="type">
                  {{ type.text  }}
                </option>
              </select>
              <font-awesome-icon icon="fa-regular fa-chevron-down" />
            </div>
            <div class="expense-vehicle" v-if="expense.type?.is_vehicle">
              <div class="field">
                <label :for="`expense-${expense.id}-model`">Model</label>
                <input :id="`expense-${expense.id}-model`" type="text" v-model="expense.model" />
              </div>
              <div class="field">
                <label :for="`expense-${expense.id}-registration`">Matrícula</label>
                <input :id="`expense-${expense.id}-registration`" type="text" v-model="expense.registration" />
              </div>
              <div class="field">
                <label :for="`expense-${expense.id}-route`">Trajecte</label>
                <input :id="`expense-${expense.id}-route`" type="text" v-model="expense.route" />
              </div>
            </div>
          </td>
          <td class="expense-people">
            <div>
              <label class="visually-hidden">Persones</label>
              <input type="number" min="1" class="text-right" v-model="expense.people" :disabled="!expense.type" />
              <font-awesome-icon icon="fa-regular fa-user" />
            </div>
          </td>
          <td class="expense-amount">
            <div v-if="expense.type?.is_vehicle" class="expense-amount-kms">
              <label>
                <input type="number" min="1" :value="expense.kms" @input="(e) => updateKms(expense, e)" />
                <span>kms</span>
              </label>
              <div class="expense-amount-kms-conversion">
                {{ formatCurrency(expense.kms * expense.type.per_km) }}
              </div>
            </div>
            <div v-else class="expense-amount-currency">
              <CurrencyInput v-model="expense.amount" :options="{ currency: 'EUR', locale: 'es-ES', precision: 2 }" required :disabled="!expense.type" />
            </div>
          </td>
          <td class="expense-receipt">
            <upload-file v-model="expense.receipt" :name="`file-${expense.id}`" label="Arxiu" />
          </td>
          <td class="expense-extra">
            <div class="expense-tip" v-if="expense.type?.tip">{{ expense.type.tip }}</div>
          </td>
          <td class="expense-delete">
            <button @click="deleteExpense(expense.id)" title="Esborra">
              <font-awesome-icon icon="fa-regular fa-times" />
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="expenses-total">
          <th colspan="2">Total</th>
          <th class="text-right" style="color: var(--green);">{{ formatCurrency(totalExpenses) }}</th>
          <th colspan="3" style="font-size: .85rem">* Després de la revisió el import es pot reduir si has superat algún limit de despesa o no adjuntes justificant corresponent</th>
        </tr>
      </tfoot>
    </table>
    <button @click="addExpense" class="add-expense span-4" type="button">
      <font-awesome-icon icon="fa-regular fa-plus" />
      Afegiex una despesa
    </button>
  </b-input-group>
</template>

<style lang="scss">
.expenses {
  --expense-padding: 1rem;

  th {
    padding: 1rem;
    color: var(--text-muted);
    font-weight: 500;
    background: var(--white);
  }

  td {
    background: var(--white);
    padding: 0;
    border-right: 1px var(--gray-100) solid;
  }

  &-total {
    th {
      font-weight: bold;
      border-top: 1px var(--gray-200) solid;
    }
  }
}

.expense {
  &-select {
    position: relative;

    svg {
      position: absolute;
      top: 50%;
      right: var(--expense-padding);
      transform: translateY(-50%);
      pointer-events: none;
    }
  }

  &-people {
    & > div {
      position: relative;

      .fa-user {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: var(--expense-padding);
        pointer-events: none;
        color: var(--text-muted);
      }
    }

    .no-people {
      padding: var(--expense-padding);
      color: var(--text-muted);
    }
  }

  &-amount-kms {
    label {
      display: flex;
      font-size: .85rem;
      color: var(--text-muted);
      align-items: center;

      &:hover {
        background: var(--gray-50);
      }

      &:focus-within {
        background: var(--gray-100);
      }

      span {
        padding: 0 var(--expense-padding) 0 .25rem;
      }

      input {
        font-size: 1rem;
        text-align: right;
        padding-right: 0;
      }
    }

    &-conversion {
      border-top: 1px var(--gray-100) solid;
      padding: var(--expense-padding);
      text-align: right;
    }
  }

  &-receipt {
    padding: calc(var(--expense-padding) / 2) !important;
    vertical-align: middle !important;

    :deep(.button) {
      border-width: 1px;
    }
  }

  &-tip {
    padding: var(--expense-padding);
    font-size: .85rem;
    color: var(--text-muted);
  }

  &-vehicle {
    border-top: 1px var(--gray-100) solid;

    .field {
      color: var(--text-muted);

      &:not(:first-child) {
        border-top: 1px var(--gray-200) dashed;
      }

      label {
        font-size: .85rem;
        padding: .25rem var(--expense-padding);
        padding-bottom: 0;
        display: block;
      }

      &:hover {
        background: var(--gray-50);
      }

      &:focus-within {
        background: var(--gray-100);
      }

      input {
        background: transparent;
        padding: .25rem var(--expense-padding) .5rem;
        font-size: .95rem;
      }
    }
  }

  &-delete {
    vertical-align: middle;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      appearance: none;
      background: transparent;
      border: 0;
      width: 100%;
      height: 100%;
      padding: var(--expense-padding);
      color: var(--text-muted);
      opacity: .75;

      &:hover {
        color: var(--red);
      }
    }
  }

  input,
  select {
    padding: var(--expense-padding);
    appearance: none;
    border: 0;
    font-family: inherit;
    display: block;
    width: 100%;

    &:hover {
      background: var(--gray-50);
    }

    &:focus {
      background: var(--gray-100);
      outline: 0;
    }
  }

  .select {
    font-size: 1rem;
    padding: 1rem;

    &:focus {
      box-shadow: none !important;
    }
  }
}

.add-expense {
  display: block;
  background: var(--white);
  appearance: none;
  padding: 1rem;
  font-size: 1rem;
  color: var(--text-muted);
  border: 0;

  &:hover {
    color: var(--gray-900);
  }
}

.text-right {
  text-align: right;
}
</style>