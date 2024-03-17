import messages from './messages.js';

export default {
    required: (value) => (value !== null && value !== "") || messages.FIELD_REQURIED,
    gst_required: (value) => value != null || messages.FIELD_REQURIED,
    price: (value) => value != null || messages.PRICE_REQURIED,
    required_array: (value) => !!value[0] || messages.FIELD_REQURIED,
    email: (v) => {
        /* eslint-disable-next-line no-useless-escape*/
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(String(v).toLowerCase().trim())) {
            return true;
        }
        return messages.EMAIL_MUST_BE_VALID;
    },
    date_of_birth: (v) => {
        if (!v) {
            return 'Date of birth is required';
        }

        const re = /^\d{4}-\d{2}-\d{2}$/;
        if (!re.test(v)) {
            return 'Date should be in YYYY-MM-DD format';
        }

        const currentDate = new Date();
        const inputDate = new Date(v);
        if (inputDate > currentDate) {
            return 'Date of birth cannot be in the future';
        }

        return true;
    },

    otp: (v) => {
        const re = /^[0-9]{1,6}$/;
        if (re.test(v)) {
            return true;
        }
        return messages.FIELD_REQURIED;
    },
    email_optional: (v) => {
        /* eslint-disable-next-line no-useless-escape*/
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(v).toLowerCase().trim()) || !v) {
            return true;
        }
        return messages.EMAIL_MUST_BE_VALID;
    },
    email2: (v) => {
        /* eslint-disable-next-line no-useless-escape*/
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (v !== null && String(v).trim()) {
            if (re.test(String(v).toLowerCase().trim())) {
                return true;
            }
            return messages.EMAIL_MUST_BE_VALID;
        }
        return true;
    },
    phone: (v) => {
        const re = /^(\+91)?[0]?(91)?[6789]\d{9}$/;
        if (re.test(v)) {
            return true;
        }
        return messages.INVALID_MOBILE_NUMBER_ERROR;
    },
    // name: (v) => {
    //     const re = /^\S.*[a-zA-Z\s]*$/g;
    //     const re2 = /^[0-9]+$/;
    //     if (re.test(v) && !re2.test(v)) {
    //         return true;
    //     }
    //     return messages.INVALID_NAME;
    // },
    // name_2: (v) => {
    //     const re = /^[a-zA-Z]+ [a-zA-Z]+$/
    //     const re2 = /^[a-zA-Z]+$/
    //     if (re.test(v) || re2.test(v)) {
    //         return true;
    //     }
    //     return messages.INVALID_NAME;
    // },
    name_2: (v) => {
        const re = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
        if (re.test(v)) {
            return true;
        }
        return messages.INVALID_NAME;
    },
    // amount_valid: (v) => {
    //     // console.log("ggg", v);
    //     let value = v.replace(/,/g, "").replace(/₹/g, "");
    //     // console.log("vvv", value);
    //     if( value >= 500000 && value <= 10000000 ){
    //         // console.log("I m true")
    //         return true;
    //     }
    //     // console.log("I m false")
    //       return messages.AMOUNT_NOT_VALID;
    //   },
    city: (v) => {
        const re = /^[a-zA-Z ]+$/;
        if (re.test(v)) {
            return true;
        }
        return messages.INVALID_CITY;
    },
    state: (v) => {
        const re = /^[a-zA-Z-. ]+$/;
        if (re.test(v)) {
            return true;
        }
        return messages.INVALID_STATE;
    },
    phone_optional: (v) => {
        const re = /^(\+91)?[0]?(91)?[6789]\d{9}$/;
        if (v === null || v === "") {
            return true;
        } else if (re.test(v)) {
            return true;
        }
        return messages.INVALID_MOBILE_NUMBER_ERROR;
    },
    account_number: (v) => {
        // console.log(v)
        const re = /^[0-9]{9,18}$/;
        if (re.test(v)) {
            return true;
        }
        return messages.INVALID_ACCOUNT_NUMBER;
    },
    text: (v) => {
        const re = /^[A-Za-z\s]+$/;
        if (re.test(v)) {
            return true;
        }
        return messages.ONLY_CHARACTER;
    },
    NUMBER: (v) => {
        const re = /^[0-9]+$/;
        if (re.test(v)) {
            return true;
        }
        return messages.ONLY_NUMBER;
    },
    mobile_number: (v) => {
        const re = /^(\+91)?[0]?(91)?[6789]\d{9}$/;
        if (re.test(v)) {
            return true;
        }
        else if(!isNaN(parseFloat(v)) && v >= 5000000000 && v <= 9999999999){
            return true
        }
        return messages.INVALID_MOBILE_NUMBER_ERROR;
    },
    FLOAT_NUMBER: (v) => {
        const re = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/;
        if(re.test(v)){
            return true;
        }
        return messages.FLOAT_NUMBER; 
      },
    AMOUNT: (v) => {
        const re = /^[0-9]+$/;
        if (re.test(v)) {
            return true;
        }
        return messages.AMOUNT_NOT_VALID;
    },
    FLOAT_AMOUNT: (v) => {
        const re = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/;
        if (re.test(v)) {
            return true;
        }
        return messages.AMOUNT_NOT_VALID;
    },
    url: (v) => {
        const re = /^(http|https):\/\/+[\www\d]+\.[\w]+(\/[\w\d]+)?/;
        if (re.test(v) || !v) {
            return true;
        }
        return messages.INVALID_URL;
    },
    aadharValidation: (v) => {
        const re = /^\d+$/;
        if (String(v).length === 12 && re.test(v)) {
            return true;
        }
        return messages.INVALID_AADHAAR_NUMBER;
    },
    pinCode: (v) => {
        const re = /^\d+$/;
        if (String(v).length === 6 & re.test(v)) {
            return true;
        }
        return messages.PIN_CODE;
    },
    ifsc_code: (v) => {
        const re = /^[A-Z]{4}0[A-Z0-9]{6}$/;
        if (re.test(v)) {
            return true;
        }
        return messages.INVALID_IFSC_CODE;
    },
    acc_no: (v) => {
        if (
            parseInt(v.toString().length) > 8 &&
            parseInt(v.toString().length) < 18
        ) {
            return true;
        }
        return messages.INVALID_ACCOUNT_NUMBER;
    },
    pan_number: (v) => {
        // console.log(v)
        const re = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (re.test(v)) {
            return true;
        }
        return messages.INVALID_PAN_NUMBER;
    },
    gst_number: (v) => {
        const re = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (re.test(v)) {
            return true;
        }
        return messages.INVALID_GST;
    },

};