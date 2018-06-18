# cast-a-pod
Capital One Software Engineering Summit application for August 2018 - GPodder API Podcast Engine

For best performance, please enable cross-origin resource sharing on your browser of choice.

cast-a-pod currently allows users to:
1. do a general search of podcasts by term or genre
2. search and see podcasts ordered by popularity and changes in number of subscribers
3. find keywords (frequently repeated words and proper nouns) in podcast descriptions
4. smart sort which podcast a user should listen to first based on frequency of episode releases
5. expand search results to find more information about each podcast

Tech Stack: GatsbyJS (nodeJS + React)

Notes:
1. The authentication API calls for verifying login/logout were only working in Postman and not in my dev or prod environments. The login page would be fully functional given the right headers and CORS settings but I was unable to resolve the issue.
2. Finding the correct podcast feed and media url combination for the episode data endpoint proved difficult, so I parsed the podcast feed XML instead.