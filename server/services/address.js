
async function checkRequest(body) {
  try {
   


    return body;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  checkRequest,
};
