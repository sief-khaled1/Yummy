const menu = document.querySelector('.fa-bars');
const navHidden = document.querySelector('.nav-hidden');
const myContainer = document.querySelector('.mycontainer');
const sideMenu = document.querySelector('.side-menu');
const loadScreen = document.querySelector('.load-spin');
const logo=document.querySelector('.logo');

logo.addEventListener('click',displayHome);

function showLoader() {
    loadScreen.classList.remove('d-none');
}

function hideLoader() {
    loadScreen.classList.add('d-none');
}


let ulCloseAnim = gsap.to(".side-menu", {
    y: 60,
    opacity: 0,
    duration: 0.2,
    ease: "power3.in",
    paused: true
});

let ulOpenAnim = gsap.from(".side-menu li", {
    y: 90,
    opacity: 0,
    duration: 0.35,
    ease: "power3.out",
    stagger: 0.15,
    delay: 0.35,
});

menu.addEventListener("click", function () {
    const isOpening = navHidden.classList.toggle('show');
    myContainer.classList.toggle('shift');
    menu.classList.toggle('fa-bars');
    menu.classList.toggle('fa-x');

    if (menu.classList.contains('fa-x')) {
        ulCloseAnim.pause(0);
        gsap.set(".side-menu", { y: 0, opacity: 1 });
        ulOpenAnim.restart();
    } else {
        ulCloseAnim.restart();
    }
});

// home

const home = document.getElementById('home');
let cartoona = ``

async function displayHome() {
    showLoader();
    try {
        let respo = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`);
        let dataa = await respo.json();
        let homeMeals = dataa.meals.slice(0, 25)

        cartoona = `       <div class="container">
            <div class="row gy-4 home">
            </div>
        </div>`;
        home.innerHTML = cartoona;

        for (let meal of homeMeals) {
            cartoona += `
                <div class="col-md-3">
                    <div class="inner position-relative overflow-hidden">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <div class="overlay" data-id="${meal.idMeal}">${meal.strMeal}</div>
                    </div>
                </div>`;
        }
        const homeContainer = document.querySelector('.home');
        homeContainer.innerHTML = cartoona;
        let mealCards = document.querySelectorAll(".inner");
        for (let i = 0; i < mealCards.length; i++) {

            mealCards[i].addEventListener("click", function (e) {

                let mealID = mealCards[i]
                    .querySelector(".overlay")
                    .getAttribute("data-id");

                createMealDetails(mealID);
            });
        }


    } catch (err) {
        console.log(err);
    }
    finally {
        hideLoader();
    }

}

displayHome();

async function createMealDetails(mealID) {
    home.innerHTML = ``;
    cartoona = ``;

    showLoader();

    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
        let data = await response.json();
        let meal = data.meals[0];

        let ingredients = "";
        for (let i = 1; i <= 20; i++) {
            let ing = meal[`strIngredient${i}`];
            let meas = meal[`strMeasure${i}`];
            if (ing) {
                ingredients += `
                    <span class="badge text-dark m-1 p-2 bg-info-subtle">${meas} ${ing}</span>
                `;
            }
        }

        let cartoona = `
            <div class="container py-5">
                <div class="row g-4">
                    <div class="col-md-4">
                        <img src="${meal.strMealThumb}" class="w-100 rounded-3" alt="">
                        <h2 class="mt-3 text-white fw-bold">${meal.strMeal}</h2>
                    </div>
                    <div class="col-md-8">
                        <h2 class="text-white fw-bold">Instructions</h2>
                        <p class="text-white">${meal.strInstructions}</p>

                        <h4 class="mt-4 text-white fw-bold">Area : <span>${meal.strArea}</span></h4>
                        <h4 class="mt-4 text-white fw-bold">Category : <span>${meal.strCategory}</span></h4>

                        <h4 class="mt-4 text-white fw-bold">Ingredients :</h4>
                        <div class="d-flex flex-wrap">${ingredients}</div>

                        <h4 class="mt-4 text-white fw-bold">Links :</h4>
                        <div>
                            ${meal.strSource ? `<a class="btn btn-success m-1" href="${meal.strSource}" target="_blank">Source</a>` : ""}
                            ${meal.strYoutube ? `<a class="btn btn-danger m-1" href="${meal.strYoutube}" target="_blank">Youtube</a>` : ""}
                        </div>
                    </div>
                </div>
            </div>
        `;

        home.innerHTML = cartoona;

    } catch (err) {
        console.log("error", err);
    } finally {
        hideLoader();
    }
}



let inner = document.querySelectorAll('.inner');

for (let i = 0; i < inner.length; i++) {
    inner[i].addEventListener('click', function (e) {
        home.innerHTML = ``;
        let mealID = e.target.getAttribute('data-id');
        console.log(mealID);

        createMealDetails(mealID);
    });
}

//  contactus

let contactUs = document.querySelector(".contactus")

contactUs.addEventListener('click', function () {
    home.innerHTML = ``;

    cartoona = `
  <section id="contactus">
    <div class="contact-form h-100 pt-5 container d-flex flex-column justify-content-center align-items-center">
      
      <form class="row gy-4 w-75 needs-validation" novalidate>

        <div class="col-lg-6 col-sm-12">
          <input type="text" id="nameInput" class="form-control" required placeholder="Enter Your Name">
          <div class="invalid-feedback">Special characters and numbers not allowed</div>
        </div>

        <div class="col-lg-6 col-sm-12">
          <input type="email" id="emailInput" class="form-control" required placeholder="Enter Your Email">
          <div class="invalid-feedback">Email not valid *example@yyy.zzz</div>
        </div>

        <div class="col-lg-6 col-sm-12">
          <input type="number" id="phoneInput" class="form-control" required placeholder="Enter Your Phone">
          <div class="invalid-feedback">Enter valid Phone Number</div>
        </div>

        <div class="col-lg-6 col-sm-12">
          <input type="number" id="ageInput" class="form-control" required placeholder="Enter Your Age">
          <div class="invalid-feedback">Enter valid age</div>
        </div>

        <div class="col-lg-6 col-sm-12">
          <input type="password" id="passInput" class="form-control" required placeholder="Enter Your Password">
          <div class="invalid-feedback">Enter valid password *Minimum 8 chars, at least 1 letter & 1 number*</div>
        </div>

        <div class="col-lg-6 col-sm-12">
          <input type="password" id="repassInput" class="form-control" required placeholder="Enter Your Repassword">
          <div class="invalid-feedback">Enter valid repassword</div>
        </div>

        <div class="d-flex justify-content-center">
          <button type="submit" class="btn mt-4 text-danger button-submit">Submit</button>
        </div>

      </form>

    </div>
  </section>`;

    home.innerHTML = cartoona;

    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^01[0-2,5][0-9]{8}$/;
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


    const name = document.getElementById("nameInput");
    const email = document.getElementById("emailInput");
    const phone = document.getElementById("phoneInput");
    const age = document.getElementById("ageInput");
    const pass = document.getElementById("passInput");
    const repass = document.getElementById("repassInput");

    function validateInput(input, regex) {
        if (regex.test(input.value)) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
            return true;
        } else {
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
            return false;
        }
    }

    name.addEventListener("input", () => validateInput(name, nameRegex));
    email.addEventListener("input", () => validateInput(email, emailRegex));
    phone.addEventListener("input", () => validateInput(phone, phoneRegex));
    age.addEventListener("input", () => {
        if (age.value >= 1 && age.value <= 120) {
            age.classList.add("is-valid");
            age.classList.remove("is-invalid");
        } else {
            age.classList.add("is-invalid");
            age.classList.remove("is-valid");
        }
    });
    pass.addEventListener("input", () => validateInput(pass, passRegex));

    repass.addEventListener("input", () => {
        if (repass.value === pass.value && repass.value !== "") {
            repass.classList.add("is-valid");
            repass.classList.remove("is-invalid");
        } else {
            repass.classList.add("is-invalid");
            repass.classList.remove("is-valid");
        }
    });

});

const ingre = document.querySelector('.ingredients');

ingre.addEventListener('click', async function () {
    home.innerHTML = `        <div class="container">
            <div class="row g-4" id="ingredientsContainer"></div>
        </div>`;
    const ingreContainer = document.getElementById('ingredientsContainer')
    cartoona = ``;
    showLoader();
    try {
        let response1 = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
        let Data1 = await response1.json();
        let ingredients = Data1.meals.slice(0, 20);
        console.log(ingredients);

        for (let ing of ingredients) {
            let description = "No description available.";

            if (ing.strDescription) {
                description = ing.strDescription.split(" ").slice(0, 20).join(" ") + "...";
            }

            cartoona += `
                         <div class="col-md-3 col-sm-6 ingredient">
                            <div class="ingredient-box" data-ing="${ing.strIngredient}">
                                <i class="fa-solid fa-drumstick-bite"></i>
                                <h3>${ing.strIngredient}</h3>
                                <p>${description}</p>
                            </div>
                        </div> `;
        }
        ingreContainer.innerHTML = cartoona;
        let allIngreBoxes = document.querySelectorAll(".ingredient-box");

        allIngreBoxes.forEach(box => {
            box.addEventListener("click", async function () {

                let ingName = this.getAttribute("data-ing");

                home.innerHTML = `<div class="container">
                                    <div class="row g-4" id="mealsByIngredient">
                                    </div>
                                </div>`;
                let mealsBox = document.getElementById("mealsByIngredient");

                showLoader();

                try {
                    let response2 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingName}`);
                    let data2 = await response2.json();

                    cartoona = "";

                    for (let meal of data2.meals) {
                        cartoona += `
                <div class="col-md-3">
                    <div class="inner position-relative overflow-hidden">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <div class="overlay" data-id="${meal.idMeal}">${meal.strMeal}</div>
                    </div>
                </div>`;
                    }

                    mealsBox.innerHTML = cartoona;
                    let mealCards = document.querySelectorAll(".inner");

                    for (let i = 0; i < mealCards.length; i++) {

                        mealCards[i].addEventListener("click", function (e) {

                            let mealID = mealCards[i]
                                .querySelector(".overlay")
                                .getAttribute("data-id");

                            createMealDetails(mealID);
                        });
                    }


                } catch (err) {
                    console.log(err);
                }
                finally {
                    hideLoader();
                }

            });
        });



    }
    catch (err) {
        console.log('error' + err);

    }
    finally {
        hideLoader();
    }

})

// area

const area = document.querySelector('.Area');
area.addEventListener('click', async function () {
    home.innerHTML = `        <div class="container">
            <div class="row g-4" id="areaContainer"></div>
        </div>`;
    const areaContainer = document.getElementById('areaContainer')
    cartoona = ``
    showLoader();
    try {
        let response3 = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        let Data3 = await response3.json();
        let area = Data3.meals.slice(0, 20);
        console.log(area);

        for (let ar of area) {
            cartoona += `
                         <div class="col-md-3 col-sm-6 area">
                            <div class="area-box" data-area="${ar.strArea}">
                                <i class="fa-solid fa-house-laptop"></i>
                                <h3>${ar.strArea}</h3>
                            </div>
                        </div> `;
        }
        areaContainer.innerHTML = cartoona;
        let allareaBoxes = document.querySelectorAll(".area-box");

        allareaBoxes.forEach(box => {
            box.addEventListener("click", async function () {

                let areaName = this.getAttribute("data-area");

                home.innerHTML = `<div class="container">
                                    <div class="row g-4" id="mealsByarea">
                                    </div>
                                </div>`;
                let mealsBox = document.getElementById("mealsByarea");

                showLoader();

                try {
                    let response4 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
                    let data4 = await response4.json();

                    cartoona = "";

                    for (let meal of data4.meals) {
                        cartoona += `
                <div class="col-md-3">
                    <div class="inner position-relative overflow-hidden">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <div class="overlay" data-id="${meal.idMeal}">${meal.strMeal}</div>
                    </div>
                </div>`;
                    }

                    mealsBox.innerHTML = cartoona;
                    let mealCards = document.querySelectorAll(".inner");

                    for (let i = 0; i < mealCards.length; i++) {

                        mealCards[i].addEventListener("click", function (e) {

                            let mealID = mealCards[i]
                                .querySelector(".overlay")
                                .getAttribute("data-id");

                            createMealDetails(mealID);
                        });
                    }


                } catch (err) {
                    console.log(err);
                }
                finally {
                    hideLoader();
                }

            });
        });



    }
    catch (err) {
        console.log('error' + err);

    } finally {
        hideLoader();
    }

})

// category

