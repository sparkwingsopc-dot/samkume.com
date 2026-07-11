import os
import shutil
from typing import List

from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

# Import our database configuration
from database import engine, Base, get_db

# Create all tables (if they don't exist yet)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Samku International API")

# Define the upload directory
UPLOAD_DIR = "public/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Mount the static files directory so the frontend can access uploads
# For example, an uploaded file can be accessed at /uploads/filename.ext
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Samku International API"}

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Endpoint to upload images and PDFs.
    """
    # Simple validation (optional but recommended)
    allowed_content_types = [
        "image/jpeg", "image/png", "image/gif", "application/pdf"
    ]
    
    if file.content_type not in allowed_content_types:
        raise HTTPException(
            status_code=400, 
            detail=f"Unsupported file type: {file.content_type}. Only images and PDFs are allowed."
        )

    # Secure the filename
    safe_filename = os.path.basename(file.filename)
    file_path = os.path.join(UPLOAD_DIR, safe_filename)

    # Save the file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "filename": safe_filename,
        "content_type": file.content_type,
        "url": f"/uploads/{safe_filename}",
        "message": "File uploaded successfully"
    }

# Example database endpoint structure (can be expanded later)
@app.get("/api/health")
def health_check(db: Session = Depends(get_db)):
    return {"status": "ok", "database": "connected"}
