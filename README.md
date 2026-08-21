# 🌿 GreenSquad

> **Citizen Action → Community Action → Government Intervention**

GreenSquad is a community-driven waste management and environmental action platform designed to encourage citizens to report, share, and participate in environmental activities.

The platform connects individual actions with community participation through squads, credit points, leaderboards, and social engagement. It also integrates AI-based functionality to support smarter waste management workflows.

---

## 🚀 Features

### 👤 User Authentication

- User registration
- User login
- JWT-based authentication
- Protected routes
- Secure token handling
- User logout

### 👥 Profile Management

Users can:

- View their profile
- Update name and email
- Upload or change profile pictures
- View their squad
- View credit points
- Manage their own posts

### 📱 Social Posts

Users can:

- Create environmental action posts
- Upload images
- Add descriptions
- Add location information
- View posts from other users
- Like and unlike posts
- View like counts
- Delete their own posts
- View multiple images using an image slider

### 📍 Location Detection

GreenSquad can detect the user's current location using browser geolocation.

The application:

1. Requests location permission
2. Retrieves latitude and longitude
3. Uses reverse geocoding to identify the address
4. Adds the detected location to the post

### ❤️ Like System

Posts support real-time interaction through a like system.

- Like posts
- Unlike posts
- Dynamic like count updates
- Optimistic UI updates
- Backend synchronization using API responses

### 👥 Squad System

Users belong to environmental squads and can contribute towards their squad's performance.

Current squads include:

- Carbon Cutters
- Clean Earth Crew
- Eco Crew
- Energy Champs
- Green Core
- Urban Green

Each squad can display:

- Rank
- Number of members
- Credit points
- Number of posts
- Cleanup activities

### 🏆 Leaderboard

The leaderboard highlights environmental contributions and squad performance.

It can display:

- User rankings
- Squad rankings
- Credit points
- Top contributors
- Environmental activity statistics

### 🤖 AI Integration

GreenSquad includes AI-based capabilities designed to support intelligent waste management workflows.

The project can integrate AI and computer vision models to help identify and analyze waste from uploaded images.



## 📊 Dashboard

The GreenSquad dashboard provides users with a centralized overview of community environmental activities and performance.

Users can quickly view important statistics, squad performance, and community highlights.

### Dashboard Features

#### 🌍 Community Overview
The dashboard displays important environmental activity and community statistics in one place.

It helps users understand the overall progress of the GreenSquad community.

#### 🏆 Squad Highlights
Users can view different environmental squads and their achievements.

Each squad includes information such as:

- Squad name
- Squad image
- Current rank
- Number of members
- Total credit points
- Number of posts
- Cleanup activities

Example squads include:

- Carbon Cutters
- Clean Earth Crew
- Eco Crew
- Energy Champs
- Green Core
- Urban Green

#### 💎 Credit Point System
The application uses a credit point system to encourage users to participate in environmental activities.

Users and squads can earn credit points through community participation and approved activities.

Credit points are displayed across different parts of the application, including:

- User profile
- Sidebar
- Posts
- Squad highlights
- Dashboard
- Leaderboard

#### 🥇 Rankings and Leaderboard
The dashboard and leaderboard help users compare their performance with other users and squads.

Squads can be ranked based on their overall contribution and credit points.

#### 📱 Responsive Dashboard
The dashboard is designed to work across multiple screen sizes:

- Desktop
- Laptop
- Tablet
- Mobile

The squad highlights section supports horizontal scrolling on smaller screens.

---

### 📲 Progressive Web App

GreenSquad is designed as a Progressive Web App (PWA), allowing users to experience the platform more like a mobile application.

---

## 🛠️ Technology Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- React Icons
- React Hot Toast
- JavaScript

### Backend

- Python
- Django
- Django REST Framework
- JWT Authentication

### AI / Computer Vision

- LangChain
- AI APIs
- Roboflow / Computer Vision integration
- OpenCV

### Database

- Django-supported relational database

### External Services

- Cloudinary for media storage
- OpenStreetMap / Nominatim for reverse geocoding
- Browser Geolocation API
