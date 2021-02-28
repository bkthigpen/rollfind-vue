<template>
  <input
    type="text"
    :value="modelValue"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', $event.target.value)"
    class="TextInput"
  />
</template>

<script>
export default {
  name: "TextInput",
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "Kolbold, Fire, Wizards"
    }
  },
  emits: ["modelValue"]
};
</script>
