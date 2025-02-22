import Dexie from "dexie";


const db = new Dexie("QuizDB")

db.version(1).stores({
    quizHistory: "++id, score, review, timestamp, email",
    userData: "++id, fullname, email, password"
})

export default db;