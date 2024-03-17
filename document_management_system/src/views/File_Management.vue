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
            <v-col md="12">
                <v-card elevation="2" class="px-5 my-md-5 main_card d-flex flex-column align-center justify-center">
                    <v-card-title>
                        Upload Files Here
                    </v-card-title>
                    <div class="file_main_div ma-5 d-flex">
                        <div v-for="item in file_array" :key="item.index">
                            <template>
                                <v-img :src="item.url" class="image_div ma-5 d-flex justify-right">
                                    <div class="delete_div pa-4 d-flex align-center justify-center"
                                        style="position: relative;" @click="deleteMedia(item)">
                                        <v-icon color="red">mdi-delete-outline</v-icon>
                                    </div>
                                </v-img>
                            </template>
                        </div>
                        <div class="file_div ma-5 text-center d-flex flex-column align-center justify-center"
                            @click="triggerInputField()">
                            <v-icon color="black" class="file_upload_icon mb-2" large>mdi-file-upload-outline</v-icon>
                            <p>Upload your file here or <span class="browse_btn">browse</span></p>
                        </div>
                    </div>
                    <input @change="fileChangeHandle()" accept="video/*,image/*" type="file" ref="file_uploading_field"
                        style="visibility: hidden;" />
                </v-card>
            </v-col>
        </v-row>
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
            remarks: ""
        }
    },
    methods: {
        triggerInputField() {
            this.$refs.file_uploading_field.click();
        },
        fileChangeHandle() {
            this.uploadFile();
        },
        uploadFile() {
            this.selected_file = this.$refs.file_uploading_field.files[0];

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
<style scoped></style>