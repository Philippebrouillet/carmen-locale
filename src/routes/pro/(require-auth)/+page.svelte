<script>
  import logo from "$lib/assets/barber-connect.svg";
  
  export let data;

  let locations = data.me?.locations ?? [];
</script>

<nav>
  <img src={logo} alt="barber connect" />
  <a class="logout" href="/pro/logout">logout</a>
</nav>
<main>
  <h1>Vos salon</h1>
  <div class="card-group">
    <a href="/pro/create-location" class="card center"> ajouter un lieux </a>
    {#each locations as location (location.id)}
      <a class="card" href="/pro/location/{location.slug}">
        <div>{location.name}</div>
        <div class="slug">{location.slug}</div>
      </a>
    {/each}
  </div>
</main>

<style>
  nav {
    background-color: var(--background-black);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  nav .logout {
    border: none;
    background-color: black;
    color: white;
    margin-left: auto;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
  }
  main {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .card-group {
    display: grid;
    gap: 1em;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .card {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    padding: 1rem;
  }

  /* On mouse-over, add a deeper shadow */
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .card .slug {
    font-size: small;
  }
</style>
