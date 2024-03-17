<template>
    <v-app class="main_div">
        <v-container class="ma-auto">
            <div>
                <!-- <v-img src="../../assets/brush_logo.svg" class="logo_img"></v-img> -->
            </div>
            <v-row class="d-flex">
                <v-col md="6">
                    <!-- <v-img src="../../assets/welcome_img.svg" class="welcome_img" v-if="$isDesktop"></v-img> -->
                </v-col>
                <v-col md="6" class="pa-0">

                    <!-- send-otp -->
                    <v-card class="signup_form d-flex flex-column justify-center align-center py-10"
                        v-if="!switch_to_verify_page">
                        <v-card-text class="d-flex justify-center">
                            <div class="sub_div_1 d-flex flex-column align-center justify-center">
                                <div class="d-flex flex-column justify-center align-center">
                                    <p class="signin_text">Sign In</p>
                                    <p class="sub_text_1 mb-0 mt-5">Enter Your Mobile Number</p>
                                </div>
                                <p class="sub_text_2 mt-4">BrushCircle will send you a one time password to your registered
                                    Mobile Number</p>
                            </div>
                        </v-card-text>
                        <v-card-text class="d-flex justify-center mt-n5">
                            <div class="sub_div_2">
                                <p class="sub_text_3 mb-1">Mobile number</p>
                                <v-form ref="login_form">
                                    <!-- text-field -->
                                    <v-text-field dense outlined placeholder="Please enter mobile number"
                                        class="md-mr-0 mr-2" v-model="mobile" prepend-inner-icon
                                        :rules="[$rules.mobile_number]">
                                        <template #prepend-inner>
                                            <!-- {{ selected_flag }} -->
                                            <v-img :src="selected_flag" class="flag_img"></v-img> &nbsp;
                                            {{ selected_phone_code }} &nbsp;
                                            <v-menu offset-y>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-icon v-bind="attrs" v-on="on">mdi-chevron-down</v-icon>
                                                </template>
                                                <v-list>
                                                    <v-list-item v-for="(item, index) in phone_code_list" :key="index"
                                                        @click="selectPhoneCode(item)">
                                                        <v-list-item-title>{{ item.phone_code }} {{ item.name
                                                        }}</v-list-item-title>
                                                    </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </template>
                                    </v-text-field>
                                    <!-- text-field -->
                                </v-form>

                                <v-btn class="login_btn py-5" block @click="sendOtp()" :loading="send_otp_btn_loader">
                                    Sign In
                                </v-btn>

                                <div class="d-flex align-center justify-center">
                                    <div class="footer_text_1 mt-3" @click="navigateToSignUpPage()">Don't have an account ?
                                        <span class="create_acc_text">Create Account</span>
                                    </div>
                                </div>
                                <div class="text-center mt-2 footer_text_2">
                                    By Continuing,you agree to our
                                    <span color="black" @click="openTermsOfService">
                                        Terms of Service
                                    </span>
                                    and
                                    <span @click="openPrivacyPolicy">
                                        Privacy Policy
                                    </span>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>

                    <!-- verify-otp -->
                    <v-card class="signup_form d-flex flex-column justify-center align-center py-10"
                        v-if="switch_to_verify_page">
                        <div>
                            <v-card-text class="sub_div_1 d-flex flex-column align-center justify-center">
                                <p class="sub_text_1 mb-0">Enter verification code</p>
                                <p class="sub_text_2 mt-2 mb-0">The verification code has been sent to
                                  </p>
                                  <p>+91 {{ mobile }}</p> 
                            </v-card-text>
                            <v-card-text class="sub_div_2 mt-n2">
                                <p class="mb-0">Enter 6 Digit OTP</p>
                                <v-otp-input length="6" size="2" class="mb-15 custom-otp-input" v-model="otp_field"
                                    :rules="[$rules.otp]"></v-otp-input>
                                <v-btn class="verify_btn py-5 white--text text-capitalize" block @click="verifyOtp()"
                                    :loading="verify_btn_loader">
                                    Verify
                                </v-btn>
                                <v-btn outlined class="go_back_btn py-5 mt-5" block @click="goBackToMainLoginPage()">
                                    Back
                                </v-btn>
                                <div class="d-flex justify-center align-center mt-2">
                                    <p :class="{ 'disable_resend': is_timer_enable }" class="resend_otp_text"
                                        @click="send_otp_again()">Resend OTP</p> &nbsp;
                                    <p class="resend_otp_timer" v-if="is_timer_enable">{{ countDownTimer }} sec</p>
                                </div>
                            </v-card-text>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <SnackBar></SnackBar>
    </v-app>
