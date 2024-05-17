let eventGuid = 0;
// const todayStr = new Date().toISOString().replace(/T.*$/, '')

const createAppmtDateTime = (date, hour) => {
  let HoursSQL = hour.split(':');
  let appointment_hour = new Date(date);

  appointment_hour.setHours(HoursSQL[0]);
  appointment_hour.setMinutes(HoursSQL[1]);
  appointment_hour.setSeconds(HoursSQL[2]);

  return appointment_hour;
}

export const DoctorEvents = (appointments, patient) => {
  let events = [];
  appointments.map((app) => {
    if (app.State === 0 || app.State === 2 || app.State === 3 || app.State === 4) {
      
      patient.map(
        (item) => {
          if(item.id === app.Patient_id) {
            events.push({
              id: app.id,
              title: `Consulta con paciente`,
              description: `${app.Description}`,
              patient: `${item.First_Names} ${item.Last_Names}`,
              start: createAppmtDateTime(app.Date, app.Hour),
            });
          }
        }
      );
    }
  });
  return events;
};

export function createEventId() {
  return String(eventGuid++);
}
