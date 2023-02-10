<template>
    <Layout>
        <div class="card">
            <div class="card-body">
                <!-- <header class="mb-4">
                    <form @submit.prevent="onSearch()" class="search-form form-inline">
                        <select class="form-control" v-model="roomId">
                            <option value="">เลือกห้องประชุม</option>
                            <option :value="item.r_id" v-for="item in roomItems" :key="item.r_id">
                                {{ item.r_name }}
                            </option>
                        </select>

                        <button type="submit" class="btn btn-secondary">
                            <i class="fa fa-search"></i>
                        </button>
                    </form>
                    <h5><i class="fa fa-list-alt"></i> ปฏิทินรายการจองห้องประชุม</h5>
                </header> -->
                <br>

                <!-- <div id='calendar'></div> -->
            </div>
        </div>
    </Layout>
</template>

// <script>
// import Axios from "axios";
// import Layout from "@/components/Layout";
// export default {
//   components: {
//     Layout
//   },
//   data() {
//     return {
//       roomId: "",
//       roomItems: []
//     };
//   },
//   mounted() {
//     this.initialLoadRoomSelect();
//     this.initialLoadCalendar();
//   },
//   methods: {
//     // ส่งข้อมูลห้องไปหาข้อมูลการจอง
//     onSearch() {
//       if (!this.jquery.isNumeric(this.roomId))
//         return this.alertify.warning("Please select item");
//       // ส่งข้อมูลห้องไปค้นหาการจอง
//       Axios.get(`/api/booking/calendar/room/${this.roomId}`)
//         .then(response => {
//           console.log(response.data);
//         })
//         .catch(err => this.alertify.warning(err.response.data.message));
//     },
//     // โหลดข้อมูลห้องประชุมมาแสดงใน Select
//     initialLoadRoomSelect() {
//       Axios.get("/api/booking/rooms/select")
//         .then(response => (this.roomItems = response.data))
//         .catch(err => this.alertify.warning(err.response.data.message));
//     },
//     // โหลดข้อมูล Calendar ของ UI
//     initialLoadCalendar() {
//       this.jquery("#calendar").fullCalendar({
//         header: {
//           left: "prev,next today",
//           center: "title",
//           right: "month,agendaWeek,agendaDay"
//         }
//       });
//     }
//   }
// };
// </script>


