(function ($) {
    $(document).ready(function () {
        // Decrement quantity when minus button is clicked
        $('.brandy-feature-product-quantity .quantity-minus').click(function () {
            var $quantityInput = $('.brandy-feature-product-quantity .quantity input.qty');
            var currentValue = parseInt($quantityInput.val());
            if (currentValue > 1) {
                $quantityInput.val(currentValue - 1);
            }
        });

        // Increment quantity when plus button is clicked
        $('.brandy-feature-product-quantity .quantity-plus').click(function () {
            var $quantityInput = $('.brandy-feature-product-quantity .quantity input.qty');
            var currentValue = parseInt($quantityInput.val());
            $quantityInput.val(currentValue + 1);
        });
    });
})(window.jQuery);
