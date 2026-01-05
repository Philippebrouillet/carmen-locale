<script>
  import { page } from "$app/stores";
  import logo from "$lib/assets/barber-connect.svg";
</script>

<main>
  <nav>
    <header><img src={logo} alt="logo" /></header>

    <a id="planning" href="/pro/location/{$page.params.slug}/planning">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
      >
        <path
          d="M7.875 17.5H5.25C4.32174 17.5 3.4315 17.1313 2.77513 16.4749C2.11875 15.8185 1.75 14.9283 1.75 14V6.125C1.75 5.19674 2.11875 4.3065 2.77513 3.65013C3.4315 2.99375 4.32174 2.625 5.25 2.625H14.875C15.8033 2.625 16.6935 2.99375 17.3499 3.65013C18.0063 4.3065 18.375 5.19674 18.375 6.125V8.75M7 1.75V3.5M13.125 1.75V3.5M1.75 7H18.375M16.1875 13.6876L14.875 15.0001"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.875 19.25C17.2912 19.25 19.25 17.2912 19.25 14.875C19.25 12.4588 17.2912 10.5 14.875 10.5C12.4588 10.5 10.5 12.4588 10.5 14.875C10.5 17.2912 12.4588 19.25 14.875 19.25Z"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Planning
    </a>

    <a href="/pro/location/{$page.params.slug}/config"> Config</a>
    <a href="/pro/location/{$page.params.slug}/tickets"> Tickets </a>

    <!--
		<a>Archive location</a>
		<a>Update location cover</a>
		<a>Update location carden card cover</a>
		<a>Update location color template</a>
		<a>Update payment settings</a>
		<a>Enable feed program / carden</a>
		<a>Display billing info</a>
        -->
  </nav>

  <div class="content">
    <slot />
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: row;
  }
  nav {
    background-color: var(--background-black);
    color: rgba(255, 255, 255, 0.7);
    min-height: 100vh;
    position: sticky;
    top:0;
  }
  nav a {
    margin-left: 1rem;
    margin-right: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  nav a svg {
    margin-right: 0.3rem;
  }

  nav header {
    padding: 1rem;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 1rem;
  }
  .content {
    display: flex;
    flex: 1;
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>
