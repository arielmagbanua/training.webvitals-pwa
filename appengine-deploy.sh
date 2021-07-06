#!/usr/bin/env bash

npm run build

npm run seed

gcloud app deploy --project pwa-webvitals
