
//>> Screens
export { RegisterScreen } from './screens/auth/RegisterScreen';
export { RegisterPatientScreen } from './screens/auth/RegisterPatientScreen';
export { LoginScreen } from './screens/auth/LoginScreen';
export { WelcomeScreen } from './screens/start/WelcomeScreen';
export { SplashScreen } from './screens/start/SplashScreen';
export { HomeScreen } from './screens/app/home/HomeScreen';
export { ForgotPasswordScreen } from  './screens/auth/ForgotPasswordScreen';
export { ResetPasswordScreen } from  './screens/auth/ResetPasswordScreen';
export { SelectProfilePhotoScreen } from './screens/auth/SelectProfilePhotoScreen'
export { VerifyCodeScreen } from './screens/auth/VerifyCodeScreen';
export { Calendario } from './screens/app/calendar/Calendario'
export { ForgotPassCodeScreen } from './screens/auth/ForgotPassCodeScreen'
export { NotificationScreen } from './screens/app/home/NotificationScreen'
export { MyVaccines } from './screens/app/home/MyVaccines'
export { ImmunizationRecord } from './screens/auth/ImmunizationRecord';
export { SelectPatientScreen } from './screens/auth/SelectPatientScreen'
export { AppointmentMainScreen } from './screens/app/appointment/AppointmentMainScreen'
export { AppointmentProcessScreen } from './screens/app/appointment/AppointmentProcessScreen'
export { HistorialAppointment } from './screens/app/appointment/HistorialAppointment'
export { MyAcountScreen } from './screens/app/MyAcount/MyAcountScreen'
export { PatientPerfilScreen } from './screens/app/MyAcount/PatientPerfilScreen'

//?? Components
export { CustomButton } from './components/ButtonHook';
export { CustomStatusBar } from './components/CustomStatusBar';
export { DropdownComponent } from './components/DropdownComponent';
export { ShowToast } from './components/ShowToast'
export { SetLabel } from './components/SetLabel';
export { ScreenTitle } from './components/ScreenTitleHook'
export { RequestAppointmentForm } from './components/AppointmentComponents/RequestAppointmentForm'
export { PendingAppointment } from './components/AppointmentComponents/PendingAppointment'
export { NextAppointment } from './components/AppointmentComponents/NextAppointment'
export { AttendingAppointment } from './components/AppointmentComponents/AttendingAppointment'

//! Navigations
export { ApplicationTab } from './navigators/ApplicationTab';
export { HomeStack } from './navigators/Dashboard/HomeStack';
export { CalendarStack } from './navigators/Dashboard/CalendarStack';
export { AppointmentStack } from './navigators/Dashboard/AppointmentStack';

//* Queries
export { getResponsible, uploadPFResponsible, registerResponsible, verifyCodeResponsible, loginResponsible, ForgotPassQuery, CheckresetPassCode, ResetPasswordQuery, RegisterPatientsQuery, getPatients, getImmunizationRecord, createImmunizationRecord, getAllImmunizationRecords, getPatient, getMedicalRecords } from './queries/Queries';

//\\ Configs
export { toastConfig } from './components/toastConfigs';