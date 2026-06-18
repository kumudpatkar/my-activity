# 🚀 Smart Job Portal AI

An AI-powered smart job portal built with **FastAPI**, **React**, and **Google Gemini AI** that helps job seekers find jobs, improve resumes, and prepare for interviews using cutting-edge AI technology.

> 🚧 Project Status: In Progress | More features being added regularly!

---

## ✨ AI Features

| Feature | Description |
|---|---|
| 🤖 AI Chat Assistant | Career guidance chatbot powered by Gemini AI |
| 📄 Resume Analyzer | AI analyzes your resume and gives improvement tips |
| 📊 ATS Checker | Check how well your resume matches a job description |
| 🎤 Voice Interview | AI-powered mock interview with voice interaction |
| 💰 Salary Predictor | Predict salary based on skills and experience |
| 📉 Skill Gap Analyzer | Find missing skills for your dream job |
| ✉️ Cover Letter Generator | AI writes personalized cover letters |
| 🗺️ Career Roadmap | Get a personalized career path plan |
| 🎯 Job Matching | AI matches you with best fitting jobs |

---

## 🛠️ Tech Stack

### Backend
- **Python** — Core programming language
- **FastAPI** — High performance REST API framework
- **MongoDB** — NoSQL database
- **Google Gemini AI** — AI/ML capabilities
- **JWT Authentication** — Secure login system

### Frontend
- **React.js** — Modern UI framework
- **Tailwind CSS** — Beautiful styling
- **Vite** — Fast build tool

---

## 📁 Project Structure

```
smart-job-portal-ai/
├── backend/
│   ├── app/
│   │   ├── models/          # Database models
│   │   ├── routes/          # API endpoints
│   │   │   ├── ai_chat_routes.py
│   │   │   ├── resume_analyzer_routes.py
│   │   │   ├── ats_checker_routes.py
│   │   │   ├── voice_interview_routes.py
│   │   │   ├── salary_predictor_routes.py
│   │   │   ├── skill_gap_routes.py
│   │   │   ├── cover_letter_routes.py
│   │   │   ├── career_roadmap_routes.py
│   │   │   └── job_routes.py
│   │   └── utils/           # Helper functions
│   └── main.py
├── frontend/
│   └── src/
│       ├── pages/           # React pages
│       └── services/        # API calls
└── README.md
```

---

## 🚀 How to Run

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the backend folder:
```
MONGO_URL=your_mongodb_url
SECRET_KEY=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

---

## 👩‍💻 Developer

**Kumud Satyawan Patkar**
- 💼 GenAI Developer | Python | AI/ML | FastAPI | RAG
- 📍 Maharashtra, India
- 📧 kumudpatkar6@gmail.com
- 🔗 [LinkedIn](https://linkedin.com/in/kumud-patkar-928180283)
- 🐙 [GitHub](https://github.com/kumudpatkar)

---

## 🌟 Star this repo if you find it useful!

