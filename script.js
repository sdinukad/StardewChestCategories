const items = [
    "Acorn",
    "Ancient Seed",
    "Aquamarine",
    "Bat Wing",
    "Battery Pack",
    "Blackberry",
    "Bone Fragment",
    "Bug Meat",
    "Chanterelle",
    "Cinder Shard",
    "Clam",
    "Clay",
    "Cloth",
    "Coal",
    "Coconut",
    "Common Mushroom",
    "Copper Bar",
    "Copper Ore",
    "Coral",
    "Crocus",
    "Crystal Fruit",
    "Daffodil",
    "Dandelion",
    "Diamond",
    "Dragon Tooth",
    "Dwarf Gadget",
    "Earth Crystal",
    "Fairy Rose",
    "Fibre",
    "Fire Quartz",
    "Fish (Any)",
    "Frozen Tear",
    "Garlic",
    "Ginger",
    "Gold Bar",
    "Gold Ore",
    "Grape",
    "Hardwood",
    "Hazelnut",
    "Honey",
    "Iridium Bar",
    "Iridium Ore",
    "Iron Bar",
    "Iron Ore",
    "Jazz Seeds",
    "Leek",
    "Maple Seed",
    "Maple Syrup",
    "Marble",
    "Mixed Seeds",
    "Morel",
    "Oak Resin",
    "Oil",
    "Pine Cone",
    "Pine Tar",
    "Poppy Seeds",
    "Prismatic Shard",
    "Pumpkin",
    "Purple Mushroom",
    "Radioactive Bar",
    "Radioactive Ore",
    "Red Mushroom",
    "Refined Quartz",
    "Sap",
    "Slime",
    "Snow Yam",
    "Solar Essence",
    "Spangle Seeds",
    "Spice Berry",
    "Stone",
    "Sweet Pea",
    "Torch",
    "Truffle Oil",
    "Tulip Bulb (Seed)",
    "Void Essence",
    "Wild Horseradish",
    "Wild Plum",
    "Wild Seeds (Any)",
    "Winter Root",
    "Wood"
  ];
  const unassignedList = $("#unassigned .sortable-list");
  
  const categoryLimits = {
    unassigned: 80, // Limit for Unassigned category
    seeds: 3,
    forage: 36,
    crafting: 36,
    minerals: 36,
    monster: 36,
    special: 36,
    // Define limits for other categories
  };
  
  $(document).ready(function() {
    loadListDataFromLocalStorage();
  
    if (unassignedList.children().length === 0) {
      items.forEach(item => {
        unassignedList.append(`<li>${item}</li>`);
      });
    }
  
    $(".sortable-list").sortable({
      connectWith: ".connected-sortable",
      receive: function(event, ui) {
        const targetCategoryId = $(this).parent().attr("id");
        const originalList = ui.sender;
        const originalCategoryId = originalList.parent().attr("id");
  
        if (currentItemCount(targetCategoryId) > categoryLimits[targetCategoryId]) {
          originalList.sortable("cancel");
          return; // Don't proceed if the target list is full
        }
  
        enforceItemLimit(targetCategoryId); // Enforce limit for the target category
        updateCounters(originalCategoryId); // Update the counter for the original category
        updateCounters(targetCategoryId); // Update the counter for the target category
        saveListDataToLocalStorage();
      }
    });
    
  
    $("#download-button").click(function() {
      const categories = $(".category");
      let data = "";
  
      categories.each(function(index, category) {
        const categoryId = $(category).attr("id");
        const items = $("#" + categoryId + " .sortable-list li").map(function() {
          return $(this).text();
        }).get();
  
        data += categoryId + ": " + items.join(", ") + "\n\n";
      });
  
      const blob = new Blob([data], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "categorized_items.txt";
      a.click();
    });
  
    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", function() {
      const allItems = [];
      $(".category .sortable-list li").each(function() {
        allItems.push($(this).text());
      });
  
      $(".category .sortable-list").empty();
  
      unassignedList.empty();
      allItems.forEach(item => {
        unassignedList.append(`<li>${item}</li>`);
      });
  
      $(".category").each(function(index, category) {
        const categoryId = $(category).attr("id");
        const itemCount = $("#" + categoryId + " .sortable-list li").length;
        $("#" + categoryId + " .counter").text(`(${itemCount}/${categoryLimits[categoryId]})`);
      });
  
      localStorage.removeItem("categoryData");
    });
  });
  
  function enforceItemLimit(categoryId) {
    const currentList = $("#" + categoryId + " .sortable-list");
    const currentItemCount = currentList.children().length;
  
    if (currentItemCount > categoryLimits[categoryId]) {
      const exceededItems = currentList.children().slice(categoryLimits[categoryId]);
      unassignedList.append(exceededItems);
      currentList.children().slice(categoryLimits[categoryId]).remove();
    }
  
    $(".sortable-list").sortable("refresh"); // Refresh the sortable lists
  }
  
  function currentItemCount(categoryId) {
    return $("#" + categoryId + " .sortable-list li").length;
  }
  

  function saveListDataToLocalStorage() {
    const categories = $(".category");
    let data = {};
  
    categories.each(function(index, category) {
      const categoryId = $(category).attr("id");
      const items = $("#" + categoryId + " .sortable-list li").map(function() {
        return $(this).text();
      }).get();
  
      data[categoryId] = items;
    });
  
    localStorage.setItem("categoryData", JSON.stringify(data));
  }
  
  function loadListDataFromLocalStorage() {
    const storedData = localStorage.getItem("categoryData");
  
    if (storedData) {
      const data = JSON.parse(storedData);
      Object.keys(data).forEach(categoryId => {
        const items = data[categoryId];
        const categoryList = $("#" + categoryId + " .sortable-list");
        categoryList.empty();
        items.forEach(item => {
          categoryList.append(`<li>${item}</li>`);
        });
  
        const itemCount = items.length;
        $("#" + categoryId + " .counter").text(`(${itemCount}/${categoryLimits[categoryId]})`);
      });
    }
  }
  
  function updateCounters(categoryId) {
    const currentItemCount = $("#" + categoryId + " .sortable-list li").length;
    $("#" + categoryId + " .counter").text(`(${currentItemCount}/${categoryLimits[categoryId]})`);
  }