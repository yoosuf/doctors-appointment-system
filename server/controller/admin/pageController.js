const Page = require("../../model/page");
const utils = require("../../utils/messages");
const dbService = require("../../utils/dbService");
const { MESSAGE } = require("../../config/message");

const addPage = async (req, res) => {
  try {
    let data = new Page({
      ...req.body,
    });
    let result = await dbService.createDocument(Page, data);
    res.message = `Page ${result.name} ${MESSAGE.ITEM_ADDED.message}`;
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error(error);
    return utils.failureResponse(error, res);
  }
};


const findAllPage = async (req, res) => {
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
      result = await dbService.countDocument(Page, query);
      if (result) {
        result = {
          totalRecords: result,
        };
        res.message = "All Pages have" + MESSAGE.ITEM_LIST.message;
        return utils.successResponse(result, res);
      }
      return utils.recordNotFound([], res);
    } else {
      if (req.body.options !== undefined) {
        options = {
          ...req.body.options,
        };

        if (req.body.query !== undefined) {
          query = {
            ...req.body.query,
          };
        }
        result = await dbService.getAllDocuments(Page, query, options);

        if (!result) {
          return utils.recordNotFound([], res);
        }
        res.message = "All Pages have" + MESSAGE.ITEM_LIST.message;
        return utils.successResponse(result, res);
      }
    }
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

pageList = async (req, res) => {
  try {
    let result;
    let body = { ...req.body };
    result = await dbService.getAllDocuments(Page);
    if (!result.length) {
      return utils.recordNotFound([], res);
    }
    res.message = "All Pages have" + MESSAGE.ITEM_LIST.message;
    return utils.successResponse(...result, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const getPage = async (req, res) => {
  try {
    let options = {};
    let query = {};
    query._id = req.params.id;

    if (req.body.options !== undefined) {
      options = {
        ...req.body.options,
      };
    }
    let result = await dbService.getDocumentByQuery(
      Page,
      query,
      null,
      options
    );

    if (result) {
      res.message = `Page ${result.name} has` + MESSAGE.ITEM_LIST.message;
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};
const updatePage = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };

    let result = await dbService.findOneAndUpdateDocument(
      Page,
      {
        _id: req.params.id,
      },
      data,
      {
        new: true,
      }
    );
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }

    res.message = `Page ${data.name} ` + MESSAGE.ITEM_UPDATED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const softDeletePage = async (req, res) => {
  try {
    let result = await dbService.updateDocument(
      Page,
      {
        _id: req.params.id,
      },
      {
        isDeleted: true,
      }
    );

    if (!result) {
      return utils.failedSoftDelete(res);
    }
    res.message = "Page" + MESSAGE.ITEM_DELETED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};
const partialUpdatePage = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };

    let result = await dbService.getDocumentByQuery(Page, {
      _id: req.params.id,
    });
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }
    res.message = `Page ${result.name} ` + MESSAGE.ITEM_UPDATED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error(error);
    return utils.failureResponse(error, res);
  }
};

module.exports = {
  addPage,
  findAllPage,
  getPage,
  updatePage,
  softDeletePage,
  partialUpdatePage,
  pageList,
};
