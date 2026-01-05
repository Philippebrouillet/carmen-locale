<script>
  import PaymentMethods from "../assets/PaymentMethods.svelte";
  import WordmarkLogo from "../assets/WordmarkLogo.svelte";
</script>

<footer class="flex flex-col items-center gap-4 py-16 md:py-20 -z-10">
  <div class="flex flex-row gap-3 items-center">
    <p class="opacity-70">Booking via</p>
    <WordmarkLogo />
  </div>
  <PaymentMethods />
</footer>
