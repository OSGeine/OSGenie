global.rpg = {
  role(level) {
    level = parseInt(level);
    if (isNaN(level)) return { name: "", level: "" };

    const role = [
      { name: "Semi Junior", level: 0 },
      { name: "Junior", level: 8 }, //»»————⍟——««\n
      { name: "Semi Senior", level: 16 },
      { name: "Senior", level: 24 },
      { name: "Trainee Doctor", level: 32 },
      { name: "General Practitioner", level: 40 }, //𐏓・,〔𒁷, 𒆜〢
      { name: "Resident Doctor", level: 48 },
      { name: "Specialist", level: 56 },
      { name: "Senior Specialist", level: 64 },
      { name: "Consultant", level: 72 },
      { name: "Senior Consultant", level: 80 },
      { name: "Prof", level: 100 },
    ];

    return role.reverse().find((role) => level >= role.level);
  },
};
