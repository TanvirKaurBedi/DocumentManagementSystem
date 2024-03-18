<template>
    <v-container>
        <v-row>
            <v-col md="12">
                <h2 class="text-center">SEARCH YOUR DOCUMENT HERE</h2>
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
                    <v-menu ref="menu2" v-model="menu_2" :close-on-content-click="false" :return-value.sync="dates_2"
                        transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field class="filter" clearable outlined dense v-model="dates_2"
                                placeholder="From - To" append-icon="mdi-chevron-down" readonly v-bind="attrs"
                                v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="dates_2" no-title scrollable range>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu_2 = false">
                                Cancel
                            </v-btn>
                            <v-btn text color="primary" @click="$refs.menu2.save(dates_2)">
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-row>

                <template>
                    <v-row class="d-flex align-center justify-center">
                        <v-text-field class="filter" dense outlined v-model="inputText" label="Tag name" @keydown.enter="addChip" style="width:259px"></v-text-field>
                    </v-row>
                    <v-row class="d-flex align-center justify-center mt-2 filter">
                        <v-chip v-for="(chip, index) in chips" :key="index" class="ma-1" @click="removeChip(index)">
                            {{ chip.tag_name }}
                            <v-icon small>mdi-close</v-icon>
                        </v-chip>
                    </v-row>
                </template>

            </v-col>
            <v-spacer></v-spacer>
            <!--  -->
            <v-col md="6" cols="12" class="d-flex align-center justify-center">
                <v-row class="d-flex align-center justify-center">
                    <p>Response Here</p>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="12" class="d-flex align-center justify-center">
                <v-btn color="#F2797B" class="white--text text-capitalize" @click="submitSearchForm()">Submit</v-btn>
            </v-col>
        </v-row>
    </v-container>
    <!-- </v-card> -->
</template>
<script>
import axios from "axios"
export default {
    name: "Documents-Search",
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

            selected_department: "",
            selected_name: "",
            user_id: "",
            tags: [{ "tage_name": 'RMC' }],
            menu_2: "",
            dates_2: [],
            chips:[]
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
            if (this.inputText.trim() !== '') {
                this.chips.push({"tag_name":this.inputText.trim()});
                this.inputText = ''; // Clear the input field after adding the chip
            }
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

    submitSearchForm() {
        let data = {
            major_head: this.selected_status,
            minor_head: this.selected_department,
            from_date: this.dates_2[0],
            to_date: this.dates_2[1],
            tags: this.chips, // Corrected typo in tag_name
            uploaded_by:this.user_id,
            start: 0,
            length:12,
            // filterId: "",
            search:{}
        };

        let token = localStorage.getItem('access_token');
        const headers = {
            'token': token,
        };

        axios.post("https://apis.allsoft.co/api/documentManagement/searchDocumentEntry", data, { headers })
            .then(response => {
                console.log('Response:', response.data);
                this.verify_btn_loader = false;
            })
            .catch(error => {
                console.error('Error:', error);
                if (error) {
                    this.otp_field = "";
                    this.verify_btn_loader = false;
                }
            });
    }

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