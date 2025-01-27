
# Book Review App

A MERN stack application for managing and reviewing books.

## Setup Instructions

### Prerequisites
- Node.js
- MongoDB
- npm

### Installation Steps

1. **Clone Repository**
```bash
git clone <repository-url>
cd book-review-app
```

2. **Backend Setup**

# Navigate to backend
cd backend

# Install dependencies from package.json
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/book-review-app
PORT=5000" > .env

# Start server
npm run dev
```

3. **Frontend Setup**

# Navigate to frontend
cd frontend

# Install dependencies
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Start application
npm start



### Essential Files Configuration

1. **Backend Model (models/Book.js)**
```javascript
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    yearOfPublication: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    averageRating: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
```

2. **Frontend CSS (src/index.css)**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-100;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

3. **Tailwind Configuration (tailwind.config.js)**
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. **Backend Dependencies (package.json)**
```json
{
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "mongoose": "^7.0.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

### Running the Application

1. **Start Backend Server**
```bash
cd backend
npm run dev
```

2. **Start Frontend Server**
```bash
cd frontend
npm start
```

3. **Access Application**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Features
- View list of books with ratings
- Add new books
- Write reviews and rate books
- View book details and all reviews

### Troubleshooting

1. **MongoDB Issues**
- Verify MongoDB is running
- Check connection string in .env

2. **Missing Dependencies**
- Run `npm install` in respective directories

3. **Port Conflicts**
- Change ports in .env files
- Use alternate port for frontend

### Project Structure
```
book-review-app/
├── backend/
│   ├── models/
│   │   └── Book.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   └── BookDetailPage.js
    │   ├── components/
    │   │   └── BookList.js
    │   └── index.css
    ├── .gitignore
    └── tailwind.config.js
```

### Additional Notes
- Ensure MongoDB is running before starting backend
- Both servers must be running for full functionality
- Check console for error messages
```
