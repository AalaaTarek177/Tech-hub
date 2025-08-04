
function startCourse(courseName) {
  let courses = JSON.parse(localStorage.getItem("myCourses")) || [];

  let exists = courses.find(c => c.name === courseName);
  if (!exists) {
    courses.push({ name: courseName, progress: 0 });
    localStorage.setItem("myCourses", JSON.stringify(courses));
    alert(`✅ ${courseName} has been added to your progress!`);
  } else {
    alert(`ℹ️ You're already enrolled in ${courseName}`);
  }
}
