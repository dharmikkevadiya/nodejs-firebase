const FCM = require("fcm-node");
const serverKey = "";

const sendNotification = async (tokenArr, title, body, data) => {
  const fcm = new FCM(serverKey);
  console.log("tokenArr::", tokenArr);
  console.log("title::", title);
  console.log("body::", body);

  const message = {
    // to: "", //for single device
    registration_ids: tokenArr, // ["token1", "token2"] for Multiple device
    notification: {
      title,
      body,
    },
    //you can send only notification or only data(or include both)
    data: data,
  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!" + err);
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
};

module.exports = sendNotification;