</template>
<script>
export default {
    name: "Login",
    data() {
        return {
            is_resend_enable: true,
            is_timer_enable: false,
            countDownTimer: null,
            otp_field: "",
            mobile: null,
            send_otp_btn_loader: false,
            verify_btn_loader: false,
            flag: "",
            country_name: "",
            phone_code_list: null,
            selected_phone_code: "+91",
            selected_flag: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
            switch_to_verify_page: false,
        }
    },
    watch: {
        otp_field() {
            if (this.otp_field.length === 6) {
                this.verifyOtp();
            }
        }
    },
    methods: {
        navigateToSignUpPage() {
            this.$router.push({
                name: "sign-up"
            })
        },
        goBackToMainLoginPage() {
            // this.$router.go(0);
            this.switch_to_verify_page = false,
                this.mobile = ""
        },
        // sendOtp api calling
        sendOtp() {
            // if (this.$refs.login_form.validate()) {
            //     this.send_otp_btn_loader = true
            //     // self.get_otp_btn = true;
            //     var data = {
            //         "mobile": this.mobile,
            //         "phone_code": this.selected_phone_code
            //     }

            //     const successHandler = (response) => {
            //         this.switch_to_verify_page = true
            //         console.log("response of send-otp owner", response)
            //         this.send_otp_btn_loader = false

            //     };
            //     const failureHandler = (error) => {
            //         if (error) {
            //             this.send_otp_btn_loader = false;
            //             this.showSnackBar(error.data.message, "#B3261E", 1000);
            //             this.mobile = ""
            //         }
            //     };
            //     return this.$axios("post", this.$apiUrl.SEND_OTP_LOGIN, {
            //         data,
            //         onSuccess: successHandler,
            //         onFailure: failureHandler,
            //         isTokenRequired: false,
            //     });
            // }
        },
        // verify-otp api calling
        verifyOtp() {
            // this.verify_btn_loader = true
            // const data = {
            //     "phone_code": this.selected_phone_code,
            //     "mobile": this.mobile,
            //     "otp": this.otp_field
            // }
            // const successHandler = (response) => {
            //     this.verify_btn_loader = false

            //     // tokens
            //     var access_token = response.data.token
            //     var refresh_token = response.data.rtoken

            //     // user details
            //     let user_name = response.data.response.name;
            //     let mobile = response.data.response.mobile;
            //     let user_id = response.data.response.user_id;
            //     let role = response.data.response.role;

            //     // parlour details
            //     let is_staff_added = response.data.response.is_staff_added;
            //     let is_service_added = response.data.response.is_service_added;
            //     let parlour_id = response.data.response.parlour_id;
            //     let is_parlour_registered = response.data.response.is_parlour_registered;

            //     localStorage.setItem("access_token", access_token)
            //     localStorage.setItem("refresh_token", refresh_token)
            //     localStorage.setItem("parlour_id", parlour_id)
            //     localStorage.setItem("user_id", user_id)
            //     localStorage.setItem("user_role", role)
            //     localStorage.setItem("is_parlour_registered", is_parlour_registered)

            //     let current_user_details = {
            //         name: user_name,
            //         number: mobile,
            //         role: role,
            //         user_id: user_id,
            //     }
            //     let parlour_details = {
            //         parlour_id: parlour_id,
            //         is_staff_added: is_staff_added,
            //         is_service_added: is_service_added,
            //         is_parlour_registered: is_parlour_registered
            //     }


            //     // storing details in store
            //     this.$store.dispatch("profile/setUserDetails", current_user_details)
            //     this.$store.dispatch("profile/setParlourDetails", parlour_details)
            //     if (is_parlour_registered == true) {
            //         this.$router.push({
            //             name: "dashboard"
            //         })
            //         this.showSnackBar("Logged In", "success", 1500);
            //     }
            //     else {
            //         this.showSnackBar("Please register your parlour first", "#B3261E");
            //     }
            // }
            // const failureHandler = (error) => {
            //     if (error) {
            //         this.showSnackBar("Invalid Otp", "#B3261E", 2000);
            //         this.otp_field = ""
            //         this.verify_btn_loader = false
            //     }
            // }
            // const finallyHandler = () => {
            //     this.verify_btn_loader = false
            // }
            // return this.$axios("post", this.$apiUrl.VERIFY_OTP, {
            //     data,
            //     onSuccess: successHandler,
            //     onFailure: failureHandler,
            //     onFinally: finallyHandler,
            //     isTokenRequired: false,
            // });
        },
      
    },
    mounted() {
        this.getListOfPhoneCodes();
    }
}
// }

