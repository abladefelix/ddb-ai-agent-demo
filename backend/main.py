from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"]
)

with open("demo_data.json") as f:
    demo_data = json.load(f)

@app.get("/api/welcome")
async def welcome():
    return {"message": "Welcome to Daniel Development Bank AI Agent Demo (Ghana)."}

@app.post("/api/chat")
async def chat(request: Request):
    body = await request.json()
    user_message = body.get("message", "")
    response = f"Hello, you said: {user_message}. How can I help you with your banking needs in Ghana today?"
    return {"response": response}
