<script setup>
import { reactive, ref } from 'vue'
import API from './api.js'
import FormHeader from './components/FormHeader.vue'
import ExpenseForm from './components/ExpenseForm.vue'
import ExpenseAdvisor from './components/ExpenseAdvisor.vue'

const form = reactive({
  entity: 'Compromís',
  name: '',
  DNI: '',
  address: '',
  municipality: '',
  email: '',
  phone: '',
  as: '',
  reason: '',
  where: '',
  days: 1,
  date: '',
  expenses: [],
  IBAN: ''
})

const submitting = ref(false)
const submitted = ref(false)
const submit = async () => {
  submitting.value = true
  try {
    const response = await API.submit(form)
    submitted.value = response
  } catch (error) {
    alert('S\'ha produit un error enviant el full de liquidació. Torna a intentar-ho més tard o contacta amb finances@compromis.net')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="container">
    <form-header />

    <div v-if="submitted">
      <b-card>
        <b-card-section>
          <h2 class="mb-4 text-3xl">Rebut!</h2>
          <p class="text-lg">
            Hem rebut el teu full de liquidació correctament. El Departament de Finances t'ingresarà al teu compte
            el més eviat possible.
          </p>
          <p class="text-lg">
            Si tens cap dubte, pots contactar amb <a href="mailto:finances@compromis.net">finances@compromis.net</a>.
          </p>
          <p>
            <a :href="`https://compromis.net/espai/expenses/tracking/${submitted.id}/${submitted.expense.ref}`" target="_blank">Seguiment del pagament</a>
          </p>
          <b-button outline href="/">Presentar altra fulla de liquidació</b-button>
        </b-card-section>
      </b-card>
    </div>
    <form v-else @submit.prevent="submit">
      <b-input-group>
        <b-select
          variant="float"
          label="Entitat"
          name="entity"
          span="4"
          v-model="form.entity"
          required
        >
          <option>Eleccions Autonòmiques 2023</option>
          <option>Eleccions Municipals 2023</option>
          <option>Compromís</option>
          <option>Més</option>
          <option>Iniciativa</option>
          <option>VerdsEquo</option>
          <option>Corts</option>
          <option>Congrés</option>
          <option>Senat</option>
          <option>Diputació de València</option>
          <option>Diputació de Castelló</option>
          <option>Diputació de Alacant</option>
        </b-select>
      </b-input-group>
      
      <b-input-group title="Dades personals" class="mt-5">
        <b-input
          variant="float"
          label="Nom i cognoms"
          name="name"
          span="2"
          v-model="form.name"
          required
        />
        <b-input
          variant="float"
          label="DNI/NIE"
          name="last_name"
          span="1"
          v-model="form.DNI"
          required
        />
        <b-input
          variant="float"
          label="Domicili"
          name="address"
          span="2"
          v-model="form.address"
          required
        />
        <b-input
          variant="float"
          label="Població"
          name="municipality"
          span="1"
          v-model="form.municipality"
          required
        />
        <b-input
          type="email"
          variant="float"
          label="E-mail"
          name="email"
          span="2"
          v-model="form.email"
          required
        />
        <b-input
          type="tel"
          variant="float"
          label="Mòbil"
          name="phone"
          span="1"
          v-model="form.phone"
          required
        />
      </b-input-group>

      <b-input-group title="Dades del viatge" class="mt-5">
        <b-input
          variant="float"
          label="Anava en qualitat de..."
          name="name"
          span="3"
          v-model="form.as"
          required
        />
        <b-input
          variant="float"
          label="Motiu de la participació"
          name="last_name"
          span="3"
          v-model="form.reason"
          required
        />
        <b-input
          variant="float"
          label="Lloc"
          name="address"
          span="1"
          v-model="form.where"
          required
        />
        <b-input
          variant="float"
          type="date"
          label="Data"
          name="date"
          span="1"
          label-on-top
          v-model="form.date"
          required
        />
        <b-input
          variant="float"
          type="number"
          label="Dies"
          name="days"
          span="1"
          v-model="form.days"
          min="1"
          step="1"
          required
        />
      </b-input-group>

      <expense-form v-model="form.expenses" class="mt-5" />
      <expense-advisor :expenses="form.expenses" :days="form.days" />

      <b-input-group title="Compte on ingresar" class="mt-5">
        <b-input
          variant="float"
          label="IBAN"
          name="IBAN"
          span="4"
          v-model="form.IBAN"
          required
        />
      </b-input-group>

      <b-button variant="primary" size="xl" shadow type="submit" class="mt-5" :disabled="submitting">
        <span v-if="submitting">
          <font-awesome-icon icon="fa-regular fa-spinner-third" spin />
          Enviant
        </span>
        <span v-else>
          Envia formulari
        </span>
      </b-button>
    </form>
    <b-footer class="expense-footer" />
  </main>
</template>

<style lang="scss">
:root {
  --green: #7fc347;
  --red: #ef404d;
}

.container {
  max-width: 1100px;
}

.input-card .card-content {
  grid-template-columns: 1.5fr 1fr 1fr;
}

.field-input {
  font-size: 1.25rem;
  border: 0;
  padding: 0;
}

.expense-footer {
  margin-top: 3rem;
}
</style>
