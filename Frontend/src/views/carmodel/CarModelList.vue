<template>
    <Layout>
        <div slot="buttons" class="form-group">
            <router-link class="btn" :to="{ name:'carmodel-list' }">รายการข้อมูล</router-link>
            <router-link class="btn" :to="{ name:'carmodel-form' }">เพิ่มข้อมูลใหม่</router-link>
        </div>
        <div class="card">
            <div class="card-body">
                <header class="mb-4">
                    <Search :types="search_types" @onSearch="onSearch($event)" />
                    <h5><i class="fa fa-list-alt"></i> รายการข้อมูลทะเบียน</h5>
                </header>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>รหัสยี่ห้อ</th>
                            <th>รุ่น</th>
                            <th>ไซต์</th>
                            <th>สถานะ</th>
                            <th></th>
                        </tr>
                    </thead>

                    
                    <tbody>
                        <tr v-for="item in carmodels" :key="item.RowKey">
                            <td>{{ item.CarBrandKey }}</td>
                            <td>{{ item.ModelName }}</td>
                            <td>{{ item.CarSize }}</td>
                            <td>{{ item.RowStatus }}</td>
                            
                            <td class="text-right">
                                <i @click="onUpdate(item)" class="pointer fa fa-edit text-info mr-4"></i>
                                <i @click="onDelete(item)" class="pointer fa fa-trash text-danger"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- <Pagination :data="memberlistings" :page="page" @onPage="onPage($event)" /> -->
            </div>
        </div>
    </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { mapState } from "vuex";
import Axios from "axios";
export default {
  data() {
    return {
      search: {},
      page: 1,
      search_types: [
        { name: "โทรศัพท์", value: "Phone" },
        { name: "ทะเบียน", value: "CarPlateID" }
      ]
    };
  },
  computed: {
    ...mapState(["carmodels"])
  },
  components: {
    Layout,
    Pagination,
    Search
  },
  created() {
    this.$store.dispatch("set_carmodels");
  },
  methods: {
    onUpdate(item) {
      this.$router.push({ name: "carmodel-form", query: { id: item.m_id } });
    },
    // ลบข้อมูล
    onDelete(item) {
      this.alertify.confirm("คุณต้องการจะลบข้อมูลนี้จริงหรือ?", () => {
        Axios.delete(`/api/carmodel/${item.m_id}`)
          .then(() => this.$store.dispatch("set_carmodels"))
          .catch(error => this.alertify.error(error.response.data.message));
      });
    },
    // การแบ่งหน้า Pagination
    onPage(page) {
      this.page = page;
      this.$store.dispatch("set_carmodels", {
        page: this.page,
        ...this.search
      });
    },
    // การค้นหาข้อมูล Filter
    onSearch(search) {
      this.search = search;
      // this.page = 1;
      this.$store.dispatch("set_carmodels");
    }
  }
};
</script>

<style  scoped>
.btn {
  color: #000000;
  background-color: #ced4da;
  margin-right: 7px;
  min-width: 130px;
}
.btn.router-link-active {
  background-color: #D6DF23;
}
</style>


