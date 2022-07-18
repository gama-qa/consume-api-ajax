$(document).ready(function () {
  // default halaman
  $("#content").load("category-list.html");

  // menampilkan list category
  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/categories.php",
    success: (results) => {
      // Jika Sukses
      const mealCategories = results.categories;
      let cards = "";
      //   Menampilkan Data API
      mealCategories.forEach((m) => {
        cards += `<div class="col-sm-6 col-md-4 my-3">
            <div class="card text-center">
              <img src="${m.strCategoryThumb}" class="card-img-top" alt="" />
              <div class="card-body">
                <h5 class="card-title">${m.strCategory}</h5>
                <a data-page="categories-detail" class="btn btn-success meal-category-btn" data-meals="${m.strCategory}">Category Details</a>
              </div>
            </div>
          </div>`;
      });
      $(".meal-categories").html(cards);

      // Category Detail Button
      $(".meal-category-btn").click(function () {
        // Direct halaman setelah tombol di klik
        var page = $(this).data("page");
        $("#content").load(page + ".html");
        // GET Url API
        $.ajax({
          url:
            "https://www.themealdb.com/api/json/v1/1/filter.php?c=" +
            $(this).data("meals"),
          success: (results) => {
            const mealCategoryDetail = results.meals;
            let cardsDetailCategory = "";
            // Menampilkan Data API
            mealCategoryDetail.forEach((m) => {
              cardsDetailCategory += `<div class=" col-6 col-sm-6 col-md-4 my-3">
            <div class="card text-center">
              <img src="${m.strMealThumb}" class="card-img-top" alt="" />
              <div class="card-body">
                <h5 class="card-title">${m.strMeal}</h5>
                <a href="#" data-page="meals-detail" class="btn btn-success meals-detail" data-meals="${m.idMeal}">Learn More</a>
              </div>
            </div>
          </div>`;
            });
            $(".meal-categories-detail").html(cardsDetailCategory);
          },
        });
      });
    },
    error: (e) => {
      // Jika error
      console.log(e.responseText);
    },
  });
});
