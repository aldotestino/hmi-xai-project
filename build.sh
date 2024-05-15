#!/bin/bash

echo "🏗️ Building the app" &&
docker compose build > /dev/null &&

echo "🛠️ Starting database" && 
docker compose up db -d > /dev/null &&

echo "⏳ Waiting for the database to start" &&
until docker exec hmi-db pg_isready > /dev/null ; do sleep 5 ; done &&

cd app &&

echo "📄 Generate migration files" &&
bun db:generate > /dev/null &&

echo "🏃‍♂️ Run migration" &&
bun db:migrate > /dev/null &&

cd .. &&

echo "✅ Operation completed, Shutting down the database" &&
docker compose down > /dev/null