<template>
    <Layout>
        <div slot="buttons" class="form-group">
            <router-link class="btn" :to="{ name:'memberlisting-list' }">รายการข้อมูล</router-link>
            <router-link class="btn" :to="{ name:'memberlisting-form' }">เพิ่มข้อมูลใหม่</router-link>
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
                            <th>โทรศัพท์</th>
                            <th>ชื่อ</th>
                            <th>วันที่สมัคร</th>
                            <th>HubSpotId</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in memberlistings" :key="item.RowKey">
                            <!-- <td>
                                <div class="img-container">
                                    <img :alt="item.eq_name" :src="`/api/uploads/${item.eq_image}`">
                                </div>
                            </td> -->
                            <td>{{ item.Phone }}</td>
                            <td>{{ item.Name }}</td>
                            <td>{{ item.CreateDate }}</td>
                            <td>{{ item.HubSpotId }}</td>
                            
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
    ...mapState(["memberlistings"])
  },
  components: {
    Layout,
    Pagination,
    Search
  },
  created() {
    this.$store.dispatch("set_memberlistings");
  },
  methods: {
    onUpdate(item) {
      this.$router.push({ name: "memberlisting-form", query: { id: item.m_id } });
    },
    // ลบข้อมูล
    onDelete(item) {
      this.alertify.confirm("คุณต้องการจะลบข้อมูลนี้จริงหรือ?", () => {
        Axios.delete(`/api/memberlisting/${item.m_id}`)
          .then(() => this.$store.dispatch("set_memberlistings"))
          .catch(error => this.alertify.error(error.response.data.message));
      });
    },
    // การแบ่งหน้า Pagination
    onPage(page) {
      this.page = page;
      this.$store.dispatch("set_memberlistings", {
        page: this.page,
        ...this.search
      });
    },
    // การค้นหาข้อมูล Filter
    onSearch(search) {
      this.search = search;
      // this.page = 1;
      this.$store.dispatch("set_memberlistings");
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


