    $(function () {

        if (window.innerWidth < 991) {
            $('.show-click').removeClass('active');
        }

        $('.list-group li[data-is-child="True"]').next('li[data-is-sub-child="True"]').each(function () {
            var childParent = $(this).prev();
            console.log(childParent.html());

            //var subChildList = childParent.nextUntil('li[data-is-parent="True"]');
            var subChildList = childParent.nextUntil('li[data-is-sub-child="False"]');
            if (subChildList.length < 1) {

                // sub child false
                if (childParent["0"].attributes[1].value == "False") {
                    subChildList = childParent.nextAll('li[data-is-child="True"]');
                    childParent.addClass('parent-item');
                }
                else {
                    childParent.removeClass('child-item');
                    childParent.addClass('grand-child-item');
                }

            }

            // sub parent true
            if (childParent["0"].attributes[3].value == "True") {
                    childParent.addClass("parent-item");
                subChildList.appendTo(childParent);
                childParent.children('li[data-is-child="True"]').wrapAll('<ul></ul>');
            }
           
        });

        $('.list-group li[data-is-parent="True"]').next('li[data-is-child="True"]').each(function () {
            var parent = $(this).prev();
            var childList = parent.nextUntil('li[data-is-parent="True"]');
            childList.appendTo(parent);
            parent.children('li').wrapAll('<ul></ul>');
            parent.addClass('parent-item');
        });

       $('.list-group .list-group-item + .fa').click(function () {
            if(this.parentNode.classList.contains("active")){
                $(this).parent().toggleClass('active');
            }
            else{
                $('.side-right .parent-item.active').removeClass('active');
                $(this).parent().toggleClass('active');
            }
            
        })

        if ($('.parent-item ul li a.selected.list-group-item').length) {
            $('.parent-item ul li a.selected.list-group-item').parent().addClass("active");

            $('.parent-item ul li a.selected.list-group-item').parent().parent().parent().addClass("active");
                $('.parent-item ul li a.selected.list-group-item').parent().parent().parent().parent().parent().addClass("active");
            
            

        }
    });

