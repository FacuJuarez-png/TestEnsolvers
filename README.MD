# Notes Web Application

## 1. Introduction
This is a simple web application that allows users to create, edit, delete, and filter notes using tags. The project consists of a frontend built with React and a backend developed using Node.js with SQLite for data storage.

### **Important Clarification**
- The original documentation mentions "category/categories," but in this project, the correct term is **"tag/tags."**
- This project was developed and tested on **Windows**.

## 2. Requirements
To run this application, you need the following tools installed:

- **Node.js** (v18.17 or later)
- **npm** (v9 or later)
- **SQLite** (latest version)
- **Git** (latest version)

## 3. Installation and Setup
Follow these steps to set up and run the application:

### 3.1 Clone the Repository

  git clone <https://github.com/hirelens-challenges/JuarezRomero-8be35b>
  cd <Ensolvers>


### 3.2 Running the Application Automatically
Simply run the following script to start both the backend and frontend automatically:

  run-app.bat

This script will:
- Install dependencies
- Set up the database
- Start the backend
- Start the frontend

### 3.3 Manual Setup (If Needed)
If you prefer to start each service manually, follow these steps:

#### **Backend Setup**

  cd backend
  npm install
  npx sequelize-cli db:migrate
  npm start


#### **Frontend Setup**

  cd ../Frontend_test
  npm install
  npm start


After running these commands, the backend will be available at `http://localhost:3001`, and the frontend will be available at `http://localhost:3000`.

## 4. Features
### **Phase 1 (Mandatory)**
- Create, edit, and delete notes.
- Archive and unarchive notes.
- List active notes.
- List archived notes.

### **Phase 2 (Bonus)**
- Add and remove **tags** from notes (originally referred to as "categories").
- Filter notes by **tag**.

## 5. Technologies Used
- **Frontend:** React
- **Backend:** Node.js (Express.js)
- **Database:** SQLite (via Sequelize ORM)

## 6. Project Structure

Ensolvers
├── backend/        # Node.js backend (Express, Sequelize, SQLite)
├── Frontend_test/  # React frontend
├── run-app.bat     # Windows script to run the project
├── README.md       # Project documentation


## 7. Authentication
This application does not require user authentication.




