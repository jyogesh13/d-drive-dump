use ('testing1');

db.createCollection('students');

// db.students.insertOne({
//     "rollno": 101,
//     "name": "Anshul",
//     "marks": 96,
//     "grade": "A"
// });

// db.students.insertMany([
//     {
//         "rollno": 101,
//         "name": "Anshul",
//         "marks": 96,
//         "grade": "A"
//     },
//     {
//         "rollno": 102,
//         "name": "Neha",
//         "marks": 89,
//         "grade": "B"
//     },
//     {
//         "rollno": 103,
//         "name": "Rohan",
//         "marks": 78,
//         "grade": "C"
//     },
//     {
//         "rollno": 104,
//         "name": "Pooja",
//         "marks": 91,
//         "grade": "A"
//     },
//     {
//         "rollno": 105,
//         "name": "Amit",
//         "marks": 85,
//         "grade": "B"
//     },
//     {
//         "rollno": 106,
//         "name": "Sneha",
//         "marks": 72,
//         "grade": "C"
//     },
//     {
//         "rollno": 107,
//         "name": "Rahul",
//         "marks": 95,
//         "grade": "A"
//     },
//     {
//         "rollno": 108,
//         "name": "Kiran",
//         "marks": 88,
//         "grade": "B"
//     },
//     {
//         "rollno": 109,
//         "name": "Manoj",
//         "marks": 80,
//         "grade": "B"
//     },
//     {
//         "rollno": 110,
//         "name": "Divya",
//         "marks": 99,
//         "grade": "A"
//     }
// ]
// );

//READ
// let a = db.students.find({marks : 95});
// let a = db.students.findOne({grade : "B"});
// console.log(a);
// console.log(a.count());
// console.log(a.toArray()); //when more than one datapoint are returned

//UPDATE
// db.students.updateOne({marks : 99}, {$set:{marks:100}});

// db.students.updateMany({marks : 99}, {$set:{marks:100}});

//DELETE
// db.students.deleteOne({marks:100});
db.students.deleteMany({marks:100});


//DIY
//operators in mongodb