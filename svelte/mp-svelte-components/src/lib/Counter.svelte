<script lang="ts">
  export let startFrom: number = 0;

  let count: number = startFrom ?? 0;
  const increment = () => {
    count += 1
  }
</script>

<button on:click={increment}>
  count is {count}
</button>