</script>
<style scoped>
.create_acc_text {
    color: #F2797B !important;
    cursor: pointer;
}

.signin_text {
    color: #404C57;
    font-weight: 700;
    font-size: 39px;
}

.footer_text_1 {
    font-size: 14px !important;
    font-weight: 400 !important;
    color: black !important;
}

.footer_text_2 {
    font-size: 14px !important;
    font-weight: 500 !important;
    color: #6E7B89 !important;
    cursor: pointer !important;
}

.login_btn {
    background-color: #F2797B !important;
    color: white !important;
    text-transform: initial !important;
    border-radius: 9px !important;
}

.disable_resend {
    cursor: no-drop !important;
}

.resend_otp_timer {
    color: #6E7B89;
    font-size: 12px;
    font-weight: 700;
}

.resend_otp_text {
    color: #F2797B !important;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
}

.flag_img {
    width: 20px;
    height: 20px;
}

.main_div {
    /* background-image: url("../../assets/bg_img_1.png"); */
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
}

.verify_btn {
    background-color: #F2797B !important;
    border-radius: 8px !important;
}

span {
    color: black !important;
}

.signup_form {
    max-width: 522px !important;
}

.sub_div_1,
.sub_div_2 {
    width: 458px;
}

.logo_img {
    width: 185.96px;
}

.sub_text_1 {
    font-weight: 700;
    font-size: 2.0rem;
    color: #404C57;
    line-height: 1.2 !important;
}

.sub_text_2 {
    font-weight: 400;
    font-size: 1rem;
    color: grey;
}

.sub_text_3 {
    color: black !important
}

.sub_text_4 {
    font-size: 1.25rem;
    color: grey;
    line-height: 0.5 rem !important;
}

.v-text-field--outlined,
.v-text-field--solo {
    border-radius: 9px !important;
}

.go_back_btn {
    text-transform: initial !important;
    border-radius: 9px !important;
}

.v-sheet.v-card {
    border-radius: 28px;
}

.footer_text {
    margin-top: 15px;
    font-size: 21px !important;
    line-height: 1.5 !important;
}


@media all and (max-width:600px) {
    .main_div {
        background-image: none !important;
    }

    .v-sheet.v-card:not(.v-sheet--outlined) {
        box-shadow: none;
    }

    .v-card__subtitle,
    .v-card__text,
    .v-card__title {
        padding: 0px !important;
    }

    .sub_text_1 {
        font-size: 1.5rem;
    }

    .sub_div_1,
    .sub_div_2 {
        max-width: 367px !important;
    }

    .v-application .pl-5 {
        padding-left: 8px !important;
    }

    .container {
        padding: 5px !important;
    }

    .logo_img {
        margin-left: 85px !important;
    }
}
</style>