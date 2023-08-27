$(document).ready(function() {
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
    "Fiber",
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
    items.forEach(item => {
      unassignedList.append(`<li>${item}</li>`);
    });
  
    $(".sortable-list").sortable({
      connectWith: ".connected-sortable"
    });
  
    $("#download-button").click(function() {
      const categories = $(".category");
      let data = "";
  
      categories.each(function(index, category) {
        const categoryId = $(category).attr("id");
        const items = $("#" + categoryId + " .sortable-list li").map(function() {
          return $(this).text();
        }).get();
  
        data += categoryId + ": " + items.join(", ") + "\n";
      });
  
      const blob = new Blob([data], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "categorized_items.txt";
      a.click();
    });
  });
  