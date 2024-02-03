const Yup = require("yup");

const formSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
})

const validateForm = (req, res, next) => {
    const formData = req.body;
    formSchema.validate(formData)
        .then((valid) => {
            if(valid){
                console.log("form valid");
                next();
            }else{
                res.status(400).send("Invalid form")
            }
        })
        .catch((err) => {
            res.status(400).json(err.errors)
        })
}

module.exports = validateForm;