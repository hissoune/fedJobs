import { showMessage } from "react-native-flash-message";



export const showSuccessMessage = (message:string)=>{
    return showMessage({
        message,
        type: "success",
        backgroundColor: "#06923E",
        color: "#FFFFFF",
        duration: 3000,
    });
}
export const showErrorMessage = (message:string)=>{
    return showMessage({
        message,
        type: "danger",
        backgroundColor: "#FF0000",
        color: "#FFFFFF",
        duration: 3000,
    });
}