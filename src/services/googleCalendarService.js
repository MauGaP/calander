import { gapi } from "gapi-script";

const CLIENT_ID = import.meta.env.VITE_FIREBASE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_FIREBASE_GOOGLE_API_KEY;
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

// Initialize the Google API Client
export const initGoogleCalendar = async () => {
  return new Promise((resolve, reject) => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          // Resolve once gapi is initialized
          resolve(true);
        })
        .catch((error) => {
          console.error("Error initializing Google API client:", error);
          reject(error);
        });
    });
  });
};

// Function to sign in and authorize Google Calendar access
export const signInWithGoogleCalendar = async () => {
  // Ensure the gapi client is initialized before attempting to sign in
  await initGoogleCalendar();

  const GoogleAuth = gapi.auth2.getAuthInstance();
  if (!GoogleAuth) {
    throw new Error(
      "GoogleAuth instance not found. Make sure auth2 is initialized properly."
    );
  }

  return await GoogleAuth.signIn();
};

// Function to create an event in Google Calendar
export const createGoogleCalendarEvent = async (event) => {
  await initGoogleCalendar(); // Ensure gapi is initialized before making API calls
  const response = await gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });
  return response.result;
};

// Function to list Google Calendar events
export const listGoogleCalendarEvents = async () => {
  await initGoogleCalendar(); // Ensure gapi is initialized before making API calls
  const response = await gapi.client.calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    showDeleted: false,
    singleEvents: true,
    orderBy: "startTime",
  });
  return response.result.items;
};
