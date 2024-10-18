import Button from "@mui/material/Button";
import { useState } from "react";
import {
  createGoogleCalendarEvent,
  listGoogleCalendarEvents,
  signInWithGoogleCalendar,
} from "../services/googleCalendarService";

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  const handleGoogleCalendarLogin = async () => {
    try {
      await signInWithGoogleCalendar();
      const googleEvents = await listGoogleCalendarEvents();
      setEvents(googleEvents);
    } catch (error) {
      console.error("Error signing in with Google Calendar:", error);
    }
  };

  const handleCreateEvent = async () => {
    const newEvent = {
      summary: "New Event",
      location: "Virtual",
      description: "A new test event",
      start: {
        dateTime: "2024-10-19T10:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2024-10-19T11:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
    };

    try {
      const event = await createGoogleCalendarEvent(newEvent);
      setEvents((prev) => [...prev, event]);
    } catch (error) {
      console.error("Error creating Google Calendar event:", error);
    }
  };

  return (
    <div>
      <h1>Google Calendar Integration</h1>
      <Button variant="contained" onClick={handleGoogleCalendarLogin}>
        Sign in to Google Calendar
      </Button>
      <Button variant="contained" onClick={handleCreateEvent}>
        Create Event
      </Button>

      <h2>Your Events:</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.summary}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
