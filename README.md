Asteroid NEO Stats
User Flow
1. Landing Page
Upon loading the app, the user is greeted with the title "Asteroid NEO Stats" in glowing text, along with a beautiful space-themed background. The app interface is simple and clean, focusing on two date pickers and a button to fetch the asteroid data.

2. Selecting a Date Range
The user must select a start and end date using the two date pickers:

Start Date: The user chooses a start date from the first date picker.
End Date: The user chooses an end date from the second date picker.
Constraints:
The selected date range cannot exceed 7 days.
The end date cannot be earlier than the start date.
If either constraint is violated, an alert will be shown, asking the user to correct their date selection.
3. Fetching Data
After selecting the date range, the user clicks the "Get Stats" button to fetch asteroid data from the NASA API.

4. Loading State
Once the user clicks the button, a loading spinner appears, covering the entire screen and indicating that data is being fetched.

The loader is displayed while waiting for the data and disappears once the data is successfully fetched.
If the data retrieval fails or there's an error, a message will be shown in the console, and the loading state will stop.
5. Viewing the Asteroid Stats
Once the data is successfully fetched, the app displays the following sections:

a. Asteroid Stats Cards
Three stat cards will appear showing:

Fastest Asteroid - The fastest asteroid detected in the selected date range.
Closest Asteroid - The closest asteroid that passed by Earth during that time.
Average Size - The average size of asteroids detected in the chosen range.
b. Total Asteroids
This section shows the total number of asteroids detected during the selected date range, along with a count of the total asteroids.

c. Chart
A chart visualizing the daily number of asteroids for the selected date range is displayed below the stats. This gives the user an idea of how many asteroids were detected on each day.

6. Updating Data with New Dates
If the user selects a different date range and clicks the "Get Stats" button again:

The loading screen will reappear.
The asteroid stats and chart will be updated to reflect the new data fetched from the NASA API.
The user can repeat this process as many times as desired.















# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
