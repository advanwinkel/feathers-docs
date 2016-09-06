<template id="signup-template">
  <div class="row" v-if="$parent.signup">
    <div class="col-12 col-6-tablet push-3-tablet text-center">
      <h1 class="font-100">Create an Account</h1>
    </div>
  
      <div class="col-12 col-6-tablet push-3-tablet col-4-desktop push-4-desktop text-center">
        <form class="form">
          <fieldset>
            <input class="block" type="email" v-model="$parent.email" placeholder="email">
          </fieldset>
          <fieldset>
            <input class="block" type="password" v-model="$parent.password" placeholder="password">
          </fieldset>
          <button type="submit" class="button button-primary" v-on:click.prevent="doSignup">
            Signup
          </button>
        </form>
      </div>
    </div>   
</template>

<script>
  export default {
  methods: {
    doSignup: function(){
      this.$parent.signup = false;
      self = this;
      this.$parent.usersService.create({email: this.$parent.email, password: this.$parent.password}, {}).
        then( function (response) {
          self.$root.doLogin()
        })
      }
    }
  }
</script>