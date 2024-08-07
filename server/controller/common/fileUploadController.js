const utils = require("../../utils/messages");
const service = require("../../utils/dbService");
const File = require("../../model/file");
const _ = require("lodash");
const fileData = async (file, folder) => {
  // if (!file.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
  //     //req.fileValidationError = 'Only image files are allowed!';
  //    throw new Error("Only image files are allowed")
  // }
  // if (file.size / (1024 * 1024).toFixed(2) > 5) {
  //     utils.failureResponse({message: 'Your image size is more than 5 mb'}, res);
  // }

  const uri = `${folder}/${new Date().getTime()}-${file.name}`.replace(
    / /g,
    "_"
  );
  file.mv(`./public/${uri}`);
  const data = {
    name: `${new Date().getTime()}-${file.name}`,
    originalName: file.name,
    mimetype: file.mimetype,
    size: file.size,
    type: file.type,
    uri: `/${uri}`,
    type: file.mimetype,
  };
  return data;
};

module.exports = {
  fileUpload: async (req, res) => {
    try {
      if (!req.files) {
        return utils.failureResponse(
          {
            message: "No file uploaded",
          },
          res
        );
      } else {
        let result;
        let files = req.files.file;
        const folder = req.body.folder;
        if (!req.body.hasOwnProperty("folder")) {
          return utils.failureResponse(
            {
              message: "Folder field is required.",
            },
            res
          );
        }
        if (Array.isArray(files) === false) {
          const data = await fileData(files, folder);
          result = await service.createDocument(File, data);
          res.message = "Your file is uploaded";
        } else {
          result = [];
          await Promise.all(
            _.map(files, async (file) => {
              const data = await fileData(file, folder);
              result.push(await service.createDocument(File, data));
            })
          );
          res.message = "Your files are uploaded";
        }
        return utils.successResponse(result, res);
      }
    } catch (error) {
      logger.error("Error - fileUpload", error);
      return utils.failureResponse(error, res);
    }
  },
};
