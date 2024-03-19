global.rpg = {
  role(level) {
    level = parseInt(level);
    if (isNaN(level)) return { name: "", level: "" };

    const role = [
      { name: "Semi Junior", level: 0, id: 0 },
      { name: "Junior", level: 8, id: 1 }, //»»————⍟——««\n
      { name: "Semi Senior", level: 16, id: 2 },
      { name: "Senior", level: 24, id: 3 },
      { name: "Trainee Doctor", level: 32, id: 4 },
      { name: "General Practitioner", level: 40, id: 5 }, //𐏓・,〔𒁷, 𒆜〢
      { name: "Resident Doctor", level: 48, id: 6 },
      { name: "Assistant Specialist", level: 56, id: 7 },
      { name: "Specialist", level: 64, id: 8 },
      { name: "Senior Specialist", level: 72, id: 9 },
      { name: "Consultant", level: 80, id: 10 },
      { name: "Senior Consultant", level: 88, id: 11 },
      { name: "Prof", level: 110, id: 12 },
    ];

    return role.reverse().find((role) => level >= role.level);
  },
};
