<script lang="ts">
  export let name: string;
  export let shape: "circle" | "square" | "mini-square" | "mini-circle" = "circle";

  // Function to get initials from the name
  const getInitials = (name: string) => {
    const trimmedName = name.trim();
    const firstLetter = trimmedName.charAt(0).toUpperCase();
    const secondLetter = trimmedName.charAt(1).toLowerCase();
    return firstLetter + secondLetter;
  };

  const initials = getInitials(name);
</script>

{#if shape == "circle"}
  <div
    class=" flex-1 font-medium md:font-semibold bg-gradient-to-b from-white via-[#FB9400] to-[#23BBAC] rounded-full min-w-16 w-16 md:min-w-28 aspect-square p-1 text-2xl md:text-4xl"
  >
    <div
      class="flex items-center justify-center text-white w-full bg-[#CF95FB] {shape == 'circle'
        ? 'rounded-full aspect-square'
        : 'w-full h-full'} "
    >
      {initials}
    </div>
  </div>
{:else if shape == "square"}
  <div
    class=" flex-1 font-medium md:font-semibold bg-gradient-to-b from-white via-[#FB9400] to-[#23BBAC]
'w-full h-full p-2 min-h-28 rounded-sm text-2xl md:text-4xl"
  >
    <div
      class="flex items-center justify-center text-white bg-[#CF95FB]
      w-full h-full"
    >
      {initials}
    </div>
  </div>
{:else if shape == "mini-square"}
  <div
    class=" flex-1 font-medium md:font-semibold bg-gradient-to-b from-white via-[#FB9400] to-[#23BBAC]
      w-full h-full p-1 aspect-square rounded-sm text-lg"
  >
    <div class="flex items-center justify-center text-white w-full bg-[#CF95FB] h-full">
      {initials}
    </div>
  </div>
{:else if shape == "mini-circle"}
  <div
    class=" flex-1 min-w-16 w-16 max-w-16 font-medium md:font-semibold bg-gradient-to-b from-white via-[#FB9400] to-[#23BBAC] p-1 aspect-square rounded-full text-lg"
  >
    <div
      class="flex items-center justify-center text-white w-full bg-[#CF95FB] rounded-full h-full"
    >
      {initials}
    </div>
  </div>
{/if}
