const Alert = require("../../model/alert");
const utils = require("../../utils/messages");
const dbService = require("../../utils/dbService");
const { MESSAGE } = require("../../config/message");
const { checkRequest } = require("../../services/address");
const user = require("../../model/v1/user");

const addAlert = async (req, res) => {

    try {
        const body = await checkRequest(req.body);
        body.createdBy = req.user;
        body.patientId =  req.params.patientId;
        body.patient = await user.findOne({ _id: req.params.patientId }).exec();

        const data = new Alert({
            ...body,
        });
        const result = await dbService.createDocument(Alert, data);
        res.message = MESSAGE.ALERT_ADDED.message;
        return utils.successResponse(result, res);
    } catch (error) {
        logger.error("Error - addAlert", error);
        return utils.failureResponse(error, res);
    }
};

const getAllAlert = async (req, res) => {
    try {
        let options = {};
        let query = {};
        let result;
        if (req.body.isCountOnly) {
            if (req.body.query !== undefined) {
                query = {
                    ...req.body.query,
                };
            }
            result = await dbService.countDocument(Alert, query);
            if (result) {
                result = {
                    totalRecords: result,
                };
                res.message = MESSAGE.ALERT_LIST.message;
                return utils.successResponse(result, res);
            }
            res.message = MESSAGE.NO_RECORD_FOUND.message;
            return utils.recordNotFound([], res);
        } else {
            if (req.body.options !== undefined) {
                if (req.body.options.populate) {
                    delete req.body.options.populate;
                }
                options = {
                    ...req.body.options,
                };

                // Change here: Use req.params.patientId instead of req.body.query
                if (req.params.patientId !== undefined) {
                    query = {
                        patientId: req.params.patientId, // Assuming patientId is the parameter name
                        ...req.body.query,
                    };
                }
                result = await dbService.getAllDocuments(Alert, query, options);

                if (!result) {
                    res.message = MESSAGE.NO_RECORD_FOUND.message;
                    return utils.recordNotFound([], res);
                }
                res.message = MESSAGE.ALERT_LIST.message;
                return utils.successResponse(result, res);
            }
        }
    } catch (error) {
        logger.error("Error - getAllAlert", error);
        return utils.failureResponse(error, res);
    }
};


module.exports = {
    addAlert,
    getAllAlert,
};
