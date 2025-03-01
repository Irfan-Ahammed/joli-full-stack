import Category from "../models/category.model.js";

export const insertCategories = async (req, res) => {
  try {
    const categories = [
      { id: 1, name: "Cleaning Services", icon: "🧹" },
      { id: 2, name: "Food Delivery", icon: "🍔" },
      { id: 3, name: "Construction Work", icon: "🏗️" },
      { id: 4, name: "Retail Assistance", icon: "🛍️" },
      { id: 5, name: "Transportation", icon: "🚛" },
      { id: 6, name: "Child Care", icon: "👶" },
      { id: 7, name: "Elder Care", icon: "🩺" },
      { id: 8, name: "Gardening", icon: "🌿" },
      { id: 9, name: "Event Assistance", icon: "🎉" },
      { id: 10, name: "Pet Care", icon: "🐾" },
      { id: 11, name: "Technical Support", icon: "🛠️" },
      { id: 12, name: "Carpentry", icon: "🪚" },
      { id: 13, name: "Plumbing", icon: "🚿" },
      { id: 14, name: "Electrical Work", icon: "💡" },
      { id: 15, name: "Painting Services", icon: "🎨" },
      { id: 16, name: "Security Services", icon: "🛡️" },
      { id: 17, name: "Cooking", icon: "🍳" },
      { id: 18, name: "Laundry Services", icon: "🧺" },
      { id: 19, name: "Driving Jobs", icon: "🚗" },
      { id: 20, name: "Warehouse Jobs", icon: "📦" },
      { id: 21, name: "Housekeeping", icon: "🛏️" },
      { id: 22, name: "Babysitting", icon: "👶" },
      { id: 23, name: "Office Assistance", icon: "🗂️" },
      { id: 24, name: "Gardening and Lawn Care", icon: "🌱" },
      { id: 25, name: "Delivery Riders", icon: "🛵" },
      { id: 26, name: "Customer Support", icon: "📞" },
      { id: 27, name: "House Painting", icon: "🎨" },
      { id: 28, name: "Air Conditioning Maintenance", icon: "❄️" },
      { id: 29, name: "Cleaning & Maintenance", icon: "🧽" },
      { id: 30, name: "Data Entry", icon: "⌨️" },
      { id: 31, name: "Tailoring", icon: "🧵" },
      { id: 32, name: "Car Wash", icon: "🚗💦" },
      { id: 33, name: "Furniture Assembly", icon: "🪑" },
      { id: 34, name: "Mover Assistance", icon: "📦" },
      { id: 35, name: "Tech Installation", icon: "📱" },
      { id: 36, name: "Flooring Installation", icon: "🏠" },
      { id: 37, name: "Warehouse Sorting", icon: "📦" },
      { id: 38, name: "Grocery Shopping", icon: "🛒" },
      { id: 39, name: "Courier Services", icon: "📬" },
      { id: 40, name: "Moving Services", icon: "🚚" }
    ];

    for (const category of categories) {
      const existingCategory = await Category.findOne({ name: category.name });
      if (!existingCategory) {
        await Category.create(category);
      }
    }

    res.status(201).json({ message: "Categories added successfully!" });
  } catch (error) {
    console.error("Error inserting categories:", error);
    res.status(500).json({ message: "Error inserting categories", error });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find(); // Fetch all categories
    res.status(200).json(categories); // Send the response
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories", error });
  }
};
