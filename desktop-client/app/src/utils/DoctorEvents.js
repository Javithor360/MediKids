let eventGuid = 0
// const todayStr = new Date().toISOString().replace(/T.*$/, '') 
const todayStr = '2023-09-12' // YYYY-MM-DD
const appointmentTimeStart = "15:30:00";
const appointmentTimeEnd = "16:30:00";
const formattedTimeStart = "T" + appointmentTimeStart;
const formattedTimeEnd= "T" + appointmentTimeEnd;


export const DoctorEvents = [
  {
    id: createEventId(),
    title: `Cita de control`,
    start: todayStr + formattedTimeStart,
    end: formattedTimeEnd,
    description: 'Cita de control con el paciente Javier Mejía'
  }
]

export function createEventId() {
  return String(eventGuid++)
}