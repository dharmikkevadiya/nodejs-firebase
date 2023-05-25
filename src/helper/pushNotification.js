const { messaging } = require("firebase-admin");

const sendNotification = async (tokenArr, title, body, data) => {
  console.log("tokenArr::", tokenArr);
  console.log("title::", title);
  console.log("body::", body);

  const message = {
    // to: "", //for single device
    tokens: tokenArr, // ["token1", "token2"] for Multiple device
    notification: {
      title,
      body,
    },
    //you can send only notification or only data(or include both)
    data: data,
  };

  messaging()
    .sendEachForMulticast(message)
    .then((response) => {
      console.log("Notifications sent successfully:", response);
    })
    .catch((error) => {
      console.error("Error sending notifications:", error);
    });
};

module.exports = sendNotification;
