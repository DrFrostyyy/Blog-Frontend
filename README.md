# FrostByte - Frontend

A modern, responsive blog platform for developers and tech enthusiasts. Built with React and Vite.

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Styling:** CSS3 with custom design system
- **State Management:** React Context API

## Features

- **User Authentication**
  - Secure registration and login
  - JWT token management
  - Protected routes
  - Persistent sessions

- **Blog Post Management**
  - Create, read, update, delete posts
  - Rich text content support
  - Author attribution
  - Post timestamps

- **Interactive Comments**
  - Comment on posts
  - Real-time comment updates
  - Author profiles in comments

- **User Profiles**
  - View user information
  - See user's posts
  - Profile statistics
  - Clickable author links

- **Modern UI/UX**
  - Responsive design
  - Dark theme with teal accents
  - Smooth transitions
  - Loading states
  - Error handling

- **Developer Experience**
  - Hot module replacement (HMR)
  - Fast refresh
  - Clear project structure
  - Reusable components

## Design System

### Color Palette
- **Background:** `#0a0a0a` (Deep Black)
- **Cards:** `#1a1a1a` (Dark Gray)
- **Borders:** `#2a2a2a` (Medium Gray)
- **Primary Accent:** `#B7FFFA` (Frost Teal)
- **Text:** `#ffffff` (White) / `#ddd` (Light Gray)
- **Secondary Text:** `#888` (Gray)

### Typography
- **Font Family:** Inter, system-ui, sans-serif
- **Headings:** Bold, Teal accent color
- **Body:** Regular, Light gray

## Project Structure
```
blog-frontend/
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── CommentForm.jsx    # Comment input form
│   │   ├── CommentList.jsx    # Display comments
│   │   ├── Layout.jsx         # Main layout wrapper
│   │   ├── PostForm.jsx       # Post creation/edit form
│   │   └── *.css              # Component styles
│   ├── contexts/
│   │   └── AuthContext.jsx    # Authentication state
│   ├── pages/
│   │   ├── HomePage.jsx       # Landing page
│   │   ├── LoginPage.jsx      # User login
│   │   ├── RegisterPage.jsx   # User registration
│   │   ├── PostsPage.jsx      # All posts list
│   │   ├── PostDetailPage.jsx # Single post view
│   │   ├── CreatePostPage.jsx # New post creation
│   │   ├── EditPostPage.jsx   # Edit existing post
│   │   ├── MyPostsPage.jsx    # User's own posts
│   │   ├── UserProfilePage.jsx # User profile
│   │   └── *.css              # Page styles
│   ├── services/
│   │   ├── api.js             # Axios configuration
│   │   ├── commentService.js  # Comment API calls
│   │   ├── postService.js     # Post API calls
│   │   └── userService.js     # User API calls
│   ├── utils/                 # Utility functions
│   ├── App.jsx                # Main app component
│   ├── App.css                # Global app styles
│   ├── main.jsx               # App entry point
│   └── index.css              # Global styles
├── index.html                 # HTML template
├── package.json
└── vite.config.js             # Vite configuration
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:3000`

### Setup Steps

1. **Clone the repository**
```bash
   git clone https://github.com/DrFrostyyy/Blog-Frontend
   cd blog-frontend
```

2. **Install dependencies**
```bash
   npm install
```

3. **Configure API endpoint (optional)**
   
   The API endpoint is configured in `src/services/api.js`. Default:
```javascript
   baseURL: 'http://localhost:3000/api/v1'
```
   
   Update if your backend runs on a different URL.

4. **Start the development server**
```bash
   npm run dev
```

The app will start on `http://localhost:5173`

## Usage

### Development
```bash
npm run dev
```
Starts development server with hot reload

### Build for Production
```bash
npm run build
```
Creates optimized production build in `dist/`

### Preview Production Build
```bash
npm run preview
```
Preview the production build locally

## Authentication Flow

1. **Register:** Create account at `/register`
2. **Login:** Authenticate at `/login`
3. **JWT Token:** Stored in localStorage
4. **Auto-Attach:** Token automatically added to all API requests
5. **Protected Routes:** Redirect to login if not authenticated

