<template>
  <div class="auth-form-container">
    <h2 class="mb-3 text-center">{{ isRegistering ? 'Register' : 'Login' }}</h2>
    <form @submit.prevent="submitForm" class="mt-4">
      <div v-if="isRegistering">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="name" required>
         <div v-if="errors.name" class="error">{{ errors.name[0] }}</div>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required>
            <div v-if="errors.email" class="error">{{ errors.email[0] }}</div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required>
          <div v-if="errors.password" class="error">{{ errors.password[0] }}</div>
        </div>
      </div>
      <div v-else>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required>
           <div v-if="errors.email" class="error">{{ errors.email[0] }}</div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required>
            <div v-if="errors.password" class="error">{{ errors.password[0] }}</div>
        </div>
      </div>
      <button type="submit">{{ isRegistering ? 'Register' : 'Login' }}</button>
      <p v-if="isRegistering">Already have an account? <a href="#" @click.prevent="toggleIsRegistering">Login</a></p>
      <p v-else>Don't have an account? <a href="#" @click.prevent="toggleIsRegistering">Register</a></p>
    </form>
  </div>
</template>

<script>
import axios from "@/axios.js";

export default {
  data() {
    return {
      isRegistering: false,
      name: '',
      email: '',
      password: '',
      errors: [],
    };
  },
  methods: {
    submitLoginForm() {
      const data = {
        email: this.email,
        password: this.password,
      };
      const endpoint = '/auth/login';
      this.authenticateUser(data, endpoint);
    },

    submitRegisterForm() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      const endpoint = '/auth/register';
      this.authenticateUser(data, endpoint);
    },

    async authenticateUser(data, endpoint) {
      try {
        const response = await axios.post(endpoint, data);
        const responseData = response.data.data;
        const user = responseData.user;
        const token = responseData.token;

        this.$store.commit('setUser', user);
        this.$store.commit('setToken', token);
        this.$toast.success(response.data.message);
        this.$router.push('/');
      } catch (error) {
        this.$toast.error(error.response.data.message);
        this.errors = error.response.data.errors;
    }
    },

    submitForm() {
      this.errors = [];

      if (this.isRegistering) {
        this.submitRegisterForm();
      } else {
        this.submitLoginForm();
      }
    },

    toggleIsRegistering() {
      this.isRegistering = !this.isRegistering;
    },
  },
};
</script>
<style scoped>
.auth-form-container {
  max-width: 400px;
  margin: 5% auto 0 auto;
  padding: 20px;
  min-height: 100vh
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

.error {
  color: red;
  margin-top: 1%;
}
</style>
