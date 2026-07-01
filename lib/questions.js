const QUESTIONS = [
  { q: "Which rapper's debut album was 'Reasonable Doubt'?", a: 0, choices: ["JAY-Z","Nas","Biggie","Rakim"], cat: "🎵 Music", pts: 100 },
  { q: "What group did Beyoncé belong to before going solo?", a: 2, choices: ["TLC","En Vogue","Destiny's Child","SWV"], cat: "🎵 Music", pts: 100 },
  { q: "Which artist created the 'Lemonade' visual album?", a: 1, choices: ["Rihanna","Beyoncé","Cardi B","Lizzo"], cat: "🎵 Music", pts: 100 },
  { q: "What city is considered the birthplace of hip-hop?", a: 2, choices: ["Los Angeles","Atlanta","New York City","Chicago"], cat: "🎵 Music", pts: 100 },
  { q: "Which R&B legend is known as the 'Queen of Soul'?", a: 2, choices: ["Whitney Houston","Patti LaBelle","Aretha Franklin","Mary J. Blige"], cat: "🎵 Music", pts: 100 },
  { q: "What year did Michael Jackson release 'Thriller'?", a: 2, choices: ["1979","1980","1982","1985"], cat: "🎵 Music", pts: 100 },
  { q: "Drake is originally from which city?", a: 3, choices: ["Atlanta","Houston","Detroit","Toronto"], cat: "🎵 Music", pts: 100 },
  { q: "Which duo released the smash hit 'Hey Ya!'?", a: 2, choices: ["UGK","Goodie Mob","OutKast","Ludacris"], cat: "🎵 Music", pts: 100 },
  { q: "Lauryn Hill's solo debut album was called?", a: 1, choices: ["Ready to Die","The Miseducation of Lauryn Hill","Illmatic","Hard Core"], cat: "🎵 Music", pts: 100 },
  { q: "Who is known as the 'Godfather of Soul'?", a: 1, choices: ["Marvin Gaye","James Brown","Al Green","Curtis Mayfield"], cat: "🎵 Music", pts: 100 },
  { q: "Which artist's alter ego is 'Sasha Fierce'?", a: 0, choices: ["Beyoncé","Rihanna","Nicki Minaj","Cardi B"], cat: "🎵 Music", pts: 100 },
  { q: "Kendrick Lamar's 'To Pimp a Butterfly' won which Grammy?", a: 1, choices: ["Album of the Year","Best Rap Album","Best R&B Album","Best Urban Contemporary"], cat: "🎵 Music", pts: 200 },
  { q: "Who played Olivia Pope on 'Scandal'?", a: 1, choices: ["Viola Davis","Kerry Washington","Taraji P. Henson","Regina King"], cat: "📺 TV & Film", pts: 100 },
  { q: "Will Smith's Fresh Prince character is originally from?", a: 2, choices: ["Compton","Chicago","Philadelphia","Atlanta"], cat: "📺 TV & Film", pts: 100 },
  { q: "Which film features the battle cry 'Wakanda Forever'?", a: 1, choices: ["Coming to America","Black Panther","Get Out","Us"], cat: "📺 TV & Film", pts: 100 },
  { q: "Who directed the horror film 'Get Out'?", a: 2, choices: ["Spike Lee","Ryan Coogler","Jordan Peele","F. Gary Gray"], cat: "📺 TV & Film", pts: 100 },
  { q: "Martin Lawrence's character on 'Martin' works as a?", a: 1, choices: ["Police Officer","Radio DJ","Lawyer","Teacher"], cat: "📺 TV & Film", pts: 200 },
  { q: "Which actress plays Cookie Lyon on 'Empire'?", a: 1, choices: ["Naomie Harris","Taraji P. Henson","Gabrielle Union","Nia Long"], cat: "📺 TV & Film", pts: 100 },
  { q: "Who starred as Ray Charles in the 2004 biopic 'Ray'?", a: 1, choices: ["Denzel Washington","Jamie Foxx","Will Smith","Forest Whitaker"], cat: "📺 TV & Film", pts: 100 },
  { q: "'A Different World' featured which iconic couple?", a: 0, choices: ["Whitley & Dwayne","Moesha & Q","Hilary & Will","Lisa & Zack"], cat: "📺 TV & Film", pts: 100 },
  { q: "Issa Rae created and stars in which HBO series?", a: 2, choices: ["Euphoria","Lovecraft Country","Insecure","P-Valley"], cat: "📺 TV & Film", pts: 100 },
  { q: "Who played T'Challa in the 2018 Black Panther film?", a: 0, choices: ["Chadwick Boseman","Michael B. Jordan","Idris Elba","Chiwetel Ejiofor"], cat: "📺 TV & Film", pts: 100 },
  { q: "LeBron James was drafted #1 overall by which team?", a: 2, choices: ["Miami Heat","Los Angeles Lakers","Cleveland Cavaliers","Detroit Pistons"], cat: "🏆 Sports", pts: 100 },
  { q: "Serena Williams won how many Grand Slam singles titles?", a: 2, choices: ["18","20","23","25"], cat: "🏆 Sports", pts: 200 },
  { q: "Muhammad Ali's birth name was?", a: 1, choices: ["Malcolm Little","Cassius Clay","Everett Jones","James Cleveland"], cat: "🏆 Sports", pts: 100 },
  { q: "Simone Biles competes in which Olympic sport?", a: 2, choices: ["Track & Field","Swimming","Gymnastics","Diving"], cat: "🏆 Sports", pts: 100 },
  { q: "Michael Jordan won all 6 championships with which team?", a: 1, choices: ["Detroit Pistons","Chicago Bulls","Washington Wizards","Charlotte Hornets"], cat: "🏆 Sports", pts: 100 },
  { q: "Which track legend was nicknamed 'FloJo'?", a: 0, choices: ["Florence Griffith Joyner","Jackie Joyner-Kersee","Gail Devers","Evelyn Ashford"], cat: "🏆 Sports", pts: 200 },
  { q: "Who was the first Black QB to win a Super Bowl MVP?", a: 0, choices: ["Doug Williams","Donovan McNabb","Colin Kaepernick","Cam Newton"], cat: "🏆 Sports", pts: 200 },
  { q: "Soul Train was hosted for most of its run by?", a: 2, choices: ["Ed Sullivan","Dick Clark","Don Cornelius","Arsenio Hall"], cat: "✊ Culture", pts: 200 },
  { q: "What TV network stands for 'Black Entertainment Television'?", a: 0, choices: ["BET","OWN","TV One","Bounce"], cat: "✊ Culture", pts: 100 },
  { q: "Juneteenth commemorates what event?", a: 1, choices: ["March on Washington","Emancipation of enslaved people in Texas","Civil Rights Act signing","MLK's birthday"], cat: "✊ Culture", pts: 200 },
  { q: "Oprah Winfrey's talk show ran for how many seasons?", a: 2, choices: ["15","20","25","30"], cat: "✊ Culture", pts: 200 },
  { q: "Which city is home to the historic 'Black Wall Street'?", a: 1, choices: ["Atlanta","Tulsa","Durham","Memphis"], cat: "✊ Culture", pts: 200 },
  { q: "Which designer created the 'Yeezy' fashion line?", a: 1, choices: ["Jay-Z","Kanye West","Pharrell Williams","Diddy"], cat: "👗 Fashion", pts: 100 },
  { q: "Virgil Abloh was creative director of which brand?", a: 2, choices: ["Gucci","Prada","Louis Vuitton","Balenciaga"], cat: "👗 Fashion", pts: 200 },
  { q: "What hairstyle became iconic during the Black Power movement?", a: 2, choices: ["Jheri curl","Box braids","The Afro","Cornrows"], cat: "👗 Fashion", pts: 100 },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function genCode() {
  return Array.from({length: 5}, () =>
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]
  ).join("");
}

module.exports = { QUESTIONS, shuffle, genCode };
