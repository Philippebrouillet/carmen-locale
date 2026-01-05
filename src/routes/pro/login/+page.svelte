<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { PUBLIC_CARDEN_API } from "$env/static/public";
  import logo from "$lib/assets/barber-connect.svg";
  import LoginGoogle from "$lib/components/LoginGoogle.svelte";

  $: redirectTo = $page.url.searchParams.get("redirectTo");

  let err = { missing: false, incorrect: false };
  let email: string | null;
  let password: string | null;

  async function loginWithGoogle() {
    // Logic to handle Google authentication
  }
  async function login() {
    err = { missing: false, incorrect: false };
    if (email == null || password == null) {
      err.missing = true;
      return;
    }
    let resp = await fetch(`${PUBLIC_CARDEN_API}/api/v2/login`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        secret: password,
      }),
    });
    if (resp.ok) {
      await goto(redirectTo == "" || redirectTo == null ? "/pro/" : `/pro/location/${redirectTo}`);
      return;
    }
    err.incorrect = true;
    return;
  }
</script>

<form class="login-container" on:submit={login}>
  <img src={logo} alt="barber connect" />

  {#if err?.missing}<p class="error">The email field is required</p>{/if}
  {#if err?.incorrect}<p class="error">Invalid credentials!</p>{/if}

  <input
    class="login-input"
    name="email"
    type="email"
    bind:value={email}
    placeholder="Email"
    required
  />
  <input
    class="login-input"
    type="password"
    name="password"
    placeholder="Password"
    required
    bind:value={password}
  />
  <input name="redirectTo" value={redirectTo} hidden />

  <button type="submit" class="login-button">Login</button>
  <p>OR</p>
  <LoginGoogle on:click={loginWithGoogle} />
</form>

<style>
  :global(body) {
    background-color: var(--background-black);
  }
  .login-container {
    display: flex;
    flex-direction: column;
    width: 320px;
    margin: 80px auto;
    padding: 40px 60px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.1);
  }
  .login-container img {
    margin-bottom: 2rem;
  }

  .login-input {
    margin-bottom: 20px;
    padding: 12px 16px;
    border: 1px solid #dcdcdc;
    border-radius: 3px;
    font-size: 16px;
    color: #555;
    outline: none;
    transition: border 0.3s;
  }

  .login-input:focus {
    border-color: #007bff;
  }

  .login-button {
    padding: 12px 16px;
    background-color: #007bff;
    color: white;
    margin-bottom: 20px;
    border: none;
    border-radius: 3px;
    font-size: 16px;
    cursor: pointer;
    outline: none;
    transition:
      background-color 0.3s,
      transform 0.1s;
  }

  .login-button:hover {
    background-color: #0056b3;
  }

  .login-button:active {
    transform: scale(0.97);
  }

  p {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: white;
  }
  p::before,
  p::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.5);
    margin-right: 0.3rem;
    margin-left: 0.3rem;
  }
</style>
