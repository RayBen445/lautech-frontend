// ✅ Authorized Matric Numbers (LAUTECH ECONOMICS CLASS 29)
const allowedMatricNumbers = new Set([
  "2024013417", "2023011476", "2024003355", "2024003476", "2024003486", "2024003513",
  "2024003516", "2024003580", "2024003583", "2024003607", "2024013214", "2024003667",
  "2024003692", "2024003712", "2024003741", "2024003770", "2024003869", "2024003999",
  "2024004028", "2024004029", "2024004099", "2024013216", "2024004177", "2024004271",
  "2024004308", "2024004334", "2024004407", "2024004417", "2024004487", "2024004507",
  "2024004527", "2024004576", "2024013223", "2024004590", "2024004622", "2024004637",
  "2024004691", "2024004703", "2024004723", "2024004794", "2024004798", "2024004808",
  "2024004869", "2024013378", "2024004891", "2024004893", "2024004895", "2024004932",
  "2024004947", "2024004956", "2024004962", "2024004973", "2024005008", "2024005013",
  "2024013391", "2024005068", "2024005150", "2024005156", "2024005157", "2024005182",
  "2024005345", "2024005353", "2024005378", "2024005477", "2024005507", "2024005508",
  "2024005528", "2024005546", "2024005655", "2024005738", "2024005753", "2024005754",
  "2024005797", "2024005847", "2024005864", "2024005867", "2024005916", "2024006090",
  "2024006118", "2024006125", "2024006136", "2024006143", "2024006150", "2024006162",
  "2024006198", "2024006437", "2024006447", "2024006477", "2024006510", "2024006513",
  "2024006550", "2024006564", "2024006597", "2024006626", "2024006686", "2024006705",
  "2024006820", "2024006896", "2024006904", "2024006969", "2024006978", "2024006998",
  "2024007000", "2024007087", "2024007117", "2024007153", "2024007169", "2024007175",
  "2024007310", "2024007325", "2024007467", "2024007512", "2024007527", "2024007578",
  "2024007587", "2024007588", "2024007589", "2024007663", "2024007675", "2024007681",
  "2024007693", "2024007696", "2024007744", "2024007756", "2024007796", "2024007814",
  "2024007823", "2024007944", "2024007974", "2024007977", "2024008002", "2024008028",
  "2024008059", "2024008076", "2024008087", "2024008233", "2024008338", "2024008357",
  "2024008415", "2024008420", "2024008458", "2024008554", "2024008575", "2024008612",
  "2024008680", "2024008710", "2024008757", "2024008761", "2024008777", "2024008838",
  "2024008890", "2024008929", "2024008942", "2024008971", "2024009104", "2024009209",
  "2024009324", "2024009342", "2024009347", "2024009384", "2024009455", "2024009461",
  "2024009479", "2024009537", "2024009587", "2024009652", "2024009736", "2024009834",
  "2024009872", "2024009874", "2024009932", "2024009937", "2024009967", "2024010177",
  "2024010178", "2024010194", "2024010213", "2024010379", "2024010502", "2024010544",
  "2024010624", "2024010690", "2024010710", "2024010829", "2024010853", "2024010866",
  "2024010883", "2024010985", "2024011008", "2024011028", "2024011047", "2024011048",
  "2024011125", "2024011144", "2024011160", "2024011162", "2024011316", "2024011351",
  "2024011367", "2024011464", "2024011522", "2024011526", "2024011567", "2024011593",
  "2024011630", "2024011850", "2024011924", "2024012314", "2024012318", "2024012400",
  "2024012493", "2024012547", "2024012628", "2024012666", "2024012674", "2024012792",
  "2024012879", "2024012918", "2024012939", "2024013017", "2024013035", "2024013060",
  "2024013164", "2024013180"
]);

const BACKEND_URL = "https://lautech-economic-website-vb9q.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fullName = document.getElementById("registerFullName").value.trim();
      const matric = document.getElementById("registerMatric").value.trim();
      const email = document.getElementById("registerEmail").value.trim();
      const error = document.getElementById("registerError");

      const fullNameValid = /^[A-Za-z]+ [A-Za-z]+( [A-Za-z]+)?$/.test(fullName);
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!fullNameValid) return error.textContent = "❌ Full name must be: Surname Firstname Othername";
      if (!emailValid) return error.textContent = "❌ Enter a valid email address";
      if (!allowedMatricNumbers.has(matric)) return error.textContent = "❌ Your Matric number is not authorized";

      try {
        const res = await fetch(`${BACKEND_URL}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, matric, email })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Something went wrong");

        localStorage.setItem("fullname", data.user.fullName);
        localStorage.setItem("matric", matric);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("profilePic", data.user.image || "");

        window.location.href = "home.html";
      } catch (err) {
        error.textContent = `❌ ${err.message}`;
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const matric = document.getElementById("loginMatric").value.trim();
      const error = document.getElementById("loginError");

      try {
        const res = await fetch(`${BACKEND_URL}/api/user/${matric}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Matric not found");

        localStorage.setItem("fullname", data.fullName);
        localStorage.setItem("matric", matric);
        localStorage.setItem("email", data.email || "");
        localStorage.setItem("profilePic", data.image || "");

        window.location.href = "home.html";
      } catch (err) {
        error.textContent = `❌ ${err.message}`;
      }
    });
  }
});
