<template>
    <v-container class="d-flex flex-column justify-center align-center">
        <v-row>
            <v-col md="6">
                <v-select outlined clearable :items="status_items" dense placeholder="Status :"
                    v-model="selected_status" class="filter">
                </v-select>
            </v-col>
            <v-col v-if="names_list_flag" class="d-flex" cols="12" sm="6">
                <v-select outlined clearable :items="names_items" dense placeholder="Status :" v-model="selected_status"
                    class="filter">
                </v-select>
            </v-col>
            <v-col v-else class="d-flex" cols="12" sm="6">
                <v-select outlined clearable :items="department_items" dense placeholder="Status :"
                    v-model="selected_status" class="filter">
                </v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                    transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field outlined dense v-model="date" label="Picker in menu" prepend-inner-icon="mdi-calendar" readonly
                            v-bind="attrs" v-on="on"></v-text-field>
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
            </v-col>
        </v-row>
        <!--  -->
        <v-row class="file_row">
            <v-col md="12">
                <v-card elevation="2" class="px-5 my-md-5 main_card d-flex flex-column align-center justify-center">
                    <v-card-title>
                        Upload Files Here
                    </v-card-title>
                    <div v-if="file_url">
                        <template v-if="file_type === 'application/pdf'">
                            <v-img src="../assets/pdfIMg.png" class="ma-5 d-flex justify-right">
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
            </v-col>
        </v-row>
        <!--  -->
        <v-row>
            <v-textarea auto-grow outlined placeholder="add you remarks here" v-model="remarks"
                prepend-inner-icon="mdi-comment" rows="1" row-height="15">
            </v-textarea>
        </v-row>
    </v-container>
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
            date:"",
            menu:null
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
        postFileData() {
            const data = {
                "major_head": this.mobile,
                "minor_head": "541983",
                "document_date": "",
                "document_remarks": "",
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
                isTokenRequired: false,
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
</style>