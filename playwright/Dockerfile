FROM mcr.microsoft.com/playwright:v1.49.0-jammy
WORKDIR /app
COPY . .
RUN npm install
RUN npx playwright install
CMD [ "npx", "playwright", "test" ]