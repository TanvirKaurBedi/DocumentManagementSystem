<template>

    <v-container>
        <v-row>
            <v-col md="12">
                <h2 class="text-center">File Upload</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="12" class="text-center">
                <v-btn color="primary" @click="navigateToSearchRoute()">Navigate to Search Page</v-btn>
            </v-col>
        </v-row>
        <v-row class="d-flex align-center" style="height:80vh">

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
                <template>
                    <v-row class="d-flex align-center justify-center">
                        <v-text-field class="filter" dense outlined v-model="inputText" label="Tag name"
                            style="width:259px"></v-text-field>
                    </v-row>
                </template>

                <v-row class="d-flex align-center justify-center">
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
                <v-btn color="#F2797B" class="white--text text-capitalize mt-n15" @click="submitForm()">Submit</v-btn>
            </v-col>
        </v-row>

        <v-snackbar top right color="green" v-model="snackbar" :timeout="timeout">
            {{ text }}

        </v-snackbar>
    </v-container>
</template>
<script>
import axios from 'axios'
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
            selected_name: "",
            user_id: "",
            chips: [],
            inputText: "",
            snackbar:false,
            text:"",
            timeout:""
        }
    },
    mounted() {
        // Retrieve user ID from local storage and set it to user_id
        this.user_id = localStorage.getItem('user_id');
    },
    watch: {
        selected_status(val) {
            if (val === 'Personal') {
                this.names_list_flag = true
            } else {
                this.names_list_flag = false
            }
        }
    },
    methods: {
        addChip() {
            const words = this.inputText.trim().split(',');
            words.forEach(word => {
                if (word.trim() !== '') {
                    this.chips.push({ "tag_name": word.trim() });
                }

            });

            this.inputText = '';
            return this.chips
        },

        removeChip(index) {
            this.chips.splice(index, 1);
        },
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

        navigateToSearchRoute() {
            this.$router.push({
                name: "search_documents"
            })
        },

        submitForm() {
            // Split the date string into day, month, and year
            const [year, month, day] = this.date.split('-');

            // Format the date in the desired format
            const formattedDate = `${day}-${month}-${year}`;
            console.log('Formatted Date:', formattedDate);

            // Construct the form data
            let data = new FormData();
            data.append("file", this.selected_file); // Append the file to FormData
            data.append("data", JSON.stringify({  // Append other form data as JSON string
                major_head: this.selected_status,
                minor_head: this.selected_department,
                document_date: formattedDate, // Use the formatted date
                document_remarks: this.remarks,
                tags: this.addChip(),
                user_id: this.user_id
            }));

            let token = localStorage.getItem('access_token')
            const headers = {
                'token': token,
            };
            axios.post("https://apis.allsoft.co/api/documentManagement/saveDocumentEntry", data, { headers })
                .then(response => {
                    // Handle successful response
                    console.log('Response:', response.data);
                    this.text = "file saved"
                    this.timeout = 1000
                    this.snackbar = true
                    this.selected_status = "",
                    this.file_url = "",
                    this.selected_department = ""
                    this.date = "",
                    this.selected_name = "",
                    this.remarks = ""
                })
                .catch(error => {
                    // Handle error
                    console.error('Error:', error);
                });
        },
    },
}
</script>
<style scoped>
.pdf_img {
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

.filter {
    max-width: 259px !important
}
</style>