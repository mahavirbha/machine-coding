# Machine Coding Playground

Routes are created per challenge folder (progressbar, accordion, tabs, calculator) with an optional numeric solution parameter.

## Quick start

1) Install deps: `npm install`
2) Run dev server: `npm run dev`

Vite currently requires Node 20.19+ or 22.12+. Local Node 22.11 logs an engine warning; upgrade if the dev server fails.

## Routing

- Home: `/`
- Progress bar: `/progressbar/:solution?`
- Accordion: `/accordion/:solution?`
- Tabs: `/tabs/:solution?`
- Calculator: `/calculator/:solution?`

If a solution number is missing or unknown, the first available solution for that challenge is used.

## Adding a new solution

1) Create a numbered folder under `src/features/<challenge>/<number>/` with a React component export.
2) Register it in `src/App.jsx` inside the `solutions` map for that challenge.
3) (Optional) Add the challenge metadata to the `features` array to show it on the home page.
