// Calculate estimated conception week (38 weeks or 266 days before birth, ±3 days)
export function calculateConceptionDate(birthDate: Date): {
  start: Date;
  end: Date;
  center: Date;
} {
  const center = new Date(birthDate);
  center.setDate(center.getDate() - 266);

  const start = new Date(center);
  start.setDate(start.getDate() - 3);

  const end = new Date(center);
  end.setDate(end.getDate() + 3);

  return { start, end, center };
}

// Static holiday data for demonstration - in production you might use an API
const HOLIDAYS = [
  { name: "New Year's Day", month: 1, day: 1, type: "National" },
  { name: "Valentine's Day", month: 2, day: 14, type: "Cultural" },
  { name: "St. Patrick's Day", month: 3, day: 17, type: "Cultural" },
  { name: "Easter", month: 4, day: 1, type: "Religious", varies: true },
  { name: "Memorial Day", month: 5, day: 30, type: "National", varies: true },
  { name: "Independence Day", month: 7, day: 4, type: "National" },
  { name: "Labor Day", month: 9, day: 5, type: "National", varies: true },
  { name: "Halloween", month: 10, day: 31, type: "Cultural" },
  { name: "Thanksgiving", month: 11, day: 24, type: "National", varies: true },
  { name: "Christmas Eve", month: 12, day: 24, type: "Religious" },
  { name: "Christmas Day", month: 12, day: 25, type: "Religious" },
  { name: "New Year's Eve", month: 12, day: 31, type: "Cultural" },
];

export async function getHolidaysAroundDate(
  dateRange: { start: Date; end: Date } | Date,
): Promise<Array<{ name: string; date: string; type: string }>> {
  // Handle both single date (for birth date) and date range (for conception week)
  let checkStart: Date, checkEnd: Date;

  if ("start" in dateRange) {
    checkStart = dateRange.start;
    checkEnd = dateRange.end;
  } else {
    checkStart = new Date(dateRange);
    checkEnd = new Date(dateRange);
    checkStart.setDate(checkStart.getDate() - 5);
    checkEnd.setDate(checkEnd.getDate() + 5);
  }
  const holidays = [];

  // Check for holidays within the date range
  for (const holiday of HOLIDAYS) {
    const holidayDate = new Date(
      checkStart.getFullYear(),
      holiday.month - 1,
      holiday.day,
    );

    // Check if holiday falls within our range
    if (holidayDate >= checkStart && holidayDate <= checkEnd) {
      holidays.push({
        name: holiday.name,
        date: `${holiday.month}/${holiday.day}`,
        type: holiday.type,
      });
    }

    // Also check previous and next year for edge cases
    const prevYearHoliday = new Date(
      checkStart.getFullYear() - 1,
      holiday.month - 1,
      holiday.day,
    );
    const nextYearHoliday = new Date(
      checkStart.getFullYear() + 1,
      holiday.month - 1,
      holiday.day,
    );

    if (prevYearHoliday >= checkStart && prevYearHoliday <= checkEnd) {
      holidays.push({
        name: holiday.name,
        date: `${holiday.month}/${holiday.day}`,
        type: holiday.type,
      });
    }

    if (nextYearHoliday >= checkStart && nextYearHoliday <= checkEnd) {
      holidays.push({
        name: holiday.name,
        date: `${holiday.month}/${holiday.day}`,
        type: holiday.type,
      });
    }
  }

  return holidays;
}

