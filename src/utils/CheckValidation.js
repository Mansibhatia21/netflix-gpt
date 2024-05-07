export const checkValidation = (...ref) => {
    const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(ref[0]);
    const isPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(ref[1]);

    if (!isEmail) {
        return 'Invalid email'
    }
    if (!isPassword) {  
        return 'Invalid password'
    }
    else {
        return null
    }
}