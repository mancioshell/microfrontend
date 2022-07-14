<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  let username;
  let password;

  let AjaxService;

  onMount(async () => {
    AjaxService = await import("utils/AjaxService");
  });

  async function handleSubmit() {
    try {
      let result = await AjaxService.doAjax(
        "POST",
        `/api/login`,
        {},
        { email: username, password: password }
      );

      let accessToken = result.data.accessToken;
      sessionStorage.setItem("accessToken", accessToken);
      navigate("/products");

      return response.data.authorized;
    } catch (error) {
      console.log(error);
    }
  }
</script>

<div class="row mt-5 mb-5">
  <div class="col-8 offset-md-2">
    <form on:submit|preventDefault={() => handleSubmit()}>
      <div class="mb-3">
        <label for="email" class="form-label"> Username </label>
        <input
          type="text"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          bind:value={username}
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label"> Password </label>
        <input
          type="password"
          class="form-control"
          id="password"
          bind:value={password}
        />
      </div>
      <button type="submit" class="btn btn-primary">
        <i class="fas fa-sign-in-alt" /> Login
      </button>
    </form>
  </div>
</div>