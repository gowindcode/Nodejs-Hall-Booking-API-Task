Dear FSD Team,

Please note for this Nodejs hall booking API task, i have used express, dotenv, mongoose, cors, mongodb, nodemon and other npm packages.

As per taks requirements 

1. Room/Hall created successfully by admin. That includes total seats, amenities, price per hour.
2. Booking a room/hall with customer name, date, start time, end time, room id.
3. Listed all booked rooms with all details.(room id, name, phone, date, time)
4. All customers data includes (customer name, room name, date, start time, end time)
5. Get how many times user booked details.
6. User/admin can check the status of halls.
7. admin can search user details by phone number or name. (But refer to search by phone number, because it is unique)

And please note user can not book same hall on same date, if suppposed booked by another customer/user.

Please note i have attached results screen shots in single pdf, so FSD team can check and evaluvate easily.  This will hepls to save time and avoid confusions.
And end point details from render deployed site
end points
-----------
server/

https://nodejs-hall-booking-api-od0r.onrender.com/

-----------------------------------------------------------------------------------------
admin/

https://nodejs-hall-booking-api-od0r.onrender.com/admin/booked-details
https://nodejs-hall-booking-api-od0r.onrender.com/admin/halls
https://nodejs-hall-booking-api-od0r.onrender.com/admin/all-customers

using customer name search
https://nodejs-hall-booking-api-od0r.onrender.com/admin/Ajith%20Kumar  

using customer phone number search get booked details

https://nodejs-hall-booking-api-od0r.onrender.com/admin/9846000007

for hall create /admin/create-hall, but use postman.

-----------------------------------------------------------------------------------------

user/

https://nodejs-hall-booking-api-od0r.onrender.com/user/halls

https://nodejs-hall-booking-api-od0r.onrender.com/user/booked-status 

for security reasons admin hide another customer phone numbers and adress details.

for book hall https://nodejs-hall-booking-api-od0r.onrender.com/user/book-hall, but use postman for checking purpose

------------------------------------------------------------------------------------------

hall/

https://nodejs-hall-booking-api-od0r.onrender.com/hall/details

customer can get all offering halls details using above url

https://nodejs-hall-booking-api-od0r.onrender.com/hall/status

once booked customer can check the all booked halls data

--------------------------------------------------------------------------------------------


Thank you for reading this message and viewing my code, git repository and deployed render site.