// Famous people data - in production this could come from an API
const FAMOUS_PEOPLE = [
  // January
  {
    name: "Martin Luther King Jr.",
    profession: "Civil Rights Leader",
    month: 1,
    day: 15,
    year: 1929,
  },
  {
    name: "Elvis Presley",
    profession: "Musician",
    month: 1,
    day: 8,
    year: 1935,
  },
  {
    name: "Muhammad Ali",
    profession: "Boxer",
    month: 1,
    day: 17,
    year: 1942,
  },
  // February
  {
    name: "Abraham Lincoln",
    profession: "US President",
    month: 2,
    day: 12,
    year: 1809,
  },
  {
    name: "Steve Jobs",
    profession: "Tech Entrepreneur",
    month: 2,
    day: 24,
    year: 1955,
  },
  {
    name: "George Washington",
    profession: "US President",
    month: 2,
    day: 22,
    year: 1732,
  },
  // March
  {
    name: "Albert Einstein",
    profession: "Physicist",
    month: 3,
    day: 14,
    year: 1879,
  },
  {
    name: "Lady Gaga",
    profession: "Singer/Actress",
    month: 3,
    day: 28,
    year: 1986,
  },
  // April
  {
    name: "Leonardo da Vinci",
    profession: "Artist/Inventor",
    month: 4,
    day: 15,
    year: 1452,
  },
  {
    name: "Queen Elizabeth II",
    profession: "British Monarch",
    month: 4,
    day: 21,
    year: 1926,
  },
  // May
  {
    name: "Audrey Hepburn",
    profession: "Actress",
    month: 5,
    day: 4,
    year: 1929,
  },
  {
    name: "John F. Kennedy",
    profession: "US President",
    month: 5,
    day: 29,
    year: 1917,
  },
  // June
  {
    name: "Marilyn Monroe",
    profession: "Actress",
    month: 6,
    day: 1,
    year: 1926,
  },
  {
    name: "Paul McCartney",
    profession: "Musician",
    month: 6,
    day: 18,
    year: 1942,
  },
  // July
  {
    name: "Nelson Mandela",
    profession: "Political Leader",
    month: 7,
    day: 18,
    year: 1918,
  },
  {
    name: "Ernest Hemingway",
    profession: "Author",
    month: 7,
    day: 21,
    year: 1899,
  },
  // August
  {
    name: "Barack Obama",
    profession: "US President",
    month: 8,
    day: 4,
    year: 1961,
  },
  {
    name: "Michael Jackson",
    profession: "Musician",
    month: 8,
    day: 29,
    year: 1958,
  },
  // September
  {
    name: "Mother Teresa",
    profession: "Humanitarian",
    month: 9,
    day: 5,
    year: 1910,
  },
  {
    name: "Beyoncé",
    profession: "Singer",
    month: 9,
    day: 4,
    year: 1981,
  },
  // October
  {
    name: "Mahatma Gandhi",
    profession: "Independence Leader",
    month: 10,
    day: 2,
    year: 1869,
  },
  {
    name: "John Lennon",
    profession: "Musician",
    month: 10,
    day: 9,
    year: 1940,
  },
  // November
  {
    name: "Marie Curie",
    profession: "Scientist",
    month: 11,
    day: 7,
    year: 1867,
  },
  {
    name: "Leonardo DiCaprio",
    profession: "Actor",
    month: 11,
    day: 11,
    year: 1974,
  },
  // December
  {
    name: "Walt Disney",
    profession: "Animator/Entrepreneur",
    month: 12,
    day: 5,
    year: 1901,
  },
  {
    name: "Isaac Newton",
    profession: "Scientist",
    month: 12,
    day: 25,
    year: 1642,
  },
  // Additional entries to increase match probability
  {
    name: "Taylor Swift",
    profession: "Singer",
    month: 12,
    day: 13,
    year: 1989,
  },
  {
    name: "Brad Pitt",
    profession: "Actor",
    month: 12,
    day: 18,
    year: 1963,
  },
  {
    name: "Denzel Washington",
    profession: "Actor",
    month: 12,
    day: 28,
    year: 1954,
  },
  {
    name: "Jim Carrey",
    profession: "Actor/Comedian",
    month: 1,
    day: 17,
    year: 1962,
  },
  {
    name: "Oprah Winfrey",
    profession: "Media Mogul",
    month: 1,
    day: 29,
    year: 1954,
  },
  {
    name: "Justin Timberlake",
    profession: "Singer/Actor",
    month: 1,
    day: 31,
    year: 1981,
  },
  {
    name: "Shakira",
    profession: "Singer",
    month: 2,
    day: 2,
    year: 1977,
  },
  {
    name: "Bob Marley",
    profession: "Musician",
    month: 2,
    day: 6,
    year: 1945,
  },
  {
    name: "Rihanna",
    profession: "Singer",
    month: 2,
    day: 20,
    year: 1988,
  },
  {
    name: "Justin Bieber",
    profession: "Singer",
    month: 3,
    day: 1,
    year: 1994,
  },
  {
    name: "Elton John",
    profession: "Singer",
    month: 3,
    day: 25,
    year: 1947,
  },
  {
    name: "Robert Downey Jr.",
    profession: "Actor",
    month: 4,
    day: 4,
    year: 1965,
  },
  {
    name: "Emma Watson",
    profession: "Actress",
    month: 4,
    day: 15,
    year: 1990,
  },
  {
    name: "Adele",
    profession: "Singer",
    month: 5,
    day: 5,
    year: 1988,
  },
  {
    name: "George Clooney",
    profession: "Actor",
    month: 5,
    day: 6,
    year: 1961,
  },
  {
    name: "Angelina Jolie",
    profession: "Actress",
    month: 6,
    day: 4,
    year: 1975,
  },
  {
    name: "Johnny Depp",
    profession: "Actor",
    month: 6,
    day: 9,
    year: 1963,
  },
  {
    name: "Tom Hanks",
    profession: "Actor",
    month: 7,
    day: 9,
    year: 1956,
  },
  {
    name: "Jennifer Lopez",
    profession: "Singer/Actress",
    month: 7,
    day: 24,
    year: 1969,
  },
  {
    name: "Madonna",
    profession: "Singer",
    month: 8,
    day: 16,
    year: 1958,
  },
  {
    name: "Keanu Reeves",
    profession: "Actor",
    month: 9,
    day: 2,
    year: 1964,
  },
  {
    name: "Will Smith",
    profession: "Actor",
    month: 9,
    day: 25,
    year: 1968,
  },
  {
    name: "Matt Damon",
    profession: "Actor",
    month: 10,
    day: 8,
    year: 1970,
  },
  {
    name: "Julia Roberts",
    profession: "Actress",
    month: 10,
    day: 28,
    year: 1967,
  },
  {
    name: "Leonardo DiCaprio",
    profession: "Actor",
    month: 11,
    day: 11,
    year: 1974,
  },
  {
    name: "Scarlett Johansson",
    profession: "Actress",
    month: 11,
    day: 22,
    year: 1984,
  },
  // Additional diverse entries for better coverage
  {
    name: "Ryan Gosling",
    profession: "Actor",
    month: 11,
    day: 12,
    year: 1980,
  },
  {
    name: "Emma Stone",
    profession: "Actress",
    month: 11,
    day: 6,
    year: 1988,
  },
  {
    name: "Anne Hathaway",
    profession: "Actress",
    month: 11,
    day: 12,
    year: 1982,
  },
  {
    name: "Mark Zuckerberg",
    profession: "Tech Entrepreneur",
    month: 5,
    day: 14,
    year: 1984,
  },
  {
    name: "Elon Musk",
    profession: "Entrepreneur",
    month: 6,
    day: 28,
    year: 1971,
  },
  {
    name: "Bill Gates",
    profession: "Tech Entrepreneur",
    month: 10,
    day: 28,
    year: 1955,
  },
  {
    name: "Serena Williams",
    profession: "Tennis Player",
    month: 9,
    day: 26,
    year: 1981,
  },
  {
    name: "Michael Jordan",
    profession: "Basketball Player",
    month: 2,
    day: 17,
    year: 1963,
  },
  {
    name: "Kobe Bryant",
    profession: "Basketball Player",
    month: 8,
    day: 23,
    year: 1978,
  },
  {
    name: "LeBron James",
    profession: "Basketball Player",
    month: 12,
    day: 30,
    year: 1984,
  },
  {
    name: "Tom Cruise",
    profession: "Actor",
    month: 7,
    day: 3,
    year: 1962,
  },
  {
    name: "Jennifer Lawrence",
    profession: "Actress",
    month: 8,
    day: 15,
    year: 1990,
  },
  {
    name: "Chris Hemsworth",
    profession: "Actor",
    month: 8,
    day: 11,
    year: 1983,
  },
  {
    name: "Gal Gadot",
    profession: "Actress",
    month: 4,
    day: 30,
    year: 1985,
  },
];

