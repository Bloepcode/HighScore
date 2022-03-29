type ReturnErrorI = {
    success: boolean
    code: String
}

type ReturnSuccesWithDataI = {
    success: boolean
    data: any
}

type ReturnSuccesI = {
    success: boolean
}

class Response {
    constructor() {

    }

    static returnError(code: String): ReturnErrorI {
        return {
            success: false,
            code
        }
    }

    static returnSuccessWithData(data: any): ReturnSuccesWithDataI {
        return {
            success: true,
            data
        }
    }

    static returnSuccess(): ReturnSuccesI {
        return {
            success: true,
        }
    }
}

export default Response