<template>
    <Layout>
        <div slot="buttons" class="form-group">
            <router-link class="btn btn-menu" :to="{ name:'memberlisting-list' }">รายการข้อมูล</router-link>
            <router-link class="btn btn-menu" :to="{ name:'memberlisting-form' }">เพิ่มข้อมูลใหม่</router-link>
        </div>
        <div class="card">
            <div class="card-body">
                <header>
                    <h5><i class="fa fa-edit"></i> เพิ่ม/แก้ไข ข้อมูลสมาชิก</h5>
                </header>
                <hr>
                
                <form @submit.prevent="onSubmit()">
                    <div class="form-group">
                        <label for="">โทรศัพท์</label>
                        <input type="text" name="m_phone"
                            v-model.trim="form.m_phone" 
                            v-validate="{ required: true }"
                            :class="{ 'is-invalid': errors.has('m_phone') }"
                            class="form-control">
                        <p class="invalid-feedback">{{ errors.first('m_phone') }}</p>
                    </div>

                    <div class="form-group">
                        <label for="">ทะเบียน</label>
                        <input type="text" name="m_membercar"
                            v-model.trim="form.m_membercar" 
                            v-validate="{ required: true }"
                            :class="{ 'is-invalid': errors.has('m_membercar') }"
                            class="form-control">
                        <p class="invalid-feedback">{{ errors.first('m_membercar') }}</p>
                    </div>

                    <div class="form-group">
                        <label for="">ชื่อ</label>
                        <input type="text" name="m_name"
                            v-model.trim="form.m_name" 
                            v-validate="{ required: true }"
                            :class="{ 'is-invalid': errors.has('m_name') }"
                            class="form-control">
                        <p class="invalid-feedback">{{ errors.first('m_name') }}</p>
                    </div>

                    <div class="form-group">
                        <label for="">อาชีพ</label>
                        <input type="text" name="m_career"
                            v-model.trim="form.m_career" 
                            v-validate="{ required: true }"
                            :class="{ 'is-invalid': errors.has('m_career') }"
                            class="form-control">
                        <p class="invalid-feedback">{{ errors.first('m_career') }}</p>
                    </div>

                    <div class="form-group">
                        <label for="">อีเมล</label>
                        <input type="text" name="m_email"
                            v-model.trim="form.m_email" 
                            v-validate="{ required: true }"
                            :class="{ 'is-invalid': errors.has('m_email') }"
                            class="form-control">
                        <p class="invalid-feedback">{{ errors.first('m_email') }}</p>
                    </div>

                    

                    <div class="form-group mt-4 mb-5">
                        <div class="row">
                            <div class="col-sm-6">
                                <button type="submit" class="btn btn-info btn-block">
                                    บันทึกข้อมูล
                                </button>
                            </div>
                            <div class="col-sm-6">
                                <router-link :to="{ name: 'equipment-list' }" class="btn btn-danger btn-block">
                                    ยกเลิก
                                </router-link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import Axios from "axios";
export default {
  components: {
    Layout
  },
  data() {
    return {
      form: {
        m_phone: "",
        m_membercar: "",
        m_name: "",
        m_career: "",
        m_email: ""
      }
    };
  },
  mounted() {
    this.initialUpdateItem();
  },
  watch: {
    "$route.query.id"() {
      this.form = {
        m_phone: "",
        m_membercar: "",
        m_name: "",
        m_career: "",
        m_email: ""
      };
      this.$validator.reset();
    }
  },
  methods: {
    // ส่งข้อมูลไปยัง Backend
    onSubmit() {
      this.$validator.validateAll().then(valid => {
        if (!valid) return;
        // if (this.jquery.trim(this.form.eq_image) == "")
        //   return this.alertify.warning("กรุณาอัพโหลดภาพ");
        // ตรวจสอบว่าเป็น การแก้ไขหรือการเพิ่มใหม่
        const updateId = this.$router.currentRoute.query.id;
        const request = isNaN(updateId)
          ? Axios.post("/api/memberlisting", this.form) // สร้างใหม่
          : Axios.put(`/api/memberlisting/${updateId}`, this.form); // แก้ไข
        // ส่งข้อมูลไปหา Server
        request
          .then(res => this.$router.push({ name: "memberlisting-list" }))
          .catch(error => this.alertify.error(error.response.data.message));
      });
    },
    // เปลี่ยนไฟล์อัพโหลดเป็น Base64 string
    // onChangeFile(input) {
    //   this.form.eq_image = "";
    //   if (input.files && input.files.length > 0) {
    //     const file = input.files[0];
    //     if (file.type.indexOf("image/") >= 0) {
    //       const reader = new FileReader();
    //       reader.readAsDataURL(file);
    //       reader.addEventListener("load", () => {
    //         this.form.eq_image = reader.result;
    //       });
    //       return;
    //     }
    //   }
    //   this.alertify.warning("กรุณาเลือกภาพที่จะอัพโหลด !");
    // },
    // นำข้อมูลจาก Server ไปใส่ใน Form เพื่อทำการ update ใหม่
    initialUpdateItem() {
      const id = this.$route.query.id;
      if (isNaN(id)) return;
      Axios.get(`/api/memberlisting/${id}`)
        .then(res => {
          const form = res.data;
          this.form.m_phone = form.m_phone;
          this.form.m_membercar = form.m_membercar;
          this.form.m_name = form.m_name;
          this.form.m_career = form.m_career;
          this.form.m_email = form.m_email;
        })
        .catch(() => this.$router.push({ name: "memberlisting-list" }));
    }
  }
};
</script>

<style scoped>
.btn-menu {
  color: #ffffff;
  background-color: #ced4da;
  margin-right: 7px;
  min-width: 130px;
}
.btn.router-link-exact-active {
  background-color: #D6DF23;
}
form {
  max-width: 350px;
  margin: auto;
}
form img {
  max-width: 350px;
  border: solid 1px #6c757d;
}
</style>

