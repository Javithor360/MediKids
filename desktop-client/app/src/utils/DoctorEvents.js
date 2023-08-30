let eventGuid = 0;
// const todayStr = new Date().toISOString().replace(/T.*$/, '')

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
              start: new Date(app.Date),
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
