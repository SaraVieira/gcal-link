const moment = require("moment-timezone");

const getFormattedDate = (date) => {
  return `${date.utc().format().split(/-/).join("").split(":").join("")}`;
};

export default function handler(req, res) {
  const data = JSON.parse(req.body);
  let UTCDate;
  if (!data.allDay) {
    const startDate = `${data.eventDate} ${data.startTime
      .split(0, 2)
      .join(":")}`;
    const endDate = `${data.eventDate} ${data.endTime.split(0, 2).join(":")}`;
    const UTCDateStart = moment.tz(startDate, data.timezone);
    const UTCDateEnd = moment.tz(endDate, data.timezone);
    UTCDate = `${getFormattedDate(UTCDateStart)}/${getFormattedDate(
      UTCDateEnd
    )}`;
  } else {
    const d = parseInt(data.eventDate.split(/-/).join(""));
    UTCDate = d + "/" + (d + 1);
  }

  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${data.name}&dates=${UTCDate}&details=${data.eventDescription}`;

  res.status(200).json({ url });
}
