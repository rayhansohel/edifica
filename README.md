<div align="center">
  <img height="" src="https://github.com/rayhansohel/edifica/blob/main/src/assets/images/edifica.png" />
</div>

# **EDIFICA**  
## *A Building Management System*

### **Project Purpose**
Edifica is a comprehensive Building Management System (BMS) designed for a single building. It provides intuitive interfaces for users, members, and administrators to efficiently manage apartments, agreements, payments, and announcements.

### **Live Site URL**
[Edifica Live](https://edificaa.netlify.app)

### **Admin Credentials**
- **Admin Email**: hello@rayhansohel.com  
- **Admin Password**: Rayhan1234

---

## **Key Features**
1. **Responsive Design**: Ensures seamless usability on mobile, tablet, and desktop devices.
2. **Authentication System**: Supports email-password and social authentication (Google/GitHub).
3. **Dynamic Navbar**: Displays user profile and dropdown for logged-in users.
4. **Home Page Features**:
   - Automatic banner image slider.
   - Fancy building details and location information.
   - Prominent coupon display section.
5. **Apartments Page**:
   - Lists all available apartments with detailed information.
   - Paginated view (6 apartments per page).
   - Search functionality by rent range.
6. **Dashboard**:
   - **User Dashboard**: Profile details and announcements.
   - **Member Dashboard**: Additional functionalities like payments and payment history.
   - **Admin Dashboard**: Management of members, agreements, coupons, and announcements.
7. **Interactive Forms**: Uses SweetAlert2/toast notifications for CRUD operations and authentication success.
8. **Optimized Data Fetching**: Utilizes TanStack Query for efficient data retrieval (GET operations).
9. **Security Measures**:
   - **Environment Variables**: Secure handling of Firebase and API keys.
   - **JWT Protection**: Authentication and secured private routes.
10. **Smooth Animations**: Optional Framer Motion integration for improved UI experience.

---

## **Technologies Used**
- **Front-End**:
  - React.js (UI development)
  - Tailwind CSS & DaisyUI (Styling)
  - React Router DOM (Routing)
  - Framer Motion (Animations)
- **Authentication & Backend**:
  - Firebase Authentication (User management)
  - JWT (Authentication security)
  - Express.js & MongoDB (Data storage and API handling)
- **Data Handling & UI Enhancements**:
  - TanStack Query (Data fetching and state management)
  - SweetAlert2 (Notifications and user feedback)
  
---

## **Dependencies**
```json
{
  "react": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "firebase": "^9.0.0",
  "@tanstack/react-query": "^4.0.0",
  "sweetalert2": "^11.0.0",
  "framer-motion": "^10.0.0"
}
```

---

## **How to Run the Project Locally**
Follow these steps to set up and run Edifica on your local machine:

### **1. Clone the Repository**
```sh
git clone https://github.com/rayhansohel/edifica.git
cd edifica
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Set Up Environment Variables**
Create a `.env.local` file in the root directory and add your Firebase and API keys:
```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_API_URL=your_backend_api_url
```

### **4. Start the Development Server**
```sh
npm run dev
```
The project will be available at `http://localhost:5173`

---

## **Resources & Links**
- **Live Demo**: [Edifica Live](https://edificaa.netlify.app)
- **GitHub Repository**: [Edifica Repo](https://github.com/rayhansohel/edifica)
- **Firebase Docs**: [Firebase](https://firebase.google.com/docs)
- **TanStack Query Docs**: [TanStack Query](https://tanstack.com/query/latest/docs/react)
- **SweetAlert2 Docs**: [SweetAlert2](https://sweetalert2.github.io/)

---

For any queries or contributions, feel free to reach out!
