export const isValidPassword = (value) => {
    // return /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])[0-9a-zA-Z]{8,}$/.test(value)
    return /^.*(?=.{8,})(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*[!@#$%^&_=\-\+*?\(\)]).*$/.test(value)
}