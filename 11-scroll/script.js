const postsContainer = document.getElementById("post-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 3;
let page = 1;

// Fetch posts from API
async function getPosts() {
  // const res = await fetch(
  //   `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  // );

  const res = await fetch(
    `https://randomuser.me/api/?page=${page}&results=${limit}`
  );

  const data = await res.json();

  return data;
}

// Show posts in DOM
async function showPosts() {
  const posts = await getPosts();

  console.log(posts.results);

  posts.results.forEach((post, index) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
    <div class="number">${index}</div>
    <div class="post-info">
      <h2 class="post-title">${post.name.first} ${post.name.last}</h2>
      <img src="${post.picture.thumbnail}"></img>
      <p class="post-body">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem labore
            corrupti vitae laudantium voluptatum fugit rerum, tempore autem?
            Dolorum, cupiditate!
      </p>
    </div>`;

    postsContainer.appendChild(postEl);
  });
}

// Show loader and fetch more posts
function showLoading() {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");

    // Increment page and fetch more posts
    setTimeout(() => {
      showPosts();
    }, 300);
  }, 1000);
}

// Show initial posts
showPosts();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  console.log(scrollTop, scrollHeight, clientHeight, scrollTop + clientHeight);

  // When scrolling reaches the bottom
  if (scrollTop + clientHeight >= scrollHeight) {
    // Show loader
    showLoading();
  }
});

/*
  scrollTop - 0 from the top
  scrollHeight - height required by the content
  clientHeight - browser height
*/
