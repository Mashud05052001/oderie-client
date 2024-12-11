import moment from "moment";

export const IsoDateGenerator = (dateObject: any) => {
  const dateString = `${dateObject?.year}-${String(dateObject?.month).padStart(2, "0")}-${String(
    dateObject?.day
  ).padStart(2, "0")}T${String(dateObject?.hour).padStart(2, "0")}:${String(
    dateObject?.minute
  ).padStart(2, "0")}:${String(dateObject?.second).padStart(2, "0")}.${String(
    dateObject?.millisecond
  ).padStart(3, "0")}${moment()
    .utcOffset(dateObject?.offset / 60000)
    .format("Z")}`;
  const selectedDate = moment(dateString).toISOString();
  return selectedDate;
};