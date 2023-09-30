"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
exports.default = (schema, property = constants_1.RequestType.BODY) => {
    return (req, res, next) => {
        const options = {
            abortEarly: true,
            allowUnknown: true,
            convert: true
        };
        // @ts-ignore
        const { error } = schema.validate(req[property], options);
        const valid = error == null;
        if (valid) {
            return next();
        }
        else {
            const messages = error.details.map((err) => err.message).join(",");
            return res.status(constants_1.StatusCode.OK).json({
                success: false,
                message: messages
            });
        }
    };
};
