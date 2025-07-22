document.addEventListener("DOMContentLoaded", () => {
  const matric = localStorage.getItem("matric");
  const fullName = localStorage.getItem("fullName"); // Get saved full name
  const matricDisplay = document.getElementById("studentMatric");
  const nameDisplay = document.getElementById("studentName");

  // 🚫 Redirect if not logged in
  if (!matric) {
    alert("🚫 You must log in first.");
    window.location.href = "login.html";
    return;
  }

  // ✅ Show logged-in matric number
  if (matricDisplay) {
    matricDisplay.textContent = matric;
  }

  // ✅ Show full name
  if (nameDisplay && fullName) {
    nameDisplay.textContent = fullName;
  }

  // 📸 Profile Picture Upload & Restore
  const uploadInput = document.getElementById("uploadImage");
  const profileImage = document.getElementById("profileImage");

  if (uploadInput && profileImage) {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      profileImage.src = savedImage;
    }

    uploadInput.addEventListener("change", () => {
      const file = uploadInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result;
          localStorage.setItem("profileImage", base64);
          profileImage.src = base64;
        };
        reader.readAsDataURL(file);
      }
    });
  }
});

// 🔓 Logout Function
function logout() {
  localStorage.removeItem("matric");
  localStorage.removeItem("fullName");
  localStorage.removeItem("profileImage");
  window.location.href = "login.html";
}
