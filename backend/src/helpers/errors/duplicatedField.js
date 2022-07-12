export default function duplicatedField(error) {
    const errors = Object.keys(error).map(field => ({
        message:`The ${field} ${error[field]} is already in use` ,
        field
    }))
    return {
        success: false,
        errors
    }
}