<template>
  <div class="TextInput">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      class="p-1 border-1 rounded-sm text-black placeholder-black"
    />
    <slot />
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    buttonText: {
      type: String,
      default: "Search"
    },
    placeholder: {
      type: String,
      default: "Enter D&D keyword"
    },
    modelValue: {
      type: String,
      default: ""
    }
  }
};
</script>
