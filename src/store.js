import create from "zustand";
import moment from "moment-timezone";
const now =
  new Date().getFullYear() +
  "-" +
  ("0" + (new Date().getMonth() + 1)).slice(-2) +
  "-" +
  ("0" + new Date().getDate()).slice(-2);

export const useForm = create((set, get) => ({
  allDay: false,
  startTime: "1200",
  endTime: "1300",
  eventName: "",
  eventDate: now,
  eventDescription: "",
  isSubmitting: false,
  links: {},
  setField: ({ key, value }) => set({ [key]: value }),
  onSubmit: async (e) => {
    const {
      eventName,
      startTime,
      endTime,
      eventDate,
      eventDescription,
      allDay,
    } = get();
    e.preventDefault();
    set({ isSubmitting: true });
    const data = await fetch("api/create", {
      method: "POST",
      body: JSON.stringify({
        name: eventName,
        startTime,
        endTime,
        timezone: moment.tz.guess(),
        eventDate,
        eventDescription,
        allDay,
      }),
    }).then((d) => d.json());
    set({ isSubmitting: false, links: data });
  },
}));
