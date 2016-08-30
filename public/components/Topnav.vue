<template>
  <nav class="navbar navbar-default navbar-static-top">
    <div class="btn-group" v-if="!$parent.logsign">
        <button @click="showLogin">LogIn</button>
        <button @click="showSignup">SignUp</button>
    </div>
    <div class="btn-group" v-if=$parent.docList>
      Logged-in user: {{$parent.email}}
    </div>
  </nav>
</template>

<script>
  export default {
    methods: {
      showLogin: function(){
        this.$parent.login = true;
        this.$parent.logsign = true;
      },
      showSignup: function(){
        this.$parent.signup= true;
        this.$parent.logsign = true;
      }
    }
  }
</script>