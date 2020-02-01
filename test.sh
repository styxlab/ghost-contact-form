#!/bin/bash


contact="https://api.your-server.com/v1/contact"

curl -v -X POST ${contact} -H "Content-Type: application/json" \
	-d '{"email": "test@example.com", "name": "John Izzo", "subject": "feedback", "message": "Production Light!"}' 
	