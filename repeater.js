(function($) {
    $.fn.repeater = function(params) {
        var repeater = this;
        var addRowButton = repeater.find('.repeater-add-row');
        var addColumnButton = repeater.find('.repeater-add-column');
        var remove3Row = repeater.find('.repeater-remove-row');

        addRowButton.on('click', function() {
            addRow();
        });

        addColumnButton.on('click', function() {
            addColumn();
        });
        remove3Row.on('click', function() {
            jQuery(this)
            removeRow(jQuery(this))
        })
        if (params.sortable) {
            repeater.find('tbody').sortable({
                handle: '.row-label', // You can use a specific element to drag the rows
                update: function(event, ui) {
                    $('.row-label').each(function(i) {
                        var numbering = i + 1;
                        $(this).text('Row ' + numbering);
                    });
                    addRowItem()
                    setTimeout(function() {
                        var formData = $('#formId').serialize();
                        formDataFun(formData);
                    }, 500)
                }
            });
        }

        function addItem(itemContent, key, isColumn) {
            var group = itemContent.closest('table').find('thead').data("group"); // Get data-group from the table
            var item = itemContent;
            var input = item.find('input, select');
            input.each(function(index, el) {
                var attrName = $(el).data('name');
                var skipName = $(el).data('skip-name');
                if (skipName !== true) {
                    var arrayIndex = isColumn ? index + 1 : key + 1;
                    var name = group + '[' + arrayIndex + ']' + attrName;
                    $(el).attr('name', name);
                } else {
                    if (attrName !== 'undefined') {
                        $(el).attr('name', attrName);
                    }
                }
            });
        }

        function addRowItem() {
            //var repeater = jQuery('.repeater-table');
            var group = repeater.find('table').find('tbody').data("group");
            var count = 0;
            repeater.find('tbody tr').each(function(rowIndex, row) {
                count = count + 1;
                jQuery(row).find('.row-label').html('Row ' + count);
                jQuery(row).find('td').each(function(index, td) {
                    var attrType = jQuery(td).find('input,textarea').attr('type');
                    var name = group + '[' + rowIndex + '][' + index + '][' + attrType + ']';
                    jQuery(td).find('input,textarea').attr('name', name);

                });
            });
        }

        function addRow() {
            var group = repeater.find('table').find('tbody').data("group");
            var newRow = $('<tr>');
            var rowIndex = repeater.find('tbody tr').length + 1; // Calculate the row index
            newRow.append('<td class="row-label">Row ' + rowIndex + '</td>');
            repeater.find('thead th:gt(0)').each(function(index) {
                //console.log(index)
                //var columnName = $(this).find('input').val().trim().split(' ').join('_'); // Get the column name from the th
                var inputTypeSelect = $('<select>').attr('name', group + '[' + rowIndex + '][' + index + '][select]')
                    .append('<option value="text">Select</option>')
                    .append('<option value="text">Text</option>')
                    .append('<option value="date">Date</option>')
                    .append('<option value="tel">Tel</option>')
                    .append('<option value="number">Number</option>')
                    .append('<option value="checkbox">Checkbox</option>')
                    .append('<option value="textarea">Textarea</option>')
                    .on('change', function() {
                        var selectedType = $(this).val();
                        var inputField;
                        if (selectedType === 'textarea') {
                            inputField = $('<textarea>').attr('type', selectedType).attr('name', group + '[' + rowIndex + '][' + index + '][' + selectedType + ']');
                        } else {
                            inputField = $('<input>').attr('type', selectedType).attr('name', group + '[' + rowIndex + '][' + index + '][' + selectedType + ']');
                        }
                        $(this).closest('td').html(inputField); // Replace the content of the current td with the input field
                    });
                var inputTypeCell = $('<td>').append(inputTypeSelect);
                newRow.append(inputTypeCell);
            });

            newRow.append('<td><button class="btn btn-danger repeater-remove-row"><i class="fas fa-trash-alt"></i></button></td>');
            repeater.find('tbody').append(newRow);

            newRow.find('.repeater-remove-row').on('click', function() {
                $(this).closest('tr').remove();
                addRowItem()
                setTimeout(function() {
                    var formData = $('#formId').serialize();
                    formDataFun(formData);
                }, 500)
            });

        }

        function addColumn() {
            var columnIndex = repeater.find('th').length;
            repeater.find('tr').each(function(index) {
                $(this).append('<th><input type="text" data-name="column_name"></th>');
            });
            repeater.find('th:last-child').append('<button class="btn btn-danger repeater-remove-column"><i class="fas fa-times"></i></button>');
            repeater.find('th:last-child').wrapInner("<div class='cl-head'></div>")
            repeater.find('.repeater-remove-column').on('click', function() {
                var columnIndex = $(this).closest('th').index();
                removeColumn(columnIndex);
            });
            addItem(repeater.find('tr:last-child'), columnIndex, true);
        }

        function removeColumn(index) {
            repeater.find('tr').each(function() {
                $(this).find('th:eq(' + index + '), td:eq(' + index + ')').remove();
            });
        }

        function removeRow(removerow) {
            removerow.closest('tr').remove();
            addRowItem()
            setTimeout(function() {
                var formData = $('#formId').serialize();
                formDataFun(formData);
            }, 500)
        }
    };
})(jQuery);

jQuery(document).ready(function($) {

    $(document).find('#repeaterTable').repeater({
        sortable: true
    });

    jQuery(document).on('change', '#formId input ,#formId textarea', function() {
        setTimeout(function() {
            var formData = $('#formId').serialize();
            formDataFun(formData);
        }, 500)
    });

    jQuery(document).on('change', 'input[type=checkbox]', function() {
        if (!jQuery(this).prop("checked")) {
            jQuery(this).attr("value", "off");
            var name = jQuery(this).attr("name");
            jQuery(this).after('<input type="hidden" name="' + name + '" value="off">');
        } else {
            jQuery(this).attr("value", "on");
            jQuery(this).next('input[type="hidden"]').remove();
        }
    });


});

function formDataFun(formData) {
    console.log(formData)

}
