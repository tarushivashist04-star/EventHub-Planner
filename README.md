EventHub – College Event Management Platform
EventHub is a modern and responsive college event management web application where students can discover, explore, and register for campus events, while organizers can create and manage events through a dedicated dashboard.
The platform provides event filtering, student authentication, digital QR tickets, organizer event management, past event galleries, and REST API integration.
---
✨ Features:

👨‍🎓 Student Features

- Explore upcoming campus events
- Search events by title, venue, or club
- Filter events by category, date, and organizer
- Sort events by upcoming date and popularity
- View detailed event information
- View speaker details
- Register for events
- Receive registration confirmation
- Generate digital QR tickets
- Access registered events from **My Tickets**
- Student login and registration
- Persistent login until logout

---

👨‍💼 Organizer Features

- Separate organizer login
- Protected organizer dashboard
- Create new events
- Edit existing events
- Delete events
- Add event images
- Add event date and timing
- Set event capacity and available seats
- Newly created events appear in the Explore Events section

🎯 Additional Features

- Featured event image carousel
- Past events gallery
- Campus updates through REST API
- Loading and error handling
- Responsive navigation bar
- Mobile-friendly user interface
- Persistent event data using LocalStorage

---
🛠️ Technologies Used
 Technolog:

React.js - Building the user interface 
JavaScript - Application logic and functionality 
Tailwind CSS - Styling and responsive design 
React Router DOM - Page navigation and routing 
Firebase Authentication - Student authentication 
REST API - Fetching external campus update data 
Axios - Making API requests 
Lucide React - Icons 
LocalStorage - Storing events, tickets, and login information

---
⚛️ React Concepts Used

- Components
- Props
- `useState`
- `useEffect`
- Conditional rendering
- Event handling
- Form handling
- Protected routes
- Dynamic routing
- Array methods such as `map()`, `filter()`, and `sort()`

---
📄 Pages

- Home
- Explore Events
- Event Details
- Past Events
- Student Login
- Student Registration
- My Tickets
- Organizer Login
- Organizer Dashboard

---
🎫 Event Registration Flow

1. Student creates an account or logs in.
2. Student explores available events.
3. Student opens the event details page.
4. Student fills in the registration form.
5. Registration details are saved.
6. A digital ticket is generated.
7. The student can access the ticket from **My Tickets**.
8. The QR ticket can be viewed for event entry.

---
🔐 Authentication

Student authentication is implemented using Firebase Authentication.
The logged-in student session remains active until the user clicks the Logout button.
Organizer access is protected through a separate organizer login system.

---
🌐 REST API Integration

The project uses Axios to fetch data from a REST API for the Campus Updates section.
The API integration includes:

- Data fetching
- Loading state
- Error handling
- Dynamic rendering of API data

---
📱 Responsive Design

EventHub is designed to work across:
- Desktop
- Laptop
- Tablet
- Mobile devices

The navigation bar and page layouts automatically adjust according to the screen size.

---
📸 Screenshots

Home Page:
<img width="956" height="511" alt="image" src="https://github.com/user-attachments/assets/bb7a18a9-5222-41ca-a20a-5640624cee22" />
<img width="948" height="508" alt="image" src="https://github.com/user-attachments/assets/d1d54381-5285-4b1b-a9f2-de283e3f78f1" />
<img width="946" height="506" alt="image" src="https://github.com/user-attachments/assets/1f3f3ef1-a960-4349-bcc1-c549593252b5" />
<img width="948" height="506" alt="image" src="https://github.com/user-attachments/assets/baebac6e-f8ab-4e7a-aa44-2c5044365444" />

Explore Event:
<img width="950" height="508" alt="image" src="https://github.com/user-attachments/assets/ca845e5a-91a7-4ec7-bc95-fa31e925a3f2" />
<img width="949" height="508" alt="image" src="https://github.com/user-attachments/assets/acd32cf8-8d54-4a2e-aaec-a3073a7bc95f" />
<img width="948" height="509" alt="image" src="https://github.com/user-attachments/assets/54b0594d-d171-4b10-bed5-0a420125dd95" />

Past Event:
<img width="948" height="509" alt="image" src="https://github.com/user-attachments/assets/87824c7d-ab91-4871-9cdc-802cdf1ff17d" />
<img width="948" height="507" alt="image" src="https://github.com/user-attachments/assets/64acd98d-23a5-40b3-818c-c101a9383dd6" />

Organizer Login:
<img width="947" height="508" alt="image" src="https://github.com/user-attachments/assets/ddfa9ad7-d807-4bc8-8d6a-d72a30e5fa0d" />
<img width="948" height="506" alt="image" src="https://github.com/user-attachments/assets/f3d217a0-d96e-48b6-a39b-073ed7e3c769" />

Login/Signin:
<img width="947" height="506" alt="image" src="https://github.com/user-attachments/assets/0ce11a6b-58ef-4ffd-8f9a-59349ca03597" />
<img width="950" height="509" alt="image" src="https://github.com/user-attachments/assets/3488b19e-2d01-4ee5-8fb1-8e5d917844c7" />
<img width="948" height="510" alt="image" src="https://github.com/user-attachments/assets/f4f810db-3731-4fde-b2f6-d024439d8650" />

Registraction and Ticket:
<img width="948" height="506" alt="image" src="https://github.com/user-attachments/assets/90c465ff-a837-4701-a898-c1c4b14229af" />
<img width="947" height="509" alt="image" src="https://github.com/user-attachments/assets/487f9b8e-d213-4908-b34f-d1a2c7da185b" />

