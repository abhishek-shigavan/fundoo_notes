import axios from "axios";

const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
    },
}

const configForAddNotes = {
    headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("accessToken")
    }
}

const configForGetNotes = {
    headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken")
    }
}

const configForNotesOpeartion = {
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken")
    }
}

export const HandleRequest = async function(obj, requestName) {
    let response;

    if (requestName === "/user/login") {
        response = await axios.post(`${process.env.REACT_APP_BASE_URL}${requestName}`, obj, );
        localStorage.setItem('accessToken', response.data.id);
        localStorage.setItem('FirstName', response.data.firstName);
        localStorage.setItem('LastName', response.data.lastName);
        localStorage.setItem('EmailId', response.data.email);
    } else if (requestName === "/user/userSignUp") {
        response = await axios.post(`${process.env.REACT_APP_BASE_URL}${requestName}`, obj, );
    }


    if (requestName === "/user/reset") {
        response = await axios.post(`${process.env.REACT_APP_BASE_URL}${requestName}`, obj, );
    }

    if (requestName === "/user/reset-password") {
        response = await axios.post(`${process.env.REACT_APP_BASE_URL}${requestName}`, obj, config);
    }

    if (requestName === "/notes/addNotes") {
        response = await axios.post(`${process.env.REACT_APP_BASE_URL}${requestName}`, obj, configForAddNotes);
    }

    if (requestName === "/notes/getNotesList") {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${requestName}`, configForGetNotes);
        let noteArray = response.data.data.data
        return noteArray;
    }
    console.log(response);
    return response;
}

// export const ResetRequest = async function(obj, requestName) {
//     const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${requestName}`, obj, config);
//     console.log(response);
//     return response;
// }

export const AddNotesRequest = async function(obj, requestName) {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${requestName}`, obj, configForAddNotes);
    console.log(response);
    return response;
}

export const GetListOfNotes = async function(requestName) {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${requestName}`, configForGetNotes);
    let noteArray = response.data.data.data;
    return noteArray;
}

export const GetNotesOperation = async function(obj, requestName) {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${requestName}`, obj, configForNotesOpeartion );
    console.log(response);
    // return response;
}