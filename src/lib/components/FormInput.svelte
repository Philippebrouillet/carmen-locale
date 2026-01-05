<script lang="ts">
  export let label: string;
  export let id: string;
  export let type: "text" | "email" = "text";
  export let value: string;
  export let placeholder: string;

  const typeAction = (node: any) => {
    node.type = type;
  };
</script>

<div class=" flex flex-col gap-1">
  <label for="first-name" class="text-xs text-gray-400 font-bold uppercase">{label}</label>
  <input
    {id}
    required
    use:typeAction
    class="w-full text-xs bg-white placeholder-gray-400 text-black/90 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition duration-200 ease-in-out"
    {placeholder}
    bind:value
  />
</div>
