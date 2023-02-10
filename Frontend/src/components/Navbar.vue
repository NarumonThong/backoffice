<template>
    <nav class="navbar navbar-light">
        <a class="navbar-brand" href="#">
            <img src="/img/logo.png" alt="Logo">
        </a>

        <a @click="onLogout()" class="btn-logout">
            <i class="fa fa-sign-out" aria-hidden="true"></i> 
        </a>
    </nav>
</template>

<script>
import axios from "axios";
export default {
  name: "navbar",
  methods: {
    onLogout() {
      axios
        .post("api/account/logout")
        .then(response => {
          this.$store.commit("set_user", null);
          this.$router.push({ name: "login" });
        })
        .catch(error => alert(error.response.data.message));
    }
  }
};
</script>

<style scoped>
.navbar {
  background-color: #000000;
  height: 60px;
  border-bottom: solid 1px #D6DF23;
  padding-right: 0;
  padding-top: 0;
}
.navbar-brand img {
  width: 362px;
  height: 45px;
}
.btn-logout {
  width: 80px;
  height: 60px;
  background-color: #D6DF23;
  font-size: 24px;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
}
.btn-logout i {
  color: #000000;
}
</style>

