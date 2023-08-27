let eventGuid = 0
// let todayStr = new Date().toISOString().replace(/T.*$/, '') 
const todayStr = '2023-10-31' // YYYY-MM-DD

const appointmentTime = "15:30:00";
const formattedTime = "T" + appointmentTime;

console.log(formattedTime);

export const DoctorEvents = [
  {
    id: createEventId(),
    title: `Cita con Josef Mengele`,
    start: todayStr + formattedTime
  },
  {
    id: createEventId(),
    title: `Cita con Josef Mengele`,
    start: todayStr + formattedTime
  },
  {
    id: createEventId(),
    title: `Cita con Josef Mengele`,
    start: todayStr + formattedTime
  }
]

export function createEventId() {
  return String(eventGuid++)
}