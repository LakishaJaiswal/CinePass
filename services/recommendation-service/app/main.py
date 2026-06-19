from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
from pymongo import MongoClient
import os

app = FastAPI(title="BookMyShow Recommendation Engine", version="1.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔌 Explicitly use your verified Windows Gateway loopback IP address
MONGO_URI = "mongodb://172.24.224.1:27017/"
client = MongoClient(MONGO_URI)
db = client["recommendation_db"]

MOVIE_POOL = [
    {"id": 1, "title": "Jawan", "genre": "Action • Thriller • Drama", "image": "https://upload.wikimedia.org/wikipedia/en/3/39/Jawan_film_poster.jpg"},
    {"id": 2, "title": "Kalki 2898 AD", "genre": "Sci-Fi • Epic • Action", "image": "https://upload.wikimedia.org/wikipedia/en/4/4c/Kalki_2898_AD.jpg"},
    {"id": 3, "title": "Drishyam 2", "genre": "Mystery • Thriller • Crime", "image": "https://media-cache.cinematerial.com/p/500x/qlgtumf5/drishyam-2-indian-movie-poster.jpg?v=1665826403"},
    {"id": 4, "title": "Stree 2", "genre": "Comedy • Horror • Mystery", "image": "https://tse2.mm.bing.net/th/id/OIP.Jbb8pMOB0RvJe0xpx4FvLQHaLH?rs=1&pid=ImgDetMain&o=7&rm=3"},
    {"id": 5, "title": "Animal", "genre": "Action • Crime • Drama", "image": "https://upload.wikimedia.org/wikipedia/en/9/90/Animal_%282023_film%29_poster.jpg"},
    {"id": 6, "title": "Pathaan", "genre": "Action • Spy • Thriller", "image": "https://upload.wikimedia.org/wikipedia/en/c/c3/Pathaan_film_poster.jpg"},
    {"id": 7, "title": "Fighter", "genre": "Action • Thriller • Patriotic", "image": "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/01/fighter-2024-movie-poster.jpg"},
    {"id": 8, "title": "Dunki", "genre": "Drama • Comedy • Social", "image": "https://uaetimes.ae/wp-content/uploads/2023/12/Dunki.jpeg"},
    {"id": 9, "title": "Leo", "genre": "Action • Thriller • Crime", "image": "https://images.indianexpress.com/2023/09/leo1-1.jpg"},
    {"id": 10, "title": "Salaar", "genre": "Action • Crime • Thriller", "image": "https://media-cache.cinematerial.com/p/500x/97r67qou/salaar-indian-movie-poster.jpg?v=1698004556"},
    {"id": 11, "title": "Brahmastra", "genre": "Fantasy • Adventure • Action", "image": "https://static0.srcdn.com/wordpress/wp-content/uploads/2024/08/brahmastra.jpg?q=49&fit=contain&w=480&dpr=2"},
    {"id": 12, "title": "Kantara", "genre": "Action • Thriller • Divine", "image": "https://stat4.bollywoodhungama.in/wp-content/uploads/2025/07/Kantara-A-Legend-Chapter-1.jpg"}
]

@app.get("/")
def read_root():
    return {"status": "online", "service": "recommendation-service"}

@app.get("/api/recommendations/user/{user_id}", response_model=List[Dict])
def get_recommendations(user_id: int):
    # Query your Windows MongoDB Compass instance live document
    user_doc = db.user_preferences.find_one({"user_id": user_id})
    
    if user_doc and "preferred_genres" in user_doc:
        target_genres = user_doc["preferred_genres"]
    else:
        # Fallback array if database is unreachable
        target_genres = ["Action • Thriller • Drama", "Mystery • Thriller • Crime"]

    recommended_list = []
    for movie in MOVIE_POOL:
        # Check if the movie genre matches any of the genres stored in MongoDB Compass!
        if movie["genre"] in target_genres:
            try:
                rank = target_genres.index(movie["genre"])
                score_percentage = 98 - (rank * 4)
            except ValueError:
                score_percentage = 85
                
            recommended_list.append({
                "id": movie["id"],
                "title": movie["title"],
                "genre": movie["genre"],
                "image": movie["image"],
                "score": f"Match {score_percentage}%"
            })

    return recommended_list
