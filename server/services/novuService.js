const { Novu } = require("@novu/node");
const novu = new Novu(process.env.NOVU_API_KEY, {
  backendUrl: process.env.NOVU_BACKEND_URL,
});

const addSubscriber = async (user) => {
  try {
    await novu.subscribers.identify(user.id, {
      email: user?.email,
      phone: user?.phone,
      firstName: user?.firstName,
      lastName: user?.lastName,
    });
  } catch (error) {
    logger.error("Error - addSubscriber", error);
  }
};

const updateSubscriber = async (user) => {
  try {
    await novu.subscribers.update(user.id, {
      email: user?.email,
      phone: user?.phone,
      firstName: user?.firstName,
      lastName: user?.lastName,
    });
  } catch (error) {
    logger.error("Error - updateSubscriber", error);
  }
};

const sendMailNovu = async (emailData) => {
  try {
    await novu
      .trigger(emailData?.eventName, {
        to: {
          subscriberId: emailData?.user?.id,
          email: emailData?.user?.email,
          firstName: emailData?.user?.firstName,
          lastName: emailData?.user?.lastName,
        },
        payload: emailData?.payload,
      })
      .catch((err) => {
        logger.error("Error-novuSendMail", err?.response?.data);
      });
    return emailData;
  } catch (error) {
    logger.error("Error - sendMailNovu", error);
  }
};

const sendSmsNovu = async (mobileData) => {
  try {
    await novu
      .trigger(mobileData?.eventName, {
        to: {
          subscriberId: mobileData?.user?.id,
          phone: mobileData?.user?.phone,
        },
        payload: mobileData?.payload,
      })
      .catch((err) => {
        logger.error("Error-novuSendSms", err?.response?.data);
      });
    return mobileData;
  } catch (error) {
    logger.error("Error - sendSmsNovu", error);
  }
};

module.exports = {
  addSubscriber,
  updateSubscriber,
  sendMailNovu,
  sendSmsNovu,
};
