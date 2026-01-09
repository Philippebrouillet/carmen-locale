<script>
  import PaymentMethods from "../assets/PaymentMethods.svelte";
  import WordmarkLogo from "../assets/WordmarkLogo.svelte";
  const links = [
    {
      href: "https://www.carden.app/cgu-cgv",
      text: "CGV",
    },
    { href: "https://www.carden.app/privacy-carden", text: "Politique de confidentialité" },
    { href: "mailto:support@carden.app", text: "support@carden.app" },
  ];
</script>

<footer class="flex flex-col items-center gap-4 py-16 md:py-20 -z-10">
  <div class="text-xs flex flex-col gap-4 justify-center items-center mb-4 font-normal">
    <ul class="flex flex-col justify-center items-center">
      {#each links as link}
        <li>
          <a
            href={link.href}
            class="text-sm text-secondary hover:underline underline underline-offset-2"
          >
            {link.text}
          </a>
        </li>
      {/each}
    </ul>
    <p class="max-w-xl text-center px-4">
      Merci de contacter le salon pour les sujets liés à la réservation. Carden gère uniquement la
      partie technique.
    </p>

    <span>CARDEN © 2026</span>
  </div>

  <div class="flex flex-row gap-3 items-center">
    <p class="text-[#616163]">Booking with</p>
    <WordmarkLogo />
  </div>
  <PaymentMethods />
</footer>