export function getFamousPeopleByBirthday(
  birthDate: Date,
): Array<{ name: string; profession: string; year: number }> {
  const birthMonth = birthDate.getMonth() + 1;
  const birthDay = birthDate.getDate();

  return FAMOUS_PEOPLE.filter(
    (person) => person.month === birthMonth && person.day === birthDay,
  ).map((person) => ({
    name: person.name,
    profession: person.profession,
    year: person.year,
  }));
}

// Utility function to format dates consistently
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Calculate age in years from birth date
export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

// Popular songs and movies by year (sample data)
const POPULAR_CULTURE_BY_YEAR: Record<
  number,
  { songs: string[]; movies: string[] }
> = {
  1990: {
    songs: [
      "Nothing Compares 2 U - Sinéad O'Connor",
      "Ice Ice Baby - Vanilla Ice",
    ],
    movies: ["Pretty Woman", "Home Alone"],
  },
  1991: {
    songs: [
      "(Everything I Do) I Do It for You - Bryan Adams",
      "I Wanna Sex You Up - Color Me Badd",
    ],
    movies: ["Terminator 2", "Beauty and the Beast"],
  },
  1992: {
    songs: [
      "I Will Always Love You - Whitney Houston",
      "Baby Got Back - Sir Mix-a-Lot",
    ],
    movies: ["Aladdin", "Basic Instinct"],
  },
  1993: {
    songs: [
      "I'd Do Anything for Love - Meat Loaf",
      "Dreamlover - Mariah Carey",
    ],
    movies: ["Jurassic Park", "The Fugitive"],
  },
  1994: {
    songs: ["The Sign - Ace of Base", "I'll Make Love to You - Boyz II Men"],
    movies: ["The Lion King", "Forrest Gump"],
  },
  1995: {
    songs: ["Waterfalls - TLC", "Kiss from a Rose - Seal"],
    movies: ["Toy Story", "Apollo 13"],
  },
  1996: {
    songs: ["Macarena - Los Del Rio", "Because You Loved Me - Celine Dion"],
    movies: ["Independence Day", "Twister"],
  },
  1997: {
    songs: ["Candle in the Wind - Elton John", "MMMBop - Hanson"],
    movies: ["Titanic", "The Lost World"],
  },
  1998: {
    songs: [
      "The Boy Is Mine - Brandy & Monica",
      "I Don't Want to Miss a Thing - Aerosmith",
    ],
    movies: ["Armageddon", "Saving Private Ryan"],
  },
  1999: {
    songs: ["Believe - Cher", "Livin' la Vida Loca - Ricky Martin"],
    movies: ["Star Wars Episode I", "The Sixth Sense"],
  },
  2000: {
    songs: ["Breathe - Faith Hill", "I Knew I Loved You - Savage Garden"],
    movies: ["Gladiator", "Cast Away"],
  },
  2001: {
    songs: [
      "Hanging by a Moment - Lifehouse",
      "Lady Marmalade - Christina Aguilera",
    ],
    movies: ["Shrek", "Harry Potter"],
  },
  2002: {
    songs: ["How You Remind Me - Nickelback", "Foolish - Ashanti"],
    movies: ["Spider-Man", "Lord of the Rings: Two Towers"],
  },
  2003: {
    songs: ["In Da Club - 50 Cent", "Crazy in Love - Beyoncé"],
    movies: ["Finding Nemo", "Pirates of the Caribbean"],
  },
  2004: {
    songs: ["Yeah! - Usher", "Burn - Usher"],
    movies: ["Shrek 2", "Spider-Man 2"],
  },
  2005: {
    songs: [
      "We Belong Together - Mariah Carey",
      "Hollaback Girl - Gwen Stefani",
    ],
    movies: ["Star Wars Episode III", "Harry Potter: Goblet of Fire"],
  },
  2006: {
    songs: ["Bad Day - Daniel Powter", "Temperature - Sean Paul"],
    movies: ["Pirates 2", "Cars"],
  },
  2007: {
    songs: ["Irreplaceable - Beyoncé", "Big Girls Don't Cry - Fergie"],
    movies: ["Transformers", "Shrek the Third"],
  },
  2008: {
    songs: ["Low - Flo Rida", "I Kissed a Girl - Katy Perry"],
    movies: ["The Dark Knight", "Iron Man"],
  },
  2009: {
    songs: ["Boom Boom Pow - Black Eyed Peas", "Poker Face - Lady Gaga"],
    movies: ["Avatar", "Transformers 2"],
  },
  2010: {
    songs: ["TiK ToK - Kesha", "California Gurls - Katy Perry"],
    movies: ["Toy Story 3", "Alice in Wonderland"],
  },
  2011: {
    songs: ["Rolling in the Deep - Adele", "Party Rock Anthem - LMFAO"],
    movies: ["Harry Potter: Deathly Hallows 2", "Transformers 3"],
  },
  2012: {
    songs: [
      "Somebody That I Used to Know - Gotye",
      "Call Me Maybe - Carly Rae Jepsen",
    ],
    movies: ["The Avengers", "The Dark Knight Rises"],
  },
  2013: {
    songs: ["Thrift Shop - Macklemore", "Blurred Lines - Robin Thicke"],
    movies: ["Iron Man 3", "Despicable Me 2"],
  },
  2014: {
    songs: ["Happy - Pharrell Williams", "Dark Horse - Katy Perry"],
    movies: ["Guardians of the Galaxy", "The Hunger Games 3"],
  },
  2015: {
    songs: [
      "Uptown Funk - Mark Ronson ft. Bruno Mars",
      "See You Again - Wiz Khalifa",
    ],
    movies: ["Star Wars: The Force Awakens", "Jurassic World"],
  },
  2016: {
    songs: ["One Dance - Drake", "Can't Stop the Feeling - Justin Timberlake"],
    movies: ["Rogue One", "Finding Dory"],
  },
  2017: {
    songs: ["Shape of You - Ed Sheeran", "Despacito - Luis Fonsi"],
    movies: ["Star Wars: Last Jedi", "Beauty and the Beast"],
  },
  2018: {
    songs: ["God's Plan - Drake", "Perfect - Ed Sheeran"],
    movies: ["Black Panther", "Avengers: Infinity War"],
  },
  2019: {
    songs: ["Old Town Road - Lil Nas X", "Sunflower - Post Malone"],
    movies: ["Avengers: Endgame", "The Lion King"],
  },
  2020: {
    songs: ["Blinding Lights - The Weeknd", "Circles - Post Malone"],
    movies: ["Bad Boys for Life", "Wonder Woman 1984"],
  },
  2021: {
    songs: ["Levitating - Dua Lipa", "Good 4 U - Olivia Rodrigo"],
    movies: ["Spider-Man: No Way Home", "Eternals"],
  },
  2022: {
    songs: ["Heat Waves - Glass Animals", "As It Was - Harry Styles"],
    movies: ["Top Gun: Maverick", "Black Panther 2"],
  },
  2023: {
    songs: ["Flowers - Miley Cyrus", "Unholy - Sam Smith"],
    movies: ["Barbie", "Oppenheimer"],
  },
  2024: {
    songs: ["Espresso - Sabrina Carpenter", "Not Like Us - Kendrick Lamar"],
    movies: ["Inside Out 2", "Deadpool & Wolverine"],
  },
};

export function getPopularCultureByYear(year: number): {
  songs: string[];
  movies: string[];
} {
  return POPULAR_CULTURE_BY_YEAR[year] || { songs: [], movies: [] };
}
