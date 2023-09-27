# Amtrak
[![amtrak](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/detailed/wrhdxi&style=flat&logo=cypress)](https://cloud.cypress.io/projects/wrhdxi/runs)

This repo contains tests validating searching for a ticket with Amtrak.com from NYP to WAS with specific date parameters. Then verify the parameters are saved when utilizing the browser's "back" functionality.

## Notes for the reviewers

Amtrak appears to have either framebusting or a very delicate system in place for searching for trains which causes automation to fail to submit finding a route.

The automation does not successfully submit the search result and always results in an error. I've tried the following unsuccessfully:

* provide the app time to generate a payload slowly
  * assumption is that the payload submitted in when Find Trains is clicked, is generated as the user goes through selecting From, To, etc.
  * adding waits provide it time to generate, if the code is too slow for automation
* mimicking other User Agents
  * assumption is that some form of anti-botting is used to prevent automation from buying tickets
  * cloned my own UA and utilized various agent strings provided by Mozilla and Google
* toggled on/off Cypress native obstructive code modifiers
  * assumption is that Cypress is modifying some critical piece of code for the app
  * disabling this feature and its partner for thirdp-party code (modifies third-party libraries) didn't help
  * enabling `experimentalModifyObstructiveThirdPartyCode` appeared to make app loading more stable
* tried playwright
  * assumption is that Cypress modification of certificates causes some sort of issue with search submissions
  * playwright worked better out of the box (no need to modify the User-Agent)
* tried to click on calendar dates instead of typing a string
  * assumption is that a date string being typed out doesn't get saved to the payload object

### Google Flights

I've added a second test case for Google Flights that works consistently. It is much simpler and doesn't additional refactoring done to include reusable locators and such.

### Stuff I googled

I didn't keep a good list of links, but I generally browsed for thse subjects. Setting up the project and writing the test code was done by myself as I'm very familiar with setting up a Cypress project with basic linting/prettier/configs.

- what does cypress modify
- current google UA
- google bot UA
- framebusting techniques
- cypress cookie caching
- cypress set useragent globally

### Next steps

#### Page/Component Object Library

Locators and functions are in two files. This works at this scale of 1 developer, but needs to be improved upon for scaling to more devlopers.

Depending what frameworks the project uses, a component object library could be viable. Component object libraries export the locators used in the component unit tests and allow the E2E tests to reuse the same locators. Teams can then just manage just their components and the locators inside of their components. There are some downsides to this where locators can feel brittle due to the need for very strict self control in keeping locators up-to-date

#### Session Caching

The tests should be able to cache and save the cookies set for skipping the cookies request and, ideally, also the additional ad popup.

## UX recommendations

### For general UX

- Text boxes need to all be left aligned (Return date is center aligned)
- Fix clicking back and forth between Depart and Return date causes the active cursor to start jumping between the two
- improve A11y support
- lazy loading of data (maybe just post-processing) actively moves elements around, provide those elements the css first before loading contents to ensure the page doesn't move around as things get loaded

### For testing

Most importantly is to figure out what the app requires that Cypress and Playwright are not supplying. I would check if Selenium runs into the same issue. Then the next steps require the source code or slow review of network logs to try and identify why the app does not function the same when a normal user uses the app.

Other things are:

- test-ids for more elements
- better A11y support to remove dependency on test-ids
- using today runs the risk of not finding trains when running the test later at night
  - should use today + 1 as the starting day to be more sure that there are available trains
  - on a prod environment, ideally this checks the db for a valid route before performing this search
  - on a dev environment, the db should be loaded up with preset routes to ensure they exist
- CI/CD improvements
  - store screenshots/videos on error
  - reporting
  - increase parallelization and make it dynamic
- scalability as test cases increase
  - cypress has things like spec prioritization
  - weighting based on critical importance or known failure areas
- quicker tests for local development


## Development

Do NOT use the prettier extension in VSCode

Eslint is configured to autoformat on save

Plugins and settings used in Eslint:
- [eslint-plugin-mocha](https://github.com/lo1tuma/eslint-plugin-mocha/tree/master)
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
- [eslint-plugin-cypress](https://github.com/cypress-io/eslint-plugin-cypress)
- [eslint-plugin-chai-friendly](https://github.com/ihordiachenko/eslint-plugin-chai-friendly)

### Locators

These are in order of preference:

- test-ids provided by Amtrak
- Use accessibility locators

# Issues with the Amtrak website

- Cypress user-agent immediatly crashes the site
- a spoofed user-agent crashes the site
- chrome's bot user-agent works fine, but might have different data shown to it
- not all of the elements have test ids
- when using `experimentalModifyObstructiveThirdPartyCode` && `experimentalSourceRewriting` the website causes Cypress to crash due to non-string stream
  - This is probably due to the app utilizing side effects of the code that Cypress is rewriting
- Overall, the website appears fairly inconsistent in functionality when automation runs
  - unclear if there are feature flags
  - it appears that timing is potentially a concern
- There are a lot of console errors
