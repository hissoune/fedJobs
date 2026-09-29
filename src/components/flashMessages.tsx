import { showMessage } from "react-native-flash-message";



export const showSuccessMessage = (message:string)=>{
    return showMessage({
        message,
        type: "success",
        backgroundColor: "#16A34A",
        color: "#FFFFFF",
        duration: 3000,
    });
}
export const showErrorMessage = (message:string)=>{
    return showMessage({
        message,
        type: "danger",
        backgroundColor: "#BC0202",
        color: "#FFFFFF",
        duration: 3000,
    });
}