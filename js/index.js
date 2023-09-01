//creating the main api funtion
const handleApi = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const tabContainer = document.getElementById("tab-container");

  const apiData = data.data;
  const desiredCategoryId = "1005";
  // console.log(apiData);
  apiData.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
  <div class="tabs  tabs-boxed">      
  <a onclick="handleLoadContent('${category.category_id}')" class="tab text-black  hover:bg-pink-300 ">${category.category}</a>          
  </div>

    `;
    tabContainer.appendChild(div);

    if (category.category_id === desiredCategoryId) {
      div.innerHTML = `
  <div class="tabs  tabs-boxed">      
  <a onclick="handleLoadContentDraw('${category.category_id}')" class="tab text-black  hover:bg-pink-300 ">${category.category}</a>          
  </div>

    `;
    }
  });
};

let cardData = [];

const handleLoadContent = async (categoryID) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryID}`
  );
  const data = await response.json();

  cardData = data.data;

  renderCards(cardData);
};

const renderCards = (data) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  data.forEach((content) => {
    const time = +content.others.posted_date;
    const totalSeconds = time;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const fin = time ? `${hours} hrs ${minutes} min ago` : " ";
    console.log(fin);

    const div = document.createElement("div");
    div.innerHTML = `
    <figure class="relative">
  <img
    class="w-full lg:w-72 mb-3 rounded-md h-44"
    src="${content.thumbnail}"
    alt="Shoes"
  />
  <p
    class="absolute bottom-3 right-3 lg:right-10 text-white bg-black p-2 rounded-lg text-xs lg:text-base"
  >
    ${fin}
  </p>
</figure>

  

    <div class="flex gap-2 mt-5 mb-10">
    <div class="flex ">
    <img class="w-8 h-8 rounded-full"  src=${
      content.authors[0].profile_picture
    } alt="Shoes" />
    </div>
    <div class="flex flex-col">
    <h2 class="text-xl font-bold">${content.title}</h2>
    <h2 class="flex items-center">${content.authors[0].profile_name}<span>${
      content.authors[0].verified
        ? '<img src="./../Images/fi_10629607.svg" />'
        : " "
    } </span></h2>
    <h2>${content.others.views} views</h2>

    </div>
    </div>
    `;
    cardContainer.appendChild(div);
  });
};

handleApi();
handleLoadContent("1000");

function sortCardsByViews() {
  cardData.sort((a, b) => {
    const viewsA = parseInt(a.others.views, 10);
    const viewsB = parseInt(b.others.views, 10);
    return viewsB - viewsA;
  });
  renderCards(cardData);
}

function handleLoadContentDraw() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="flex flex-col items-start justify-start">
  <img src="./Images/Icon.png" alt="" class="ml-[120px] sm:mb-3 lg:mx-[600px]" >
  <h3 class="text-4xl font-bold text-center pl-12">Oops!! Sorry, There is no <br> content here</h3>
  </div>
  


  `;
  cardContainer.appendChild(div);
}
