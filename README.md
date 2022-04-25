# kinobu-api
🧠 The backend for Kinobu uses NestJS.





one-modeule/
__one-service
__one-controller

two-module/
__two-service
__two-controller

two-controller использует мтеоды: one-service и two-service

two-controller -> one-service -> абстракция над методами -> two-service
