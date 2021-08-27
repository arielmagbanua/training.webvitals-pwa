#!/usr/bin/env bash

npm run seed-production

npm run build-prod

# gcloud app deploy --project pwa-webvitals
gcloud app deploy --project pwa-webvitals-optimized
