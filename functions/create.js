const moment = require("moment-timezone");
const shortid = require("shortid");
const fetch = require("node-fetch");

const getFormattedDate = date => {
  return `${date
    .utc()
    .format()
    .split(/-/)
    .join("")
    .split(":")
    .join("")}`;
};

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);
  let UTCDate;
  if (!data.allDay) {
    const startDate = `${data.eventDate} ${data.startTime
      .split(0, 2)
      .join(":")}`;
    const endDate = `${data.eventDate} ${data.endTime.split(0, 2).join(":")}`;
    const UTCDateStart = moment.tz(startDate, data.timezone);
    const UTCDateEnd = moment.tz(endDate, data.timezone);
    UTCDate = `${getFormattedDate(UTCDateStart)}|${getFormattedDate(
      UTCDateEnd
    )}`;
  } else {
    const d = parseInt(data.eventDate.split(/-/).join(""));
    UTCDate = d + "/" + (d + 1);
  }

  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${data.name}&dates=${UTCDate}&details=${data.eventDescription}`;
  const short = shortid.generate();

  await fetch("https://legitbackend.wtf/gcal_urls", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ short, long: url })
  });

  const shortUrl = `https://gcal.dotenv.dev/cal/${short}`;

  return {
    statusCode: 200,
    body: JSON.stringify({ url, shortUrl })
  };
};
