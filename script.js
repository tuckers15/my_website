function loadNavbar() {
  fetch("components/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
    })
    .catch((error) => console.error("Error loading the navbar:", error));
}

function loadTitelCard() {
  fetch("components/titlecard.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("titlecard").innerHTML = data;
    })
    .catch((error) => console.error("Error loading the navbar:", error));
}

// List of markdown files to fetch
const postFiles = [
  "https://github.com/tuckers15/my_website/blob/main/posts/post1.md?plain=1",
]; // Add more as needed

const postsList = document.getElementById("posts-list");

async function fetchAndProcessPost(file) {
  try {
    const response = await fetch(file);
    const markdown = await response.text();

    // Extract YAML front matter and body
    const yamlEnd = markdown.indexOf("---", 3);
    const yamlPart = markdown.substring(3, yamlEnd);
    const bodyPart = markdown.substring(yamlEnd + 3).trim();

    // Load metadata and extract fields
    const metadata = jsyaml.load(yamlPart);
    const title = metadata.title || "Untitled";
    const link = metadata.link || "#";
    const snippet = bodyPart.split(/\s+/).slice(0, 60).join(" ") + "...";

    // Create and insert the list item with a link
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <h2><a href="${link}" target="_blank">${title}</a></h2>
      <p>${snippet}</p>
    `;
    postsList.appendChild(listItem);
  } catch (error) {
    console.error(`Error fetching ${file}:`, error);
  }
}

// Fetch and process all posts
postFiles.forEach(fetchAndProcessPost);

loadNavbar();
loadTitelCard();
