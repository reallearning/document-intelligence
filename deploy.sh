#!/bin/bash

# Variables
PROJECT_ID="questt-frida"
SERVICE_NAME="questt-friday-ai"
REGION="asia-south1"
IMAGE="gcr.io/$PROJECT_ID/$SERVICE_NAME"

# Authenticate with Google Cloud (skip if already authenticated)
# echo "Authenticating with Google Cloud..."
# gcloud auth login

# Set the project ID
# echo "Setting project ID to $PROJECT_ID"
# gcloud config set project $PROJECT_ID --quiet

# Build the Docker image and push it to Google Container Registry
# echo "Building Docker image and pushing to Google Container Registry..."
# gcloud builds submit --tag $IMAGE

# Deploy to Cloud Run
echo "Deploying to Cloud Run..."
gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE" \
  --platform managed \
  --region "$REGION" \
  --allow-unauthenticated

echo "Deployment completed successfully!"
