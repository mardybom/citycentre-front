import { parseISO, format } from "date-fns";

const Date = ({ dateString }) => {
  const date = parseISO(dateString);

  return <time dateTime={dateString}>{format(date, "d LLLL yyyy H:mm")}</time>;
};

export default Date;
