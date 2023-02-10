<template>
    <div class="sidebar">
        <SidebarNav :item="admin" class="sidebar-nav" />
        <SidebarNav :item="user" class="sidebar-nav" />
        <SidebarNav :item="setting" class="sidebar-nav" />
    </div>
</template>

<script>
import SidebarNav from "./SidebarNav";
export default {
  data() {
    return {
      admin: { 
        header: "<i class='fa fa-user'></i> จัดการข้อมูลสมาชิก",
        navs: [
          { name: "MemberListing", link: { name: "memberlisting-list" } },
          { name: "MemberCar", link: { name: "membercar-list" } },
          { name: "MemberRedeem", link: { name: "memberredeem-list" } },
          { name: "ServiceHistory", link: { name: "servicehistory-list" } },
        ]
      },
      user: {
        header: "<i class='fa fa-user'></i> จัดการทั่วไป",
        navs: [
          
          { name: "Province", link: { name: "province-list" } },
          { name: "CarBrand", link: { name: "carbrand-list" } },
          { name: "CarModel", link: { name: "carmodel-list" } },
          { name: "ServiceBranch", link: { name: "servicebranch-list" } }
          // { name: "จัดการ", link: { name: "booking-manage" } },
          // { name: "การจองห้อง", link: { name: "booking-room" } },
          // { name: "ข้อมูลอุปกรณ์", link: { name: "equipment-list" } },
          // { name: "ข้อมูลห้อง", link: { name: "room-list" } },
          // { name: "แก้ไขทะเบียนรถ" },
          // { name: "แก้ไขข้อมูลสมาชิก" },
          
        ]
      },
      setting: {
        header: "<i class='fa fa-cog'></i> ตั้งค่าอื่่นๆ",
        navs: [
          { name: "ตั้งค่าสิทธิการเข้าถึง" },
        ]
      }
    };
  },
  components: {
    SidebarNav
  }
};
</script>

<style scoped>
.sidebar-nav {
  margin-bottom: 30px;
}
</style>


