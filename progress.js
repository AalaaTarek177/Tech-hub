let container = document.getElementById("progressContainer");
let courses = JSON.parse(localStorage.getItem("myCourses")) || [];

function renderCourses() {
  container.innerHTML = "";

  if (courses.length === 0) {
    container.innerHTML = "<p style='text-align: center;'>You haven't enrolled in any courses yet.</p>";
  } else {
    courses.forEach((course, index) => {
      container.innerHTML += `
        <div class="course-progress">
          <h3>${course.name}</h3>
          <div class="progress-bar">
            <div class="progress" id="progress-${index}" style="width: ${course.progress}%;">
              ${course.progress}%
            </div>
          </div>
          <button class="btn-add" onclick="increaseProgress(${index})">+ Add Progress</button>
          <button class="btn-remove" onclick="removeCourse(${index})">❌ Remove Course</button>
        </div>
      `;
    });
  }
}

function increaseProgress(index) {
  if (courses[index].progress < 100) {
    courses[index].progress += 10;
    if (courses[index].progress >= 100) {
      courses[index].progress = 100;

      let earnedCerts = JSON.parse(localStorage.getItem("certificates")) || [];
      if (!earnedCerts.some(cert => cert.name === courses[index].name)) {
        earnedCerts.push({
          name: courses[index].name,
          date: new Date().toLocaleDateString()
        });
        localStorage.setItem("certificates", JSON.stringify(earnedCerts));
      }

      localStorage.setItem("myCourses", JSON.stringify(courses));
      renderCourses();

      alert(`🎉 Congratulations! You’ve completed the ${courses[index].name} course!`);

      const certWindow = window.open("", "_blank");
      if (certWindow) {
        certWindow.document.write(`
          <html>
            <head>
              <title>Certificate of Completion</title>
              <style>
                body {
                  text-align: center;
                  font-family: 'Arial', sans-serif;
                  background: #f0f8ff;
                  padding: 50px;
                }
                .certificate {
                  border: 6px double #6a82fb;
                  padding: 40px;
                  border-radius: 10px;
                  background: white;
                  width: 80%;
                  margin: auto;
                }
                h1 { color: #4CAF50; }
                h2 { color: #222; }
                h3 { color: #6a82fb; }
              </style>
            </head>
            <body>
              <div class="certificate">
                <h1>🏆 Certificate of Completion</h1>
                <p>This is to certify that</p>
                <h2>You</h2>
                <p>has successfully completed the</p>
                <h3>${courses[index].name}</h3>
                <p>course with 100% progress.</p>
                <p style="margin-top: 30px;">Date: ${new Date().toLocaleDateString()}</p>
                <hr style="margin: 30px 0;">
                <p style="font-style: italic;">TECH-HUB Academy</p>
              </div>
            </body>
          </html>
        `);
        certWindow.document.close();
      } else {
        alert("❗ Pop-up blocked. Please allow pop-ups for this site to view the certificate.");
      }

      return;
    }

    localStorage.setItem("myCourses", JSON.stringify(courses));
    renderCourses();
  }
}

function removeCourse(index) {
  const confirmDelete = confirm(`Are you sure you want to remove "${courses[index].name}" from your progress?`);
  if (confirmDelete) {
    courses.splice(index, 1);
    localStorage.setItem("myCourses", JSON.stringify(courses));
    renderCourses();
  }
}

renderCourses();
