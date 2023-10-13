<template>
  <div>
    <div class="login-form">
    <form>
      <h1>Register</h1>
      <div class="content">
        <div class="input-field">
          <input
            v-model="user.email"
            type="email" 
            placeholder="Email"
          >
        </div>
        <div class="input-field">
          <input 
            v-model="user.name"
            type="text" 
            placeholder="Name"
          >
        </div>
        <div class="input-field">
          <input
            v-model="user.password"
            type="password" 
            placeholder="Password"
          >
        </div>
      </div>
      <div class="action">
        <button @click.prevent="register">Register</button>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'RegisterPage',
    data () {
      return {
        user: {
          email: '',
          password: '',
          name: ''
        }
      }
    },
    methods: {
      resetForm () {
        this.user.email = '';
        this.user.name = '';
        this.user.password = '';
      },
      register () {
        if (!this.user.email || !this.user.password || !this.user.name) {
          return;
        }
        this.$store.dispatch('user/register', this.user)
          .then(response => {
            console.log(response);
            this.$router.push('login');
            this.resetForm();
          })
          .catch(error => {
            console.log(error);
            const message = error.response.data.error.message; 
            alert(message);
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
