<template>
  <button class="Button">
    {{ text }}
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: {
      type: String,
      default: "Search"
    }
  }
};
</script>
