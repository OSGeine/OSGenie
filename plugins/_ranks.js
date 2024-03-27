global.rpg = {
  role(level) {
    level = parseInt(level);
    if (isNaN(level)) return { name: "", level: "" };

    const role = [
      { name: "Semi Junior", level: 0, id: 0 },
      { name: "Junior", level: 5, id: 1 }, //»»————⍟——««
      { name: "Semi Senior", level: 10, id: 2 },
      { name: "Senior", level: 15, id: 3 },
      { name: "Trainee Doctor", level: 20, id: 4 },
      { name: "General Practitioner", level: 25, id: 5 },
      { name: "Resident Doctor", level: 30, id: 6 },
      { name: "Assistant Specialist", level: 35, id: 7 },
      { name: "Specialist", level: 40, id: 8 },
      { name: "Senior Specialist", level: 45, id: 9 },
      { name: "Consultant", level: 50, id: 10 },
      { name: "Senior Consultant", level: 55, id: 11 },
      { name: "Prof", level: 60, id: 12 },
    ];

    return role.reverse().find((role) => level >= role.level);
  },
};
