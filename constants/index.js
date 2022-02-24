const successCodes = {
    SUCCESS_USER_CREATED:{
        code:"SUCCESS_USER_CREATED",
        message:"User Created Successfully",
    },
    SUCCESS_REGISTERED:{
        code:"SUCCESS_REGISTERED",
        message:"Registered Successfully",
    }
}

const errorCodes = {
    "ERR_INVALID_PASSWORD":{
        code:"ERR_INVALID_PASSWORD",
        message:"Password is invalid"
    },
    "ERR_INVALID_USER_OR_PASSWORD":{
        code:"ERR_INVALID_USER_OR_PASSWORD",
        message:"Email or password is wrong"
    },
    "ERR_USER_NOT_EXIST":{
        code:"ERR_USER_NOT_EXIST",
        message:"User doesnot exists"
    },
    "ERR_USER_NOT_EXIST":{
        code:"ERR_USER_NOT_EXIST",
        message:"User doesnot exists"
    },
    "ERR_USER_CREATE":{
        code:"ERR_USER_CREATE",
        message:"Error in Creating User"
    },
    "ERR_SESSION_EXPIRED":{
        code:"ERR_SESSION_EXPIRED",
        message:"Session has expired , Please login again"
    },
    "ERR_UNKNOWN":{
        code:"ERR_UNKNOWN",
        message:"Unknown error occured"
    }

}


module.exports = {
    successCodes,
    errorCodes
}
