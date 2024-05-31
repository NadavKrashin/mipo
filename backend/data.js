// src/api/mockData.js
module.exports = attendanceData = [
  {
    id: 1,
    name: "Admin User",
    team: "צוות 1",
    phone: "1234567890",
    avatar: "",
    present: false,
    isHome: false,
    isAdmin: true,
  },
  // Add more users with similar properties but isAdmin set to false and isHome randomly set to true or false
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 2,
    name: `User ${i + 2}`,
    team: `צוות ${(i % 8) + 1}`,
    phone: `123456789${i + 1}`,
    avatar: "",
    present: false,
    isHome: Math.random() > 0.5,
    isAdmin: false,
  })),
];
