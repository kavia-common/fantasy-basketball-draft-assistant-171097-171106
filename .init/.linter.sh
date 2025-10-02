#!/bin/bash
cd /home/kavia/workspace/code-generation/fantasy-basketball-draft-assistant-171097-171106/fantasy_basketball_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

