(function($){

    $.fn.customTabs = function(options){

        var settings = $.extend({
            activeClass: "active",
            animationSpeed: 300,
            defaultTab: null
        }, options);

        return this.each(function(){

            var $container = $(this);
            var $tabs = $container.find(".tab-nav li");
            var $panels = $container.find(".tab-panel");

            function activateTab(tabId) {
                $tabs.removeClass(settings.activeClass);
                $panels.hide();

                $tabs.filter("[data-tab='" + tabId + "']")
                     .addClass(settings.activeClass);

                $("#" + tabId).fadeIn(settings.animationSpeed);

                // Update URL hash
                window.location.hash = tabId;
            }

            $tabs.on("click", function(){
                var tabId = $(this).data("tab");
                activateTab(tabId);
            });

            $tabs.attr("tabindex", "0");

            $tabs.on("keydown", function(e){
                var index = $tabs.index(this);

                if(e.key === "ArrowRight"){
                    index = (index + 1) % $tabs.length;
                    $tabs.eq(index).focus().click();
                }

                if(e.key === "ArrowLeft"){
                    index = (index - 1 + $tabs.length) % $tabs.length;
                    $tabs.eq(index).focus().click();
                }

                if(e.key === "Enter"){
                    $(this).click();
                }
            });

            var hash = window.location.hash.substring(1);

            if(hash && $("#" + hash).length){
                activateTab(hash);
            } else if(settings.defaultTab){
                activateTab(settings.defaultTab);
            } else {
                activateTab($tabs.first().data("tab"));
            }

        });

    };

}(jQuery));