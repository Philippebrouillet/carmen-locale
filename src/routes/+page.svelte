<script>
  import Button from "$src/lib/components/ui/button/button.svelte";
  import cardenSvg from "$lib/assets/carden-icon.svg";
</script>

<div class="flex flex-col items-center justify-center min-h-screen py-2">
  <img width="100" src={cardenSvg} alt="carden" />
  <h1 class="text-3xl">Welcome to Carden</h1>

  <div class="flex flex-col gap-2 items-center p-4">
    <Button class="flex-1 w-full text-lg" variant="link" href="/24">Demo</Button>
    <Button class="flex-1 w-full text-lg" variant="link" href="/barber-avenue">
      Barber avenue
    </Button>
    <Button class="flex-1 w-full text-lg" variant="link" href="/barber-district">
      Barber district
    </Button>
    <Button class="flex-1 w-full text-lg " variant="link" href="/pro">Admin</Button>
  </div>
</div>
