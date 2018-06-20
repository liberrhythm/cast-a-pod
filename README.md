# cast-a-pod
Capital One Software Engineering Summit application for August 2018 - GPodder API Podcast Engine

cast-a-pod is a multifaceted podcast search engine for people on the move!

For best performance, please start your browser with --disable-web-security or enable cross-origin resource sharing on your browser of choice in order to prevent CORS issues.
* Windows: "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="c:/someFolderName"  
* Mac: open -n -a /Applications/Google\ Chrome.app --args --user-data-dir="/tmp/someFolderName" --disable-web-security 
* Linux: google-chrome --disable-web-security --user-data-dir="/tmp/someFolderName" 

cast-a-pod currently allows users to:
1. do a general search of podcasts by term or genre
2. search and see podcasts ordered by popularity and changes in number of subscribers
3. find keywords (frequently repeated words and proper nouns) in podcast descriptions
4. smart sort which podcast a user should listen to first based on frequency of episode releases (buggy - works only with --disable-web-security flag)
5. expand search results to find more information about each podcast

Tech Stack: GatsbyJS (nodeJS + React)

Notes:
1. The authentication API calls for verifying login/logout were only working in Postman and not in my dev or prod environments. The login page would be fully functional given the right headers and CORS settings but I was unable to resolve the issue.
2. Finding the correct podcast feed and media url combination for the episode data endpoint proved difficult, so I parsed the podcast feed XML instead. Only 7 of the top 25 podcasts parsed successfully in production.
