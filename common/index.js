const Yup = require('yup');

const formSchema= Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required").min(5, "Password is too short")
})

module.exports = { formSchema };