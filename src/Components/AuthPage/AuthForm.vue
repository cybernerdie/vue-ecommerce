<template>
  <div class="auth-form-container">
    <h2 class="mb-3 text-center">{{ isRegistering ? 'Register' : 'Login' }}</h2>
    <form @submit.prevent="submitForm" class="mt-4">
      <div v-if="isRegistering">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="name">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password">
        </div>
      </div>
      <div v-else>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password">
        </div>
      </div>
      <button type="submit">{{ isRegistering ? 'Register' : 'Login' }}</button>
      <p v-if="isRegistering">Already have an account? <a href="#" @click.prevent="toggleIsRegistering">Login</a></p>
      <p v-else>Don't have an account? <a href="#" @click.prevent="toggleIsRegistering">Register</a></p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AuthForm',

  data() {
    return {
      isRegistering: false,
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    submitForm() {
      // Send the data to the server
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      console.log(formData)
      // Reset the form
      this.name = ''
      this.email = ''
      this.password = ''
    },
    toggleIsRegistering() {
      this.isRegistering = !this.isRegistering
    }
  }
}
</script>

<style scoped>
.auth-form-container {
  max-width: 400px;
  margin: 5% auto 0 auto;
  padding: 20px;
  height: 100vh
}

.auth-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

h2 {
  margin-top: 0;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 100%;
}

button {
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0069d9;
}

p {
  margin-top: 20px;
  font-size: 14px;
}

a {
  color: #008CBA;
}

a:hover {
  text-decoration: underline;
}
</style>
