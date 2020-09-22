This project provides a simple UI for accessing GitHub's repo search API

## Approach and Further Work

* This app leverages the unauthenicated GitHub API, meaning that the number of queries are subject to rate limits by the hour
* Leverages GitHub's Octokit API client
* Leverages Material-UI for styling
* A few basic tests to demonstrate approach
* This app provides basic functionality around searching repos, including sorting, filtering, and pagination
* Rather than leverage the limited scope of languages available from the API for language filtering, this app utilizes a small subset of common languges

Further work includes:
* Increase test coverage for more edge cases and data types (introduce Typescript)
* Stronger emphasis on UI/UX (loading indicators, more attractive layout, increased responsiveness)
* A more detailed language filtering mechanism
* Authenication to GitHub
* Routing to handle unique repo results pages

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
