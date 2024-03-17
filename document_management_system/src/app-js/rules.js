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
    name_2: (v) => {
        const re = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
        if (re.test(v)) {
            return true;
        }
        return messages.INVALID_NAME;
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
};