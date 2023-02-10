<template>
    <div class="layout">
        <Navbar />
        <div class="container">
            <slot name="buttons"></slot>
            <div class="row">
                <div class="col-sm-9">
                    <slot></slot>
                </div>
                <div class="col-sm-3">
                    <Sidebar />

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar.vue";
export default {
  components: {
    Navbar,
    Sidebar
  }
};
</script>



