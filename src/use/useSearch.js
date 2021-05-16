import { ref } from "vue";
import axios from "axios";

export default function useSearch() {
  const loadingResults = ref(false);
  const search = ref("");
  const searchResults = ref("");

  const getSearchResults = search => {
    searchResults.value = "";
    loadingResults.value = true;

    return axios
      .get(`https://api.open5e.com/search/?text=${search}`)
      .then(response => {
        searchResults.value = response.data;
      })
      .catch(error => {
        console.error(error);
        loadingResults.value = false;
      })
      .then(() => (loadingResults.value = false));
  };

  return { getSearchResults, loadingResults, search, searchResults };
}
