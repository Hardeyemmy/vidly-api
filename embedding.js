const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/playground', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => console.log("Connected to mongoDB..."))
.catch(() => console.err("Cound not connect to mongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String  
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model("Course", new mongoose.Schema({
    name: String,
    authors: [authorSchema]
}));

async function createCourse(name, authors){
    const course = new Course({
        name,
        authors
    });
    const result = await course.save();
    console.log(result);
};

async function listCourses() {
    const result = await Course.find();
    console.log(result);
};

async function updateAuthor(courseId){
    const course = await Course.findById(courseId);
    course.author.name = "Adeyemi";
    course.save()
};
 async function addAuthor(courseId, author){
     const course = await Course.findById(courseId);
     course.authors.push(author);
     course.save();
 };

 async function removeAuthor(courseId, authorId){
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
 }
removeAuthor("604cbeb53689b01b9c618bbb", "604cbeb53689b01b9c618bb9");

// updateAuthor("604cb6e06d13530bf411212c");


// createCourse("Node.js", new Author({name: "Yem_dev"}),new Author({name: "Yem_dev"})]);
//listCourses