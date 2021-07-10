<template>
  <Login v-if="!login" v-model:login="login" v-model:credentials="credentials" />

  <Appointment v-else v-model:login="login" v-model:credentials="credentials" />
</template>

<script>
import Appointment from './components/Appointment.vue'
import Login from './components/Login.vue'

export default {
  name: 'App',
  data() {
    return {
      login: false,
      credentials: {
        dorm: 0,
        room: 0,
        bed: 0,
        class: '',
        studentID: '',
        studentName: '',
        selection: undefined,
        token: ''
      }
    }
  },
  created() {
    const cred = localStorage.getItem('cred')
    if (cred) {
      this.credentials = JSON.parse(cred)
      if (this.credentials.token) {
        this.login = true
      }
    }
  },
  components: {
    Appointment,
    Login
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
