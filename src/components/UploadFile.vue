<template>
  <div
    class="drop-file"
    :class="{
      'drop-file': true,
      'is-loading': isSaving,
      'is-dragging': isDragging
    }"
    aria-live="polite"
    @click="selectFile"
    @drag.prevent=""
    @dragstart.prevent="isDragging = true"
    @dragend.prevent="isDragging = false"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @dragenter.prevent="isDragging = true"
    @drop.prevent="isDragging = false; onFileChange($event, true)"
  >
    <label :for="name" class="sr-only">{{ label }}</label>
    <input
      :id="name"
      ref="input"
      type="file"
      v-bind="$attrs"
      :name="name"
      :accept="accept"
      class="sr-only"
      @change="onFileChange($event, false)"
    >
    <div v-if="!selectedFile && !uploadedFile" class="no-file">
      <font-awesome-icon icon="fa-regular fa-file-arrow-up" />
      Adjunta
    </div>
    <div v-else class="has-file">
      <div v-if="isSaving">
        <font-awesome-icon icon="fa-regular fa-spinner-third" spin />
        Desant...
      </div>
      <div v-else-if="!errors" class="success">
        <font-awesome-icon icon="fa-regular fa-circle-check" />
        Adjuntat
      </div>
      <div v-else>
        <font-awesome-icon icon="fa-regular fa-circle-x-mark" />
        Error
      </div>
    </div>
  </div>
</template>

<script>
import API from '../api.js'

export default {
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    accept: {
      type: String,
      default: 'image/*,application/pdf'
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedFile: null,
      uploadedFile: null,
      errors: null,
      isSaving: false,
      isDragging: false
    }
  },
  mounted () {
    this.uploadedFile = this.value
  },
  methods: {
    onFileChange (e, dragged) {
      this.errors = null
      this.selectedFile = dragged ? e.dataTransfer.files[0] : e.target.files[0]
      this.isSaving = true
      const formData = new FormData()
      formData.append('file', this.selectedFile, this.selectedFile.name)
      console.log('uploading', formData)
      API.uploadFile('expenses', formData)
        .then((response) => {
          this.uploadedFile = response.file
          this.$emit('update:modelValue', response.file)
        }).catch((resp) => {
          this.errors = resp.errors
          this.selectedFile = null
        }).then(() => {
          this.isSaving = false
        })
    },
    selectFile () {
      this.$refs.input.click()
    }
  }
}
</script>

<style lang="scss" scoped>
.drop-file {
  font-size: .85rem;
  text-align: center;
  border-radius: .25rem;
  padding: .25rem;
  border: 1px var(--gray-200) solid;
  cursor: pointer;

  &:hover {
    background: var(--gray-50);
  }

  .success {
    color: var(--green);

    a {
      color: var(--green);
    }

    .fa-circle-check {
      margin-right: .25rem;
    }
  }
}
</style>