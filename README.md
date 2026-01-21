Video demo for project: https://youtu.be/S4l-RhSgqrM

Due to the many files that come with the npm init -y command to intialize the package.json file to configure node.js, I am unable to upload said files to the repo, please make sure you configure node.js on your local machine along wih tthe correct settings for MySQL Workbench and etc. 

Project 3: Student Demo Registration
1
Assignment
There are 36 students in a web technology class. In order to organize the project demonstrations, the
students will demonstrate their projects at six different one-hour long time slots. Up to 6 students can
give their demonstrations in a given time slot. The instructor decides to have a registration webpage
to allow students to sign up for one of the time slots. A student visiting the page should be able to
submit his/her ID, first name, last name, project title, email address, phone number, and book a seat
in one of the available time slots. A student is uniquely identified by his/her ID.
The submitted data should be stored in a MySQL database which is maintained on a server. The
webpage and the server should interact with each other at every step of the registration process. The
page should show how many free seats are available in each time slot, announcing and blocking all
fully booked time slots. After a student makes a data submission, it should check whether the student
has been already registered. If not, the data is stored on the server and the student is notified about
her registration. Otherwise, if already registered, the student should be prompted to ensure that they
want to change the registration to the new section (and removed from the current one they are
registered for). For example, the time slots may look like the following list:
1. 4/19/2070, 6:00 PM – 7:00 PM, 6 seats remaining
2. 4/19/2070, 7:00 PM – 8:00 PM, 5 seats remaining
3. 4/19/2070, 8:00 PM – 9:00 PM, 3 seats remaining
4. 4/19/2070, 6:00 PM – 7:00 PM, 2 seats remaining
5. 4/19/2070, 7:00 PM – 8:00 PM, 4 seats remaining
6. 4/19/2070, 8:00 PM – 9:00 PM, 0 seats remaining
In addition, you need to write a separate webpage that will display the list of students (including their
IDs, names, project titles, email addresses, phone numbers, and time slots) who are registered, after
querying the database.
Requirements
1. For your assignment, you should use HTML, CSS, ([optionally] JavaScript), MySQL, and PHP
(unless you prefer to use something else like node.js. If you do use something besides PHP, such
as node.js, indicate setup and execution instructions in a readme file in the submission
deliverable).
2. The database must fully implement the registration process, maintaining the submitted
information. The server and page behavior must meet the requirements listed above.
3. The specific look and feel of the pages as well as the database implementation is left intentionally
vague, allowing considerable design freedom on your part. However, the page should have a nice
look and the code should satisfy common standards.
4. User inputs should be validated at the server side (e.g., PHP) and/or at the client side (e.g.,
JavaScript). Hint: consider using regex for validation.
a. The first and last name fields cannot be empty and consist of alpha letters only.
b. ID must be 8 digits.
c. Email begins with series of alphanumeric characters, followed by the “@” character, and
domain name.
Project 3: Student Demo Registration
2
d. Domain name consists of dot separated labels of 1 to 20 alphanumeric characters each, up
to a maximum total length of 80 characters (including dot delimiters).
e. Phone number must be in the form 999-999-9999. Note, the email format is much more
restrictive.
5. If there are any errors, your program must highlight the error input and keep the correct inputs.
You should not ask a user to “go back” to the previous page or input everything again.