## Pages & Routes

| Route | Component | Protection | Description |
|-------|-----------|------------|-------------|
| `/` | HomePage | Public | Landing page with hero section |
| `/login` | LoginPage | Public | User login |
| `/register` | RegisterPage | Public | User registration |
| `/posts` | PostsPage | Public | Browse all posts |
| `/posts/:id` | PostDetailPage | Public | View single post with comments |
| `/posts/create` | CreatePostPage | Protected | Create new post |
| `/posts/:id/edit` | EditPostPage | Protected | Edit own post |
| `/my-posts` | MyPostsPage | Protected | View/manage own posts |
| `/users/:id` | UserProfilePage | Public | View user profile |

## Key Components

### Layout
Provides consistent header, navigation, and footer across all pages.

### AuthContext
Global authentication state management:
- `user` - Current user info
- `token` - JWT token
- `isAuthenticated` - Auth status
- `login()` - Login function
- `logout()` - Logout function
- `register()` - Registration function

### PostForm
Reusable form for creating and editing posts with validation.

### CommentList & CommentForm
Comment display and submission components.

## Features in Detail

### Protected Routes
```jsx
<Route path="/posts/create" element={
  <ProtectedRoute>
    <CreatePostPage />
  </ProtectedRoute>
} />
```

### API Service Pattern
```javascript
// Centralized API configuration
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
});

// Auto-attach JWT token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Error Handling
- Network errors caught globally
- User-friendly error messages
- Validation feedback
- Loading states

## Customization

### Changing Colors
Update color variables in component CSS files:
```css
/* Primary accent */
color: #B7FFFA;

/* Background */
background-color: #0a0a0a;
```

### Updating Brand
Edit `Layout.jsx` and `HomePage.jsx` to change:
- Brand name
- Tagline
- Feature descriptions

## Dependencies

### Core
- `react` - UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing
- `axios` - HTTP client

### Dev Dependencies
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin for Vite
- `eslint` - Code linting

## Architecture Patterns

### Component Composition
Reusable components composed into complex UIs

### Service Layer
API calls abstracted into service modules

### Context API
Global state management without props drilling

### Protected Routes
HOC pattern for route authentication

### Custom Hooks
`useAuth()` hook for accessing auth context

## 🐛 Common Issues & Solutions

### CORS Errors
**Problem:** API requests blocked by CORS  
**Solution:** Ensure backend CORS is configured with your frontend URL

### Auth Issues
**Problem:** Protected routes not working  
**Solution:** Check JWT token in localStorage and verify it's valid

### API Connection
**Problem:** Cannot connect to backend  
**Solution:** Verify backend is running on correct port (3000)

### Build Errors
**Problem:** Build fails  
**Solution:** Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

## Deployment

### Build Production Bundle
```bash
npm run build
```

### Deploy Options
- **Vercel:** `vercel deploy`
- **Netlify:** Drag and drop `dist/` folder
- **Static Hosting:** Upload `dist/` contents to any static host

### Environment Variables
For production, update:
- API base URL in `src/services/api.js`
- Or use environment variables with Vite

## 📈 Performance

- **Code Splitting:** Automatic with Vite
- **Lazy Loading:** Routes can be lazy-loaded
- **Optimized Build:** Minified and tree-shaken
- **Fast Refresh:** Instant feedback during development

## Author

**Jana Cornejo (Frosty)**
- Program: Information Technology
- In-Game Name: Frosty

## About the Name

**FrostByte** is a play on words combining:
- **Frost** - My gaming handle "Frosty"
- **Byte** - Technology and computing
- **Frostbite** - The wordplay

## Contributing

This is a personal project. Contributions are not currently accepted.

## Support

For issues or questions, please check:
1. This README
2. Backend API documentation at `http://localhost:3000/api-docs`
3. Contact the author

## Acknowledgments

Built as part of IT4C coursework, demonstrating full-stack development skills with modern technologies.

---

**Built with ❄️ by Frosty**
