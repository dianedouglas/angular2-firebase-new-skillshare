import {database, initializeApp} from "firebase";
import {firebaseConfig} from "./src/environments/firebase.config";
import {dbData} from "./db-data";


console.log("WARNING VERY IMPORTANT - PLEASE READ THIS\n\n\n");
console.log('WARNING Please set your own firebase config on src/environmnents/firebase.config.ts');
console.log('Otherwise you will get permissions errors, because the populate-db script is trying to write to my database instead of yours. ');
console.log('Any issues please contact me, Thanks, Vasco\n\n\n');

initializeApp(firebaseConfig);


const coursesRef = database().ref('courses');
const lessonsRef = database().ref('lessons');



dbData.courses.forEach( course => {

  console.log('adding course', course.url);

  const courseRef = coursesRef.push({
      url: course.url,
      description: course.description,
      iconUrl: course.iconUrl,
      courseListIcon: course.courseListIcon,
      longDescription: course.longDescription
  });

  let lessonKeysPerCourse = [];

  course.lessons.forEach((lesson:any) =>  {

    console.log('adding lesson ', lesson.url);
// add the course's lessons to the lessons table.
// each time we add one, get its generated key property
// and push that into the lessonKeysPerCourse array locally. normal array, not in firebase yet.
    lessonKeysPerCourse.push(lessonsRef.push({
        description: lesson.description,
        duration: lesson.duration,
        url: lesson.url,
        tags: lesson.tags,
        videoUrl: lesson.videoUrl || null,
        longDescription: lesson.longDescription,
        courseId: courseRef.key
      }).key);

  });

  // get the reference to the join table lessonsPerCourse
  const joinTable = database().ref('lessonsPerCourse');

  // make a reference that allows us to add lesson keys to the current course.
  /*
  lessonsPerCourse table:
    courseId:
      -- the next line is setting the location of the current courseId in the join table.
      saying "we're about to add lesson ids here that belong to this course."
  */
  const currentCourse = joinTable.child(courseRef.key);//add course key as child of jointable.

  // loop through the array of lesson ids for this course, adding each one to the join table
  // as a child of the current course id.
  lessonKeysPerCourse.forEach(lessonKey => {
    console.log('adding lesson to course ');

    const currentLesson = currentCourse.child(lessonKey);

    currentLesson.set(true);
  });


});
