$(document).ready(function(){

    let productCount = 3;

    $("#productList").on("click", ".details-btn", function(){

        let details = $(this).siblings(".details");

        details.stop(true, true).slideToggle(400);

    });

    $("#productList").on("mouseenter", ".product", function(){
        $(this).addClass("highlight");
    });

    $("#productList").on("mouseleave", ".product", function(){
        $(this).removeClass("highlight");
    });

    $("#productList").on("click", ".product", function(e){

        if(!$(e.target).hasClass("details-btn")){
            $(this).toggleClass("clicked");
        }

    });

    $("#toggleView").click(function(){

        $("#productList").fadeOut(200, function(){

            $(this).toggleClass("grid-view list-view");

            if($(this).hasClass("grid-view")){
                $("#toggleView").text("Switch to List View");
            } else {
                $("#toggleView").text("Switch to Grid View");
            }

            $(this).fadeIn(200);
        });

    });

    $("#addItem").click(function(){

        productCount++;

        let newItem = `
            <li class="product">
                <h3>Product ${productCount}</h3>
                <button class="details-btn">Details</button>
                <div class="details">
                    <p>This is dynamically added Product ${productCount}.</p>
                </div>
            </li>
        `;

        $("#productList").append(newItem).hide().fadeIn(300);

    });

});