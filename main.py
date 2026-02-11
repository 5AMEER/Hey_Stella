from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

app = FastAPI()

# Security: Only allow requests from your frontend
# In production, replace "*" with your Render frontend URL (e.g., ["https://your-site.onrender.com"])
origins = [
    "http://localhost:5173",
    "http://localhost:4173",
    "*" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        # TODO: Integrate RAG Logic here (ChromaDB + OpenAI)
        user_message = request.message
        
        # Placeholder response until we connect the LLM
        return {"response": f"Stella: I heard you say '{user_message}'. My RAG brain is initializing..."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))