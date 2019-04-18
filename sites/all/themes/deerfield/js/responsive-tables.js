jQuery(document).ready(function ($) {

    // Find all tables
    $('table:has(tr > th)').each(function (index, elem) {
        $table = $(this);
        if ( $table.hasClass( 'is-responsive-table' ) ) {

            $table.addClass('responsive-table');

            var headers = [];
            $(this)
                .find('tr:has(th)')
                .each(function (rowIndex, row) {
                    $(this).find('th').each(function (colIndex, col) {
                        headers[colIndex] = $(this).text().trim();

                    });

                });

            $(this)
                .find('tr:has(td)')
                .each(function (rowIndex, row) {
                    $(this).find('td').each(function (colIndex, col) {
                        html = $(this).html().trim();
                        if ( html.length > 0 ) {
                            labelLength = 0;
                            if (headers[colIndex] != null) {
                                labelLength = headers[colIndex].length;
                            }
                            $(this).html(
                                '<label class="responsive-cell-label" data-length="' + labelLength + '"> ' +
                                headers[colIndex] +
                                '</label>' +
                                '<span class="responsive-cell-content">' +
                                html + '' +
                                '</span>'
                            );
                        }
                    });

                });
        }

    });

});
