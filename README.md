# README

To get the app running:
1. clone to a local address
2. open up a Terminal and cd to the unzipped folder
3. run bundle install
4. run yarn install --check-files (visit https://www.yarnpkg.com/en/docs/install if you do not have yarn installed on your device)
5. run rails:db migrate
6. run rails s to fire up the server
7. open a browser and navigate to localhost:3000

Usage:
1. Sign up with a username, any valid email address and a password
2. You may create, retrieve, update and delete (CRUD) to-do tasks
3. You may create categories to tag your tasks (Note: by default there are no categories, if you have already created a task without any categories, you may still add categories to this task later by updating it, options for categories will be available once you have created some categories)
4. You may change the status of your task, either completed or ongoing
5. You may also edit your profile information, i.e. username, email address and password

Admin funcionality:
1. sign up or log in a user first
2. find the user id at the site address, which will be of the form localhost:3000/users/#, where # stands for some number and that will be the user id 
3. go back to the Terminal, stop the server by Ctrl-c 
4. run rails c to enter the rails console 
5. run User.find(#).toggle!(:admin)
6. now this user will be an admin user, run exit to exit out of the rails console
7. run rails s to start the server again, go to localhost:3000 and refresh the page (if you have closed the tab or browser, log in as the user you just set as admin), check that on the top right corner of the page, the normal Profile dropdown menu will now be Profile Admin. You have also the authority to delete other users
  
Name: Wang Luo 
Matriculation Number: A0180092L 
Faculty: NUS School of Computing

This project is a web to-do list with backend written using Ruby on Rails and frontend written using React.
