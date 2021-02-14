<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
    class="TextInput"
  />
</template>

<script>
export default {
  name: "TextInput",
  props: {
    buttonText: {
      type: String,
      default: "Search"
    },
    inputClass: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "Kolbold, Fire, Wizards"
    },
    modelValue: {
      type: String,
      default: ""
    }
  }
};
</script>
