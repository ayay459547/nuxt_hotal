<template>
  <b-form-group
    :id="inputKey"
    :label="label"
    :label-for="inputKey"
    :description="description"
  >
    <b-form-input
      :id="inputKey"
      v-model="tempValue"
      :type="type"
      :placeholder="defaultPlaceholder"
      :required="required"
    ></b-form-input>
  </b-form-group>
</template>

<script>
export default {
  name: 'CForm',
  props: {
    inputKey: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  computed: {
    tempValue: {
      set (v) {
        this.$emit('input', v)
      },
      get () {
        return this.value
      }
    },
    defaultPlaceholder () {
      if (this.placeholder === '') {
        return `輸入${this.label}`
      } else {
        return this.placeholder
      }
    }
  }
}
</script>