// *success response
const successResponse = (res, statusCode = 200, data) => {
    return res
        .status(statusCode)
        .json({ data, status: statusCode, success: true });
};

// *error response
const errorResponse = (res, statusCode, message, data) => {
    return res
        .status(statusCode)
        .json({ data, status: statusCode, success: false, error: message });
};

module.exports = {
    successResponse,
    errorResponse,
};
