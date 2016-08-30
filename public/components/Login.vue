<template>
  <div class="login-grp"  v-if="$parent.login">
    <div class="row">
      <div class="col-12 col-6-tablet push-3-tablet text-center">
        <h1 class="font-100">Welcome Back</h1>
      </div>
    
      <div class="col-12 col-6-tablet push-3-tablet col-4-desktop push-4-desktop text-center">
        <form id=formLogin>
          <fieldset>
            <input type="email" v-model="$parent.email" placeholder="email">
          </fieldset>
          <fieldset>
            <input type="password" v-model="$parent.password" placeholder="password">
          </fieldset>
          <button type="submit" class="button button-primary" v-on:click.prevent="$parent.doLogin">
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
