# Stardew Chest Organizer

[Live version available here!](https://stardew-item-chest-organizer.onrender.com/)

Drag and drop craftable items that are used in a workbench to different chests 
for easy planning and organizing.

## Table of Contents

- [Features](#features)
- [Changelog](#changelog)
- [Usage](#usage)
- [Installation](#installation)
- [Technologies Used](#technologies-used)

## Features

- Drag and drop items between categories
- Save categorized data locally
- Download categorized data as a text file

## Changelog

### Version 1.2.0

- Added the ability to enforce item limits for each category.
- Improved drag-and-drop functionality to prevent adding items beyond category limits.
- Items can now be dragged and dropped only within the category's capacity.
- Implemented item return functionality to original position when rejected from a full category.
- Implemented reset items button functionality to move items back to "Unassigned" category.
- Fixed issues related to dragging items between full lists.
- Fixed animation and behavior when dragging items between existing items in a list.
- Text on the page cannot be highlighted to avoid inconvenience while moving items

### Version 1.1.0

- Fixed widths of columns to fit the screen.
- Reduced text size for improved readability.
- Added grab and grabbing cursors for better interaction.
- Created a reset items button for moving items back to "Unassigned".

### Version 1.0.0

- Initial release of the Stardew Chest Organizer application.
- Basic drag-and-drop functionality between categories.

### To Do

- Implement the reset items button functionality
- Display item count x/36 on top to indicate capacity

## Usage

1. Drag and drop items from the "Unassigned" category to the desired categories.
2. Use the download button to save categorized data as a text file.

## Installation

1. Clone the repository: `git clone https://github.com/your-username/drag-and-drop-list.git`
2. Navigate to the project folder: `cd drag-and-drop-list`
3. Open `index.html` in your web browser.

## Technologies Used

- HTML
- CSS
- JavaScript
- jQuery
- jQuery UI
