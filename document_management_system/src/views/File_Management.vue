<template>
    <!-- <v-card class="d-flex flex-column justify-center align-center ma-10 pa-5 main_card"> -->
        <!--  -->
        <v-container >
        <v-row class="d-flex align-center"  style="height:80vh">
            <v-col md="6" cols="12" class="d-flex flex-column align-center justify-center">

                <v-row class="filter">
                    <v-select outlined clearable :items="status_items" dense label="status" v-model="selected_status"
                        class="filter">
                    </v-select>
                </v-row>
                <v-row v-if="names_list_flag" class="filter">
                    <v-select outlined clearable :items="names_items" dense label="person-name" v-model="selected_name"
                        class="filter">
                    </v-select>
                </v-row>
                <v-row v-else class="filter">
                    <v-select outlined clearable :items="department_items" dense label="department-name"
                        v-model="selected_department" class="filter">
                    </v-select>
                </v-row>
                <v-row>
                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                        transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field outlined dense v-model="date" label="Date" prepend-inner-icon="mdi-calendar"
                                readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">
                                Cancel
                            </v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(date)">
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-row>

                <v-row  class="d-flex align-center justify-center">
                    <v-textarea auto-grow outlined placeholder="add you remarks here" v-model="remarks"
                        prepend-inner-icon="mdi-comment" cols="23" row-height="8">
                    </v-textarea>
                </v-row>

            </v-col>
            <v-spacer></v-spacer>
            <!--  -->
            <v-col md="6" cols="12" class="d-flex align-center justify-center">
                <v-row class="d-flex align-center justify-center">
                    <v-card elevation="2" class="px-5 my-md-5 main_card d-flex flex-column align-center justify-center">
                        <v-card-title>
                            Upload Files Here
                        </v-card-title>
                        <div v-if="file_url">
                            <template v-if="file_type === 'application/pdf'">
                                <v-img src="../assets/pdfIMg.png" class="ma-5 d-flex justify-right pdf_img">
                                    <div class="delete_div image_div ma-1  d-flex align-center justify-center"
                                        style="position: relative; left:290px" @click="deleteMedia(item)">
                                        <v-icon color="red">mdi-delete-outline</v-icon>
                                    </div>
                                </v-img>
                            </template>
                            <template v-else>
                                <v-img :src="file_url" class="image_div ma-5 d-flex justify-right">
                                    <div class="delete_div ma-1  d-flex align-center justify-center"
                                        style="position: relative; left:290px" @click="deleteMedia(item)">
                                        <v-icon color="red">mdi-delete-outline</v-icon>
                                    </div>
                                </v-img>
                            </template>
                        </div>
                        <div v-else class="image_div ma-5 text-center d-flex flex-column align-center justify-center"
                            @click="triggerInputField()">
                            <v-icon color="black" class="file_upload_icon mb-2" large>mdi-file-upload-outline</v-icon>
                            <p>Upload your file here or <span class="browse_btn">browse</span></p>
                        </div>
                        <input @change="fileChangeHandle()" accept=".pdf,image/*" type="file" ref="file_uploading_field"
                            style="visibility: hidden;" />
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
                    <v-col md="12" class="d-flex align-center justify-center">
                        <v-btn color="#F2797B" class="white--text text-capitalize" @click="submitForm()">Submit</v-btn>
                    </v-col>
                </v-row>
    </v-container>
    <!-- </v-card> -->
</template>
<script>
export default {
    name: "File_Management",
    data() {
        return {
            file_url: "",
            selected_file: null,
            status_items: ["Personal", "Professional"],
            selected_status: "",
            names_items: ["John", "Tanvir", "Simran", "Aman", "Sheema"],
            department_items: ["Hr", "Accounts", "IT", "Finance"],
            names_list_flag: false,
            remarks: "",
            file_type: "",
            date: "",
            menu: null,
            selected_department: "",
            selected_name: ""
        }
    },
    methods: {
        triggerInputField() {
            this.$refs.file_uploading_field.click();
        },
        fileChangeHandle() {
            this.uploadFile();
        },
        deleteMedia() {
            this.file_url = ""
        },
        uploadFile() {
            this.selected_file = this.$refs.file_uploading_field.files[0];
            this.file_type = this.selected_file.type
            const reader = new FileReader();
            reader.onload = (event) => {
                this.file_url = event.target.result;

            };
            reader.readAsDataURL(this.selected_file);
        },
        submitForm() {
            const data = {
                "major_head": this.selected_status,
                "minor_head": this.selected_department,
                "document_date": this.date,
                "document_remarks": this.remarks,
                "user_id": "",
                "tags": []
            }
            const successHandler = () => {
                this.verify_btn_loader = false
                this.$router.push({
                    name: "file_management"
                })
            }
            const failureHandler = (error) => {
                if (error) {
                    this.otp_field = ""
                    this.verify_btn_loader = false
                }
            }
            const finallyHandler = () => {
                this.verify_btn_loader = false
            }
            return this.$axios("post", this.$apiUrl.SAVE_DOCUMENTARY, {
                data,
                onSuccess: successHandler,
                onFailure: failureHandler,
                onFinally: finallyHandler,
                isTokenRequired: true,
            });
        }
    },
    watch: {
        selected_status(val) {
            if (val === 'Personal') {
                this.names_list_flag = true
            } else {
                this.names_list_flag = false
            }
        }
    }
}
</script>
<style scoped>
.pdf_img{
    max-width: 346px !important;
    max-height: 258px !important
}
.image_div {
    max-width: 346px !important;
    max-height: 258px !important
}

.file_row {
    max-width: 447px !important;
    /* max-height:258px !important */
}

.delete_div {
    background-color: white;
    cursor: pointer;
    width: 50px;
    height: 44px;
}

.main_card {
    border: 1px solid #F2797B;
}
.filter{
    max-width:259px !important
}
</style>