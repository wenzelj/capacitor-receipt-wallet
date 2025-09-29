import { SplashScreen } from "@capacitor/splash-screen";

document.addEventListener("DOMContentLoaded", () => {
  SplashScreen.hide();
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active classes from all links
      navLinks.forEach((l) => {
        l.classList.remove("text-blue-500");
        l.classList.add("text-gray-500", "hover:text-blue-500");
      });

      // Add active classes to the clicked link
      link.classList.remove("text-gray-500", "hover:text-blue-500");
      link.classList.add("text-blue-500");
    });
  });
});