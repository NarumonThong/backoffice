<template>
    <section class="card">
        <header class="card-header text-center">
            <h5 class="m-0" v-html="item.header"></h5>
        </header>
        <div class="card-body">
            <router-link 
              v-for="(item, index) in item.navs" 
              :key="index" 
              :to="item.link || ''"
              class="sidebar-link">
                <i class="fa fa-chevron-circle-right"></i> {{ item.name }}
            </router-link>
        </div>
    </section>
</template>

<script>
export default {
  props: ["item"]
};
</script>


<style scoped>
h5,
i {
  font-size: 1rem;
  color: #000000;
}
.card {
  background: none;
  border-color: #D6DF23;
}
.card-body {
  padding: 0.8rem 0;
}
.sidebar-link {
  display: block;
  padding: 0.55rem 1rem;
  margin-bottom: 2px;
  color: #525b62;
  font-weight: 400;
  text-decoration: none;
}
.fa-chevron-circle-right {
  color: #D6DF23;
  margin-right: 4px;
}
.sidebar-link:hover,
.sidebar-link.active {
  background-color: #dee2e6;
}
.sidebar-link.active,
.sidebar-link.active .fa-chevron-circle-right,
.sidebar-link:hover,
.sidebar-link:hover .fa-chevron-circle-right {
  color: #212529;
}
</style>