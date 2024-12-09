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
const postFiles = ["posts/post1.md"]; // Add more as needed

const postsList = document.getElementById("posts-list");

// Function to fetch and process a Markdown file
async function fetchAndProcessPost(file) {
  try {
    const response = await fetch(file);
    const markdown = await response.text();

    // Extract YAML front matter and body
    const yamlEnd = markdown.indexOf("---", 3);
    const yamlPart = markdown.substring(3, yamlEnd);
    const bodyPart = markdown.substring(yamlEnd + 3).trim();

    const metadata = jsyaml.load(yamlPart);
    const title = metadata.title || "Untitled";
    const snippet = bodyPart.split(/\s+/).slice(0, 60).join(" ") + "...";

    // Create and insert the list item
    const listItem = document.createElement("li");
    listItem.innerHTML = `<h2>${title}</h2><p>${snippet}</p>`;
    postsList.appendChild(listItem);
  } catch (error) {
    console.error(`Error fetching ${file}:`, error);
  }
}

// Fetch and process all posts
postFiles.forEach(fetchAndProcessPost);

loadNavbar();
loadTitelCard();
