FROM python:3.10-slim

WORKDIR /usr/src/app

# Force unbuffered terminal tracking so logs stream out immediately
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/usr/src/app

# Copy files over but we will explicitly ignore host venv using compose rules
COPY . .

# Explicitly install your microservice framework requirements directly to global container layer
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir fastapi uvicorn redis requests pika pymongo

EXPOSE 5008

# Start the application pointing explicitly to the structural app/main.py module frame
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5008"]
