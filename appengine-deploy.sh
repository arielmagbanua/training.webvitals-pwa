#!/usr/bin/env bash

npm run build

npm run seed-production

gcloud app deploy --project pwa-webvitals-unoptimized