const Categories = document.querySelector('.Categories');
Categories.addEventListener('click', async function () {
    home.innerHTML = `        <div class="container">
            <div class="row g-4" id="categoriesContainer"></div>
        </div>`;
    const categoriesContainer = document.getElementById('categoriesContainer')
    cartoona = ``
    showLoader();
    try {
        let response5 = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        let Data5 = await response5.json();
        let AllCategories = Data5.categories;
        for (let Category of AllCategories) {
            let description = "No description available.";

            if (Category.strCategoryDescription) {
                description = Category.strCategoryDescription.split(" ").slice(0, 20).join(" ") + "...";
            }
            cartoona += `                <div class="col-md-3">
                    <div class="inner position-relative overflow-hidden">
                        <img src="${Category.strCategoryThumb}" alt="">
                        <div data-category="${Category.strCategory}" class="overlay text-center d-flex flex-column justify-content-center align-items-center category-box">
                                <h3>${Category.strCategory}</h3>
                                <p>${description}</p>
                        </div>
                    </div>
                </div>`;
        }
        categoriesContainer.innerHTML = cartoona;
        let allcategoryBoxes = document.querySelectorAll(".category-box");

        allcategoryBoxes.forEach(box => {
            box.addEventListener("click", async function () {

                let categoryName = this.getAttribute("data-category");

                home.innerHTML = `<div class="container">
                                    <div class="row g-4" id="mealsBycategory">
                                    </div>
                                </div>`;
                let mealsBox = document.getElementById("mealsBycategory");

                showLoader();

                try {
                    let response6 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
                    let data6 = await response6.json();

                    cartoona = "";

                    for (let meal of data6.meals) {
                        cartoona += `
                <div class="col-md-3">
                    <div class="inner position-relative overflow-hidden">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <div class="overlay" data-id="${meal.idMeal}">${meal.strMeal}</div>
                    </div>
                </div>`;
                    }

                    mealsBox.innerHTML = cartoona;
                    let mealCards = document.querySelectorAll(".inner");

                    for (let i = 0; i < mealCards.length; i++) {

                        mealCards[i].addEventListener("click", function (e) {

                            let mealID = mealCards[i]
                                .querySelector(".overlay")
                                .getAttribute("data-id");

                            createMealDetails(mealID);
                        });
                    }


                } catch (err) {
                    console.log(err);
                }
                finally {
                    hideLoader();
                }

            });
        });



    }
    catch (err) {
        console.log('error' + err);

    }
    finally {
        hideLoader();
    }

})

// search

const search = document.querySelector('.search');

search.addEventListener('click', function () {
    home.innerHTML = `
        <div class="search container w-75">

            <div class="row g-4">
                <div class="col-md-6">
                    <input id="searchByName" 
                        class="form-control bg-transparent text-white" 
                        type="text" 
                        placeholder="Search By Name">
                </div>

                <div class="col-md-6">
                    <input id="searchByLetter" 
                        class="form-control bg-transparent text-white" 
                        type="text" 
                        maxlength="1"
                        placeholder="Search By First Letter">
                </div>
            </div>
        </div>
        <div class="row mt-4 g-4 container" id="searchResults"></div>
    `;
    const searchByNameInput = document.getElementById("searchByName");
    const searchByLetterInput = document.getElementById("searchByLetter");
    searchByNameInput.addEventListener("keyup", function (e) {
        searchByName(e.target.value);
    });
    searchByLetterInput.addEventListener("keyup", function (e) {
        searchByFirstLetter(e.target.value);
    });

});
async function searchByName(name) {
    if (name.trim() === "") {
        searchResults.innerHTML = "";
        return;
    }
    showLoader();
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        let data = await response.json();
        displaySearchResults(data.meals);
    }
    catch (err) {
        console.log('error' + err);

    } finally {
        hideLoader();
    }
}

async function searchByFirstLetter(letter) {
    if (letter.trim() === "") {
        searchResults.innerHTML = "";
        return;
    }
    showLoader();
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        let data = await response.json();
        displaySearchResults(data.meals);
    }
    catch(err){
        console.log('error'+err);
        
    } finally{
        hideLoader();
    }
}
function displaySearchResults(meals) {
    const searchResults = document.getElementById("searchResults");
    cartoona = "";

    if (!meals) {
        cartoona = `
            <h3 class="text-white text-center py-5">No meals found</h3>
        `;
        searchResults.innerHTML = cartoona;
        return;
    }

    for (let meal of meals) {
        cartoona += `
        <div class="col-md-3">
            <div class="inner position-relative overflow-hidden rounded-3 meal-search-card">
                <img src="${meal.strMealThumb}" class="w-100 rounded-3" alt="">
                <div class="overlay"
                     data-id="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
        </div>`;
    };

    searchResults.innerHTML = cartoona;
    const layer = document.querySelectorAll(".overlay");

    for (let card of layer) {
        card.addEventListener("click", function (e) {
            let id = e.target.getAttribute("data-id");
            createMealDetails(id);
        });
    }

}








