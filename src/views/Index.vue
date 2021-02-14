<template>
  <div class="Index px-4 pt-72 pb-4 text-center">
    <h1 class="my-2">
      <span class="text-blue-100">Roll</span>
      <span class="text-yellow-400 mr-2">Find</span>
      <img class="Index__vue-logo" src="../assets/images/vue.png" />
    </h1>
    <p class="w-full text-2xl">
      Quick search of ⚔️ D&D rules, stats, details, and general info.
    </p>
    <div class="mt-4 flex">
      <TextInput v-model="search" />
      <Button @click="getSearchResults" />
    </div>
    <div class="Results mt-4">
      <p>{{ searchResults.count }} found</p>
      <div class="Results__content my-4">
        <div
          v-for="(result, index) in searchResults.results"
          :key="index"
          class="Results__content-card"
        >
          <p>Name: {{ result.name }}</p>
          <p>Hit Points: {{ result.hit_points }}</p>
          <p>Hit Dice: {{ result.hit_dice }}</p>
          <p>Strength: {{ result.strength }}</p>
          <p>Dexterity: {{ result.dexterity }}</p>
          <p>Constitution: {{ result.constitution }}</p>
          <p>Intelligence: {{ result.intelligence }}</p>
          <p>Wisom: {{ result.wisdom }}</p>
          <p>Charisma: {{ result.charisma }}</p>
          <p>Challenge Rating: {{ result.challenge_rating }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import Button from "../components/Button.vue";
import TextInput from "../components/TextInput.vue";

export default {
  name: "Index",
  components: {
    Button,
    TextInput
  },
  setup() {
    const search = ref("");
    const searchResults = ref("");

    function getSearchResults() {
      axios
        .get(`https://api.open5e.com/search/?text=${search.value}`)
        .then(response => (searchResults.value = response.data));
    }

    return { getSearchResults, search, searchResults };
  }
};
</script>
