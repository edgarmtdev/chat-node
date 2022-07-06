import duplicatedField from "./duplicatedField";
import validationErrors from "./validationErr";

export default function hasErrors(error) {
    if (error.code === 11000) {
        return duplicatedField(error.keyValue)
    }
    return validationErrors(error)
}