<template>
  <div v-for="(card, i) in cards" :key="i" class="LoaderSkeleton">
    <div class="LoaderSkeleton__card">
      <div class="LoaderSkeleton__pseudo-text" />
    </div>
  </div>
</template>

<script>
export default {
  name: "LoaderSkeleton",
  props: {
    cards: {
      type: Number,
      default: 3,
      required: false
    }
  }
};
</script>
