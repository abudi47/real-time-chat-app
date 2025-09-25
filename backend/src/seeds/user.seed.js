import { config } from "dotenv";
import { connectDb } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Female Users
  {
    email: "abduselamT@gmail.com",
    fullName: "abduselamT",
    password: "abduselamT",
    profilePic:
      "https://portal.astu.edu.et/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN2VtQWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--92921af63427c1b8ac35c9365f8809ef2197abc4/1716708330046.jpg",
  },
  {
    email: "abduselamM@gmail.com",
    fullName: "abduselamM",
    password: "abduselamM",
    profilePic:
      "https://portal.astu.edu.et/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBd2paQWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c8421251acea9474804b17f2db3847b54115b80d/IMG_8168.JPG",
  },
  {
    email: "biniyam@gmail.com",
    fullName: "biniyam",
    password: "biniyam",
    profilePic:
      "https://portal.astu.edu.et/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOFc1QWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--8eca8b1f487c710e2e22facf84c1421487c7b075/IMG_20241018_012126_097.jpg",
  },

  {
    email: "abdurahman@gmail.com",
    fullName: "abdurahman",
    password: "abdurahman",
    profilePic:
      "https://portal.astu.edu.et/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNGE2QWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--fc3c8ece2b066055fb563cf549cff1ce736f8526/IMG_20241026_214856_961.webp",
  },
  {
    email: "abuzer@gmail.com",
    fullName: "abuzer",
    password: "abuzer",
    profilePic:
      "https://portal.astu.edu.et/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBem8vQWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--ce42b55d33a8e3842d14c85556766478490f642a/5G5A4593.jpg",
  },
  {
    email: "abyalew@gmail.com",
    fullName: "abyalew",
    password: "abyalew",
    profilePic:
      "https://portal.astu.edu.et/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBeUEvQWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--b187e5ec539b8c197ebeb2247528aa6ace0d5a23/abi.jpg",
  },
  {
    email: "aman@gmail.com",
    fullName: "aman",
    password: "aman",
    profilePic:
      "https://portal.astu.edu.et/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN0t2QWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--ee708ffab0f55336a1c4748f8643dc39d50e38e8/aman2.png",
  },

  // Male Users
  {
    email: "abubeker@gmail.com",
    fullName: "abubeker",
    password: "abubeker",
    profilePic:
      "https://portal.astu.edu.et/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMlpIQWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--8f644524739abb1d1c52a9d50107bb3845ffc05d/Screenshot_20220527-101601_Gallery.jpg",
  },
  {
    email: "ananiya@gmail.com",
    fullName: "ananiya",
    password: "ananiya",
    profilePic:
      "https://portal.astu.edu.et/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMFk4QWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--9a97e1de622c8a7134e0f9a099371fcadff3ff42/5G5A4000.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDb();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
