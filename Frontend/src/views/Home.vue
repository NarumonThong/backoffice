<template>
  <div class="home">
    <Layout>
      <div class="card">
        <div class="card-body"></div>
      </div>
    </Layout>
  </div>
</template>

<script>
// import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
export default {
  name: "home",
  components: {
    // Navbar,
    Layout
  },
  // เช็คว่าใครเข้าระบบ
  // created() {
  //   console.log(this.$store.state.user);
  // }
};
</script>
