```markdown
# Full Stack Project (Django + React)

This project is built with a **Django backend** and a **React frontend**.  
Django provides the REST API using its default authentication system (SQLite as the database), while React serves as the client-side application.

---

## 📂 Project Structure

```

project-root/
│── backend/   # Django backend
│── client/    # React frontend

````

---

## ⚡ Prerequisites

Make sure you have the following installed:

- [Python 3.x](https://www.python.org/downloads/)
- [pip](https://pip.pypa.io/en/stable/installation/)
- [Node.js](https://nodejs.org/) (with npm or yarn)

---

## 🚀 Setup Instructions

### 1️⃣ Backend (Django)

1. Navigate to the backend folder:
   ```bash
   cd backend
````

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Apply database migrations:

   ```bash
   python manage.py migrate
   ```

4. (Optional) Create a superuser for the Django admin:

   ```bash
   python manage.py createsuperuser
   ```

5. Start the backend server:

   ```bash
   python manage.py runserver
   ```

   The backend will run at: **[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**

---

### 2️⃣ Frontend (React)

1. Open a new terminal and navigate to the client folder:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend will run at: **[http://localhost:5173/](http://localhost:5173/)** (default Vite port).

---

## 🗄️ Database

* The backend uses **SQLite** by default (auto-generated `db.sqlite3` inside the `backend` project folder).
* No extra setup required.

---

## 🔑 Authentication

* The project uses **Django's default authentication system**.
* You can create users via the **Django Admin Panel** (`/admin/`) or API endpoints if configured.

---

## 🛠️ Development Notes

* Run **backend** and **frontend** servers **simultaneously** for development.
* API requests from React should be configured to call the Django server ([http://127.0.0.1:8000/](http://127.0.0.1:8000/)).
* Update `.env` files as needed for API base URLs.

---

## 📜 License

This project is for learning and development purposes.
Feel free to customize and extend it.

```
