# Overwatch-2-TPMM
Third party matchmaker for Overwatch 2.

Created by:
Cameron Holland
Jared Coates
Justin Scannell

An alternate way to queue for Overwatch 2 matches. Intended to provide a different experience than the built in ranked system, this website provides users an interface to queue for casual Overwatch games. Users are responsible for hosting the lobbies after a match is created.

Detailed statistics can be tracked and displayed on the user's profile.

Includes a trivia minigame while waiting in queue!

Created as a final project for Advanced Software Design class.



Demo Instructions:

1. Run npm install to get the necessary node modules.
2. Edit api/database/mySQLconnect.js to have the proper database connection credentials
3. Use the SQL dump files to create and populate the database tables
4. Login with the given username 
5. Check your Profile (remember your tank rank and win percentage - these will change later!)
6. Queue for Damage or Support to see the queue state
7. Leave the queue and rejoin as Tank to get placed into a lobby
8. Try reporting a winner - you will either win or lose ranked points depending on which team won
9. Upload the given sample CSV file
10. Return to your profile to see your updated statistics!
