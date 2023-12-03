# jQuery Table Repeater

!(https://brand.jquery.org/resources/jquery-mark-dark.gif)

## Overview

Welcome to the jQuery Table Repeater repository! This project demonstrates a dynamic table repeater implemented in jQuery, offering a flexible solution for adding rows and columns separately. The distinctive feature lies in the customizable columns, where each column can have various HTML tag options such as date, textarea, tel, text, and more.

## Features

- **Dynamic Row and Column Addition:** Add table rows and columns separately based on your requirements.
- **Customizable Columns:** Each column features a select option with diverse HTML tag selections, enhancing versatility.
- **Unique Indexing:** Rows and columns come with unique indices, ensuring structured data organization.
- **Array-Based Data Management:** Efficiently manage data using arrays, allowing for seamless handling and manipulation.

## Getting Started

Follow these steps to integrate the jQuery Table Repeater into your project:

1. Clone the repository: `git clone https://github.com/abdulrehmanijaz/jQueryTableRepeater.git`
2. Include the jQuery library: `<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>`
3. Include the jQuery UI library: `<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js?ver=6.2.3"></script>`
4. Include the `table-repeater.js` file in your HTML: `<script src="path/to/table-repeater.js"></script>`
5. Customize and use the provided functions in your project.

## Usage

```html
<!-- Add jQuery Library -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- Include table-repeater.js -->
<script src="path/to/table-repeater.js"></script>

<!-- Your HTML Table -->
<table id="yourTable">
  <!-- Table Content Goes Here -->
</table>

<!-- Initialize Table Repeater -->
<script>
  $(document).ready(function() {
    $('#yourTable').tableRepeater();
  });
</script>
