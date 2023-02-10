import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register'
import Login from './views/Login'
import EquipmentList from './views/equipment/EquipmentList'
import EquipmentForm from './views/equipment/EquipmentForm'
import RoomList from './views/room/RoomList'
import RoomForm from './views/room/RoomForm'
import BookingRoomList from './views/booking/BookingRoomList'
import BookingHistoryList from './views/booking/BookingHistoryList'
import BookingCalendar from './views/booking/BookingCalendar'
import BookingManageList from './views/booking/BookingManageList'
// Database
import MemberListingList from './views/memberlisting/MemberListingList'
import MemberListingForm from './views/memberlisting/MemberListingForm'
import MemberCarList from './views/membercar/MemberCarList'
import MemberCarForm from './views/membercar/MemberCarForm'
import MemberRedeemList from './views/memberredeem/MemberRedeemList'
import MemberRedeemForm from './views/memberredeem/MemberRedeemForm'
import ServiceHistoryList from './views/servicehistory/ServiceHistoryList'
import ServiceHistoryForm from './views/servicehistory/ServiceHistoryForm'
import ProviceList from './views/province/ProvinceList'
import ProviceForm from './views/province/ProvinceForm'
import CarBrandList from './views/carbrand/CarBrandList'
import CarBrandForm from './views/carbrand/CarBrandForm'
import CarModelList from './views/carmodel/CarModelList'
import CarModelForm from './views/carmodel/CarModelForm'
import ServiceBranchList from './views/servicebranch/ServiceBranchList'
import ServiceBranchForm from './views/servicebranch/ServiceBranchForm'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home, meta: { auth: true } },

    // For Equipments
    { path: '/equipment', name: 'equipment-list', component: EquipmentList, meta: { auth: true } },
    { path: '/equipment/form', name: 'equipment-form', component: EquipmentForm, meta: { auth: true } },

    // For Rooms
    { path: '/room', name: 'room-list', component: RoomList, meta: { auth: ['user'] } },
    { path: '/room/form', name: 'room-form', component: RoomForm, meta: { auth: true } },

    // For Bookings
    { path: '/booking/room', name: 'booking-room', component: BookingRoomList, meta: { auth: true } },
    { path: '/booking/history', name: 'booking-history', component: BookingHistoryList, meta: { auth: true } },
    { path: '/booking/calendar', name: 'booking-calendar', component: BookingCalendar, meta: { auth: true } },
    { path: '/booking/manage', name: 'booking-manage', component: BookingManageList, meta: { auth: true } },


    // For MemberListing
    { path: '/memberlisting', name: 'memberlisting-list', component: MemberListingList, meta: { auth: true } },
    { path: '/memberlisting/form', name: 'memberlisting-form', component: MemberListingForm, meta: { auth: true } },

    // For MemberCar
    { path: '/membercar', name: 'membercar-list', component: MemberCarList, meta: { auth: true } },
    { path: '/membercar/form', name: 'membercar-form', component: MemberCarForm, meta: { auth: true } },

    // For MemberRedeem
    { path: '/memberredeem', name: 'memberredeem-list', component: MemberRedeemList, meta: { auth: true } },
    { path: '/memberredeem/form', name: 'memberredeem-form', component: MemberRedeemForm, meta: { auth: true } },

    // For ServiceHistory
    { path: '/servicehistory', name: 'servicehistory-list', component: ServiceHistoryList, meta: { auth: true } },
    { path: '/servicehistory/form', name: 'servicehistory-form', component: ServiceHistoryForm, meta: { auth: true } },

    // For Province
    { path: '/province', name: 'province-list', component: ProviceList, meta: { auth: true } },
    { path: '/province/form', name: 'province-form', component: ProviceForm, meta: { auth: true } },

    // For CarBrand
    { path: '/carbrand', name: 'carbrand-list', component: CarBrandList, meta: { auth: true } },
    { path: '/carbrand/form', name: 'carbrand-form', component: CarBrandForm, meta: { auth: true } },

    // For CarModel
    { path: '/carmodel', name: 'carmodel-list', component: CarModelList, meta: { auth: true } },
    { path: '/carmodel/form', name: 'carmodel-form', component: CarModelForm, meta: { auth: true } },

    // For ServiceBranch
    { path: '/servicebranch', name: 'servicebranch-list', component: ServiceBranchList, meta: { auth: true } },
    { path: '/servicebranch/form', name: 'servicebranch-form', component: ServiceBranchForm, meta: { auth: true } },


    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login }
  ]
})

// ตรวจสอบสิทธิ์การเข้าถึงหน้า
router.beforeEach((to, from, next) => {
  const auth = to.meta.auth;
  if (!auth) return next();
  router.app.$store.dispatch('get_user_login')
    .then(() => {
      if (!Array.isArray(auth)) return next();
      const userLogin = router.app.$store.state.user;
      if (auth.indexOf(userLogin.u_role) >= 0) return next();
    })
    .catch(() => next({ name: 'login' }));
})

export default router;