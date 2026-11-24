(function () {
  'use strict';

  const tiers = ['plankton', 'tooclever', 'schooler', 'schooler', 'rare', 'rare', 'deepcut', 'shrimpion'];
  const tierNotes = {
    plankton: 'A classic answer most players know.',
    tooclever: 'A familiar pick, not a deep cut.',
    schooler: 'A solid, widely known answer.',
    rare: 'A less common but recognizable choice.',
    deepcut: 'A thoughtful answer beyond the first guesses.',
    shrimpion: 'An interesting answer many players may overlook.'
  };

  function prompt(id, question, category, answers) {
    return {
      id,
      question,
      category,
      answers: answers.map((answer, index) => {
        const [name, aliases] = Array.isArray(answer) ? answer : [answer, []];
        return [name, tiers[index], tierNotes[tiers[index]], aliases];
      })
    };
  }

  const tracks = [
    [
      prompt('geo_europe_country', 'Name a country in Europe.', 'country', ['France', 'Italy', 'Spain', 'Germany', 'United Kingdom', 'Greece', 'Portugal', 'Sweden']),
      prompt('geo_asia_country', 'Name a country in Asia.', 'country', ['Japan', 'China', 'India', 'South Korea', 'Thailand', 'Vietnam', 'Indonesia', 'Nepal']),
      prompt('geo_africa_country', 'Name a country in Africa.', 'country', ['Egypt', 'South Africa', 'Kenya', 'Morocco', 'Nigeria', 'Tanzania', 'Ghana', 'Ethiopia']),
      prompt('geo_north_america_country', 'Name a country in North America, including Central America and the Caribbean.', 'country', [['United States', ['US', 'USA', 'United States of America']], 'Canada', 'Mexico', 'Cuba', 'Jamaica', 'Costa Rica', 'Panama', 'Guatemala']),
      prompt('geo_south_america_country', 'Name a country in South America.', 'country', ['Brazil', 'Argentina', 'Chile', 'Peru', 'Colombia', 'Ecuador', 'Uruguay', 'Bolivia']),
      prompt('geo_world_capital', 'Name a national capital city.', 'capital city', ['London', 'Paris', 'Tokyo', 'Rome', 'Madrid', 'Cairo', 'Ottawa', 'Seoul']),
      prompt('geo_ocean', 'Name one of Earth’s oceans.', 'ocean', ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Southern Ocean']),
      prompt('geo_famous_river', 'Name a famous river.', 'river', ['Nile', 'Amazon River', 'Mississippi River', 'Thames', 'Danube', 'Yangtze River', 'Ganges', 'Colorado River']),
      prompt('geo_famous_mountain', 'Name a famous mountain.', 'mountain', ['Mount Everest', 'Mount Fuji', 'Kilimanjaro', 'Denali', 'Mount Rainier', 'Matterhorn', 'Mount Etna', 'Mont Blanc']),
      prompt('geo_desert', 'Name a well-known desert.', 'desert', ['Sahara Desert', 'Gobi Desert', 'Mojave Desert', 'Kalahari Desert', 'Atacama Desert', 'Arabian Desert', 'Namib Desert', 'Sonoran Desert']),
      prompt('geo_waterfall', 'Name a famous waterfall.', 'waterfall', ['Niagara Falls', 'Victoria Falls', 'Iguazu Falls', 'Angel Falls', 'Yosemite Falls']),
      prompt('geo_landmark', 'Name a famous landmark.', 'landmark', ['Eiffel Tower', 'Great Wall of China', 'Statue of Liberty', 'Taj Mahal', 'Colosseum', 'Machu Picchu', 'Sydney Opera House', 'Christ the Redeemer'])
    ],
    [
      prompt('nature_mammal', 'Name a mammal.', 'mammal', ['Dog', 'Cat', 'Horse', 'Elephant', 'Dolphin', 'Kangaroo', 'Giraffe', 'Bat']),
      prompt('nature_bird', 'Name a bird.', 'bird', ['Robin', 'Eagle', 'Penguin', 'Owl', 'Parrot', 'Flamingo', 'Swan', 'Woodpecker']),
      prompt('nature_ocean_animal', 'Name an animal that lives in the ocean.', 'ocean animal', ['Dolphin', 'Shark', 'Whale', 'Octopus', 'Sea turtle', 'Seal', 'Clownfish', 'Sea otter']),
      prompt('nature_farm_animal', 'Name an animal commonly raised on a farm.', 'farm animal', ['Cow', 'Chicken', 'Pig', 'Sheep', 'Goat', 'Horse', 'Duck', 'Turkey']),
      prompt('nature_reptile', 'Name a reptile.', 'reptile', ['Snake', 'Turtle', 'Crocodile', 'Lizard', 'Alligator', 'Iguana', 'Gecko', 'Chameleon']),
      prompt('nature_insect', 'Name an insect.', 'insect', ['Ant', 'Bee', 'Butterfly', 'Ladybug', 'Mosquito', 'Dragonfly', 'Grasshopper', 'Firefly']),
      prompt('nature_pet', 'Name a common household pet.', 'pet', ['Dog', 'Cat', 'Fish', 'Hamster', 'Rabbit', 'Parakeet', 'Guinea pig', 'Turtle']),
      prompt('nature_striped_animal', 'Name an animal known for its stripes.', 'striped animal', ['Zebra', 'Tiger', 'Skunk', 'Chipmunk', 'Okapi', 'Clownfish', 'Bumblebee', 'Raccoon']),
      prompt('nature_polar_animal', 'Name an animal that lives in the Arctic.', 'Arctic animal', ['Polar bear', 'Arctic fox', 'Walrus', 'Seal', 'Reindeer', 'Snowy owl', 'Arctic hare', 'Narwhal']),
      prompt('nature_tree', 'Name a kind of tree.', 'tree', ['Oak', 'Pine', 'Maple', 'Birch', 'Palm', 'Willow', 'Cedar', 'Redwood']),
      prompt('nature_flower', 'Name a kind of flower.', 'flower', ['Rose', 'Tulip', 'Daisy', 'Sunflower', 'Lily', 'Orchid', 'Daffodil', 'Poppy']),
      prompt('nature_forest_animal', 'Name an animal that lives in a forest.', 'forest animal', ['Deer', 'Fox', 'Bear', 'Owl', 'Squirrel', 'Wolf', 'Raccoon', 'Moose'])
    ],
    [
      prompt('culture_superhero', 'Name a well-known superhero.', 'superhero', ['Batman', 'Spider-Man', 'Superman', 'Wonder Woman', 'Iron Man', 'Hulk', 'Captain America', 'Black Panther']),
      prompt('culture_animated_movie', 'Name a popular animated movie.', 'animated movie', ['Toy Story', 'Frozen', 'Finding Nemo', 'The Lion King', 'Shrek', 'Moana', 'Coco', 'Up']),
      prompt('culture_movie_series', 'Name a well-known movie series.', 'movie series', ['Star Wars', 'Harry Potter', 'Jurassic Park', 'Toy Story', 'The Lord of the Rings', 'James Bond', 'Fast & Furious', 'The Hunger Games']),
      prompt('culture_music_genre', 'Name a style of music.', 'music genre', ['Pop', 'Rock', 'Hip-hop', 'Country', 'Jazz', 'Classical', 'Reggae', 'Blues']),
      prompt('culture_instrument', 'Name a musical instrument.', 'instrument', ['Piano', 'Guitar', 'Drums', 'Violin', 'Flute', 'Saxophone', 'Trumpet', 'Cello']),
      prompt('culture_board_game', 'Name a popular board game.', 'board game', ['Chess', 'Monopoly', 'Scrabble', 'Checkers', 'Clue', 'Candy Land', 'The Game of Life', 'Catan']),
      prompt('culture_video_game', 'Name a popular video game.', 'video game', ['Minecraft', ['Super Mario Bros.', ['Mario']], 'Pokémon', 'Tetris', 'Sonic the Hedgehog', ['The Legend of Zelda', ['Zelda']], 'Fortnite', 'Roblox']),
      prompt('culture_cartoon', 'Name a familiar cartoon character.', 'cartoon character', ['Mickey Mouse', 'SpongeBob SquarePants', 'Scooby-Doo', 'Bugs Bunny', 'Bart Simpson', 'Tom and Jerry', 'Bluey', 'Pikachu']),
      prompt('culture_fairy_tale', 'Name a character from a well-known fairy tale.', 'fairy-tale character', ['Cinderella', 'Snow White', 'Little Red Riding Hood', 'Pinocchio', 'The Three Little Pigs', 'Hansel and Gretel', 'Rapunzel', 'The Gingerbread Man']),
      prompt('culture_wizard', 'Name a famous fictional wizard.', 'fictional wizard', ['Harry Potter', 'Merlin', 'Gandalf', 'Dumbledore', 'The Wizard of Oz', 'Doctor Strange', 'Sabrina Spellman', 'Saruman']),
      prompt('culture_film_genre', 'Name a movie genre.', 'film genre', ['Comedy', 'Action', 'Horror', 'Romance', 'Science fiction', 'Adventure', 'Drama', 'Mystery']),
      prompt('culture_storybook', 'Name a book many students read in school.', 'book', ['Charlotte’s Web', 'The Hobbit', 'The Outsiders', 'The Giver', 'Holes', 'Animal Farm', 'The Great Gatsby', 'To Kill a Mockingbird'])
    ],
    [
      prompt('science_planet', 'Name a planet in our solar system.', 'planet', ['Earth', 'Mars', 'Jupiter', 'Venus', 'Saturn', 'Neptune', 'Mercury', 'Uranus']),
      prompt('science_state_of_matter', 'Name a state of matter.', 'state of matter', ['Solid', 'Liquid', 'Gas', 'Plasma']),
      prompt('science_body_organ', 'Name an organ in the human body.', 'body organ', ['Heart', 'Brain', 'Lungs', 'Stomach', 'Liver', 'Kidney', 'Skin', 'Pancreas']),
      prompt('science_gas', 'Name a gas found in Earth’s atmosphere.', 'gas', ['Nitrogen', 'Oxygen', 'Carbon dioxide', 'Argon', 'Water vapor', 'Helium', 'Neon', 'Ozone']),
      prompt('science_weather', 'Name a kind of weather.', 'weather', ['Rain', 'Snow', 'Thunderstorm', 'Fog', 'Hail', 'Sleet', 'Tornado', 'Hurricane']),
      prompt('science_energy', 'Name a renewable energy source.', 'energy source', ['Solar power', 'Wind power', 'Hydropower', 'Geothermal energy', 'Tidal power', 'Wave power', 'Biomass energy', 'Solar thermal energy']),
      prompt('science_simple_machine', 'Name a simple machine.', 'simple machine', ['Lever', 'Pulley', 'Wheel and axle', 'Inclined plane', 'Wedge', 'Screw']),
      prompt('science_rock', 'Name a common type of rock.', 'rock', ['Granite', 'Marble', 'Limestone', 'Sandstone', 'Slate', 'Basalt', 'Obsidian', 'Chalk']),
      prompt('science_cloud', 'Name a type of cloud.', 'cloud', ['Cumulus', 'Cirrus', 'Stratus', 'Cumulonimbus', 'Altostratus', 'Nimbostratus', 'Altocumulus', 'Cirrostratus']),
      prompt('science_sense', 'Name one of the five traditional human senses.', 'sense', ['Sight', 'Hearing', 'Smell', 'Taste', 'Touch']),
      prompt('science_instrument', 'Name a tool used in a science class or lab.', 'science tool', ['Microscope', 'Thermometer', 'Magnifying glass', 'Telescope', 'Beaker', 'Scale', 'Stopwatch', 'Compass']),
      prompt('science_moon', 'Name a moon in our solar system.', 'moon', [['Earth’s Moon', ['Moon']], 'Europa', 'Titan', 'Ganymede', 'Phobos', 'Io', 'Triton', 'Enceladus'])
    ],
    [
      prompt('food_fruit', 'Name a fruit.', 'fruit', ['Apple', 'Banana', 'Orange', 'Strawberry', 'Grapes', 'Watermelon', 'Mango', 'Pineapple']),
      prompt('food_vegetable', 'Name a vegetable commonly used in savory cooking.', 'vegetable', ['Carrot', 'Potato', 'Broccoli', 'Bell pepper', 'Corn', 'Cucumber', 'Spinach', 'Lettuce']),
      prompt('food_breakfast', 'Name a common breakfast food.', 'breakfast food', ['Cereal', 'Toast', 'Eggs', 'Pancakes', 'Oatmeal', 'Yogurt', 'Waffles', 'Bagel']),
      prompt('food_dessert', 'Name a popular dessert.', 'dessert', ['Ice cream', 'Chocolate cake', 'Cookies', 'Apple pie', 'Brownies', 'Cheesecake', 'Doughnut', 'Pudding']),
      prompt('food_drink', 'Name a drink people often have with a meal.', 'drink', ['Water', 'Milk', 'Tea', 'Coffee', 'Orange juice', 'Lemonade', 'Soda', 'Hot chocolate']),
      prompt('food_pizza_topping', 'Name a common pizza topping.', 'pizza topping', ['Pepperoni', 'Mushrooms', 'Cheese', 'Olives', 'Sausage', 'Onions', 'Bell peppers', 'Bacon']),
      prompt('food_pasta', 'Name a kind of pasta.', 'pasta', ['Spaghetti', 'Macaroni', 'Penne', 'Fettuccine', 'Ravioli', 'Lasagna', 'Fusilli', 'Linguine']),
      prompt('food_bread', 'Name a kind of bread.', 'bread', ['White bread', 'Sourdough', 'Baguette', 'Rye bread', 'Pita', 'Naan', 'Cornbread', 'Brioche']),
      prompt('food_cuisine', 'Name a style of food from a country or region.', 'cuisine', ['Italian', 'Mexican', 'Chinese', 'Japanese', 'Indian', 'Thai', 'Greek', 'French']),
      prompt('food_herb_spice', 'Name a familiar herb or spice.', 'herb or spice', ['Pepper', 'Cinnamon', 'Basil', 'Garlic', 'Ginger', 'Oregano', 'Paprika', 'Cumin']),
      prompt('food_snack', 'Name a popular snack.', 'snack', ['Popcorn', 'Potato chips', 'Pretzels', 'Crackers', 'Trail mix', 'Nachos', 'Granola bar', 'Rice cakes']),
      prompt('food_cheese', 'Name a kind of cheese.', 'cheese', ['Cheddar', 'Mozzarella', 'Swiss cheese', 'Parmesan', 'Brie', 'Gouda', 'Feta', 'Blue cheese'])
    ],
    [
      prompt('history_civilization', 'Name an ancient civilization studied in school.', 'ancient civilization', ['Ancient Egypt', 'Ancient Greece', 'Roman Empire', 'Maya', 'Inca', 'Aztec', 'Ancient China', 'Persian Empire']),
      prompt('history_historical_figure', 'Name a well-known historical leader.', 'historical figure', ['Abraham Lincoln', 'George Washington', 'Cleopatra', 'Julius Caesar', 'Queen Elizabeth I', 'Nelson Mandela', 'Napoleon Bonaparte', 'Winston Churchill']),
      prompt('history_inventor', 'Name a famous inventor.', 'inventor', ['Thomas Edison', 'Alexander Graham Bell', 'The Wright brothers', 'Benjamin Franklin', 'Johannes Gutenberg', 'Nikola Tesla', 'James Watt', 'Marie Curie']),
      prompt('history_historical_era', 'Name a period in history.', 'historical era', ['Middle Ages', 'Renaissance', 'Ancient Rome', 'Ancient Greece', 'Industrial Revolution', 'Victorian era', 'Age of Exploration', 'Stone Age']),
      prompt('history_document', 'Name a famous historical document.', 'historical document', ['Declaration of Independence', 'Magna Carta', 'United States Constitution', 'Bill of Rights', 'Emancipation Proclamation', 'Gettysburg Address', 'Mayflower Compact', 'Universal Declaration of Human Rights']),
      prompt('history_explorer', 'Name a famous explorer.', 'explorer', ['Marco Polo', 'Christopher Columbus', 'Ferdinand Magellan', 'Amelia Earhart', 'Neil Armstrong', 'Sacagawea', 'Roald Amundsen', 'Jacques Cousteau']),
      prompt('history_ship', 'Name a famous ship from history.', 'ship', ['Titanic', 'Mayflower', 'Santa Maria', 'HMS Beagle', 'USS Constitution', 'Endeavour', 'Bismarck', 'HMS Victory']),
      prompt('history_civil_rights', 'Name a well-known civil rights leader.', 'civil rights leader', ['Martin Luther King Jr.', 'Rosa Parks', 'Nelson Mandela', 'Harriet Tubman', 'Mahatma Gandhi', 'Frederick Douglass', 'Cesar Chavez', 'Susan B. Anthony']),
      prompt('history_ancient_wonder', 'Name one of the Seven Wonders of the Ancient World.', 'ancient wonder', ['Great Pyramid of Giza', 'Hanging Gardens of Babylon', 'Statue of Zeus at Olympia', 'Temple of Artemis', 'Mausoleum at Halicarnassus', 'Colossus of Rhodes', 'Lighthouse of Alexandria']),
      prompt('history_ancient_god', 'Name a god or goddess from Greek mythology.', 'Greek mythology', ['Zeus', 'Athena', 'Poseidon', 'Aphrodite', 'Apollo', 'Artemis', 'Hera', 'Hermes']),
      prompt('history_american_president', 'Name a president of the United States.', 'US president', ['Abraham Lincoln', 'George Washington', 'Barack Obama', 'John F. Kennedy', 'Theodore Roosevelt', 'Franklin D. Roosevelt', 'Thomas Jefferson', 'Ronald Reagan']),
      prompt('history_famous_painter', 'Name a famous painter.', 'painter', ['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Claude Monet', 'Michelangelo', 'Frida Kahlo', 'Georgia O’Keeffe', 'Salvador Dalí'])
    ],
    [
      prompt('sports_team_sport', 'Name a sport played by teams.', 'team sport', ['Soccer', 'Basketball', 'Baseball', 'Volleyball', 'Hockey', 'Rugby', 'Cricket', 'Water polo']),
      prompt('sports_olympic', 'Name a sport played at the Summer Olympics.', 'Olympic sport', ['Swimming', 'Track and field', 'Gymnastics', 'Tennis', 'Basketball', 'Cycling', 'Fencing', 'Rowing']),
      prompt('sports_racket', 'Name a sport played with a racket.', 'racket sport', ['Tennis', 'Badminton', 'Squash', 'Table tennis', 'Padel', 'Pickleball']),
      prompt('sports_winter', 'Name a winter sport.', 'winter sport', ['Skiing', 'Figure skating', 'Ice hockey', 'Snowboarding', 'Curling', 'Bobsleigh', 'Luge', 'Biathlon']),
      prompt('sports_athlete', 'Name a famous athlete.', 'athlete', ['Serena Williams', 'Michael Jordan', 'Lionel Messi', 'Simone Biles', 'Usain Bolt', 'LeBron James', 'Megan Rapinoe', 'Wayne Gretzky']),
      prompt('sports_soccer_club', 'Name a well-known soccer club.', 'soccer club', ['Real Madrid', 'Barcelona', 'Manchester United', 'Liverpool', 'Bayern Munich', 'Arsenal', 'Paris Saint-Germain', 'Juventus']),
      prompt('sports_racing', 'Name a type of racing sport.', 'racing sport', ['Formula One', 'Horse racing', 'NASCAR', 'Cycling', 'Motorcycle racing', 'Ski racing', 'Drag racing', 'Sailboat racing']),
      prompt('sports_water', 'Name a sport played in or on water.', 'water sport', ['Swimming', 'Surfing', 'Water polo', 'Rowing', 'Sailing', 'Diving', 'Canoeing', 'Water skiing']),
      prompt('sports_ball', 'Name a sport that uses a ball.', 'ball sport', ['Soccer', 'Basketball', 'Baseball', 'Tennis', 'Golf', 'Volleyball', 'Rugby', 'Cricket']),
      prompt('sports_playground_game', 'Name a game children play at a playground.', 'playground game', ['Tag', 'Hide-and-seek', 'Hopscotch', 'Red light, green light', 'Four square', 'Dodgeball', 'Simon Says', 'Capture the flag']),
      prompt('sports_card_game', 'Name a familiar card game.', 'card game', ['Poker', 'Go Fish', 'Rummy', 'Hearts', 'Bridge', 'Uno', 'Crazy Eights', 'Blackjack']),
      prompt('sports_equipment', 'Name a piece of sports equipment.', 'sports equipment', ['Ball', 'Racket', 'Helmet', 'Bat', 'Skateboard', 'Skis', 'Glove', 'Hockey stick'])
    ]
  ];

  tracks[0].push(
    prompt('geo_us_state', 'Name a state in the United States.', 'US state', ['California', 'Texas', 'Florida', 'New York', 'Alaska', 'Hawaii', 'Colorado', 'Illinois']),
    prompt('geo_continent', 'Name one of the seven continents.', 'continent', ['Asia', 'Africa', 'Europe', 'North America', 'South America', 'Australia', 'Antarctica']),
    prompt('geo_famous_city', 'Name a famous city in the United States.', 'city', ['New York City', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco', 'Seattle', 'New Orleans', 'Boston']),
    prompt('geo_national_park', 'Name a famous national park.', 'national park', ['Yellowstone', 'Yosemite', 'Grand Canyon', 'Zion', 'Banff', 'Kruger National Park', 'Serengeti National Park', 'Grand Teton National Park']),
    prompt('geo_famous_bridge', 'Name a famous bridge.', 'bridge', ['Golden Gate Bridge', 'Brooklyn Bridge', 'Tower Bridge', 'Sydney Harbour Bridge', 'London Bridge', 'Rialto Bridge', 'Charles Bridge']),
    prompt('geo_sea', 'Name a well-known sea.', 'sea', ['Mediterranean Sea', 'Caribbean Sea', 'Red Sea', 'Black Sea', 'North Sea', 'Baltic Sea', 'Arabian Sea', 'Coral Sea']),
    prompt('geo_island', 'Name a well-known island.', 'island', ['Greenland', 'Madagascar', 'Iceland', 'Cuba', 'Bali', 'Sicily', 'New Guinea', 'Borneo']),
    prompt('geo_famous_lake', 'Name a famous lake.', 'lake', ['Lake Superior', 'Lake Victoria', 'Lake Baikal', 'Lake Tahoe', 'Lake Michigan', 'Lake Como', 'Lake Titicaca', 'Lake Geneva'])
  );
  tracks[0].push(
    prompt('geo_african_capital', 'Name a capital city in Africa.', 'capital city', ['Cairo', 'Nairobi', 'Cape Town', 'Rabat', 'Accra', 'Addis Ababa', 'Dakar', 'Tunis']),
    prompt('geo_asian_capital', 'Name a capital city in Asia.', 'capital city', ['Tokyo', 'Beijing', 'Seoul', 'Bangkok', 'New Delhi', 'Jakarta', 'Manila', 'Hanoi']),
    prompt('geo_european_capital', 'Name a capital city in Europe.', 'capital city', ['London', 'Paris', 'Rome', 'Madrid', 'Berlin', 'Lisbon', 'Vienna', 'Prague']),
    prompt('geo_south_american_city', 'Name a large city in South America.', 'city', ['Rio de Janeiro', 'Buenos Aires', 'Lima', 'Santiago', 'Bogotá', 'São Paulo', 'Quito', 'Caracas']),
    prompt('geo_oceania_country', 'Name a country in Oceania.', 'country', ['Australia', 'New Zealand', 'Fiji', 'Papua New Guinea', 'Samoa', 'Tonga']),
    prompt('geo_caribbean_island', 'Name an island in the Caribbean.', 'island', ['Cuba', 'Jamaica', 'Hispaniola', 'Puerto Rico', 'Barbados', 'Trinidad', 'Aruba', 'Saint Lucia']),
    prompt('geo_canal', 'Name a famous canal.', 'canal', ['Panama Canal', 'Suez Canal', 'Erie Canal', 'Grand Canal of China']),
    prompt('geo_mountain_range', 'Name a famous mountain range.', 'mountain range', ['Rocky Mountains', 'Himalayas', 'Alps', 'Andes', 'Appalachian Mountains', 'Atlas Mountains', 'Pyrenees', 'Ural Mountains']),
    prompt('geo_asian_city', 'Name a large city in Asia.', 'city', ['Tokyo', 'Beijing', 'Seoul', 'Singapore', 'Bangkok', 'Mumbai', 'Hong Kong', 'Shanghai']),
    prompt('geo_bay', 'Name a famous bay or gulf.', 'bay or gulf', ['Gulf of Mexico', 'San Francisco Bay', 'Chesapeake Bay', 'Bay of Bengal', 'Hudson Bay', 'Persian Gulf', 'Gulf of California', 'Bay of Biscay']),
    prompt('geo_mediterranean_country', 'Name a country with a coast on the Mediterranean Sea.', 'country', ['Italy', 'Spain', 'Greece', 'France', 'Turkey', 'Egypt', 'Morocco', 'Croatia']),
    prompt('geo_city_africa', 'Name a well-known city in Africa.', 'city', ['Cairo', 'Nairobi', 'Cape Town', 'Marrakesh', 'Lagos', 'Johannesburg', 'Dakar', 'Casablanca'])
  );
  tracks[1].push(
    prompt('nature_big_cat', 'Name a wild cat species.', 'wild cat', ['Lion', 'Tiger', 'Leopard', 'Cheetah', 'Jaguar', 'Cougar', 'Lynx', 'Snow leopard']),
    prompt('nature_primate', 'Name a kind of primate.', 'primate', ['Chimpanzee', 'Gorilla', 'Orangutan', 'Baboon', 'Lemur', 'Macaque', 'Gibbon', 'Capuchin monkey']),
    prompt('nature_fish', 'Name a kind of fish.', 'fish', ['Goldfish', 'Salmon', 'Tuna', 'Trout', 'Clownfish', 'Cod', 'Catfish', 'Pufferfish']),
    prompt('nature_zoo_animal', 'Name an animal commonly seen at a zoo.', 'zoo animal', ['Elephant', 'Lion', 'Tiger', 'Giraffe', 'Zebra', 'Penguin', 'Hippopotamus', 'Panda']),
    prompt('nature_backyard_bird', 'Name a bird often seen in a backyard.', 'bird', ['Robin', 'Sparrow', 'Cardinal', 'Blue jay', 'Crow', 'Finch', 'Hummingbird', 'Chickadee']),
    prompt('nature_antlered_animal', 'Name an animal known for having antlers or horns.', 'animal', ['Deer', 'Moose', 'Elk', 'Reindeer', 'Goat', 'Bison', 'Sheep', 'Antelope']),
    prompt('nature_amphibian', 'Name an amphibian.', 'amphibian', ['Frog', 'Toad', 'Salamander', 'Newt', 'Tree frog', 'Bullfrog', 'Axolotl']),
    prompt('nature_rainforest_animal', 'Name an animal that lives in a tropical rainforest.', 'rainforest animal', ['Jaguar', 'Toucan', 'Sloth', 'Monkey', 'Macaw', 'Anaconda', 'Tapir', 'Poison dart frog'])
  );
  tracks[1].push(
    prompt('nature_pouched_mammal', 'Name a mammal that carries its young in a pouch.', 'marsupial', ['Kangaroo', 'Koala', 'Wombat', 'Wallaby', 'Opossum', 'Tasmanian devil']),
    prompt('nature_flightless_bird', 'Name a bird that cannot fly.', 'bird', ['Penguin', 'Ostrich', 'Emu', 'Kiwi', 'Cassowary', 'Rhea']),
    prompt('nature_shell_animal', 'Name an animal with a hard shell.', 'animal', ['Turtle', 'Tortoise', 'Snail', 'Crab', 'Clam', 'Oyster', 'Lobster', 'Mussel']),
    prompt('nature_african_animal', 'Name a wild animal found in Africa.', 'wild animal', ['Lion', 'Elephant', 'Giraffe', 'Zebra', 'Hippopotamus', 'Cheetah', 'Rhinoceros', 'Gorilla']),
    prompt('nature_hibernating_animal', 'Name an animal that hibernates in winter.', 'animal', ['Bear', 'Bat', 'Hedgehog', 'Groundhog', 'Chipmunk']),
    prompt('nature_dog_breed', 'Name a familiar dog breed.', 'dog breed', ['Labrador Retriever', 'German Shepherd', 'Golden Retriever', 'Bulldog', 'Poodle', 'Beagle', 'Siberian Husky', 'Dachshund']),
    prompt('nature_flying_insect', 'Name an insect that can fly.', 'insect', ['Butterfly', 'Bee', 'Mosquito', 'Dragonfly', 'Moth', 'Ladybug', 'Housefly', 'Firefly']),
    prompt('nature_snake', 'Name a well-known kind of snake.', 'snake', ['Python', 'Cobra', 'Rattlesnake', 'Boa constrictor', 'Anaconda', 'King cobra', 'Garter snake', 'Viper']),
    prompt('nature_savanna_animal', 'Name an animal that lives on the African savanna.', 'savanna animal', ['Lion', 'Giraffe', 'Zebra', 'Elephant', 'Cheetah', 'Wildebeest', 'Hyena', 'Ostrich']),
    prompt('nature_pollinator', 'Name an animal that helps pollinate flowers.', 'pollinator', ['Bee', 'Butterfly', 'Hummingbird', 'Moth', 'Bat', 'Bumblebee', 'Wasp', 'Beetle']),
    prompt('nature_color_changing_animal', 'Name an animal that can change its color.', 'animal', ['Chameleon', 'Octopus', 'Cuttlefish', 'Squid', 'Flounder', 'Tree frog']),
    prompt('nature_bear', 'Name a kind of bear.', 'bear', ['Polar bear', 'Grizzly bear', 'Black bear', 'Panda', 'Brown bear', 'Sun bear'])
  );
  tracks[2].push(
    prompt('culture_singer', 'Name a well-known singer.', 'singer', ['Taylor Swift', 'Beyoncé', 'Elvis Presley', 'Adele', 'Michael Jackson', 'Rihanna', 'Elton John', 'Dolly Parton']),
    prompt('culture_tv_comedy', 'Name a popular television comedy.', 'TV comedy', ['Friends', 'The Office', 'Seinfeld', 'The Simpsons', 'SpongeBob SquarePants', 'Modern Family', 'I Love Lucy', 'Brooklyn Nine-Nine']),
    prompt('culture_author', 'Name a well-known author.', 'author', ['William Shakespeare', 'J. K. Rowling', 'Dr. Seuss', 'J. R. R. Tolkien', 'Mark Twain', 'Jane Austen', 'Agatha Christie', 'Roald Dahl']),
    prompt('culture_dance', 'Name a style of dance.', 'dance', ['Ballet', 'Hip-hop', 'Salsa', 'Tap', 'Tango', 'Jazz', 'Breakdance', 'Waltz']),
    prompt('culture_toy', 'Name a well-known toy or toy brand.', 'toy', ['LEGO', 'Barbie', 'Hot Wheels', 'Teddy bear', 'Rubik’s Cube', 'Play-Doh', 'Etch A Sketch', 'Slinky']),
    prompt('culture_story_character', 'Name a familiar character from a children’s story.', 'story character', ['Winnie-the-Pooh', 'Paddington Bear', 'Peter Pan', 'Alice in Wonderland', 'The Cat in the Hat', 'Pippi Longstocking', 'Matilda', 'The Very Hungry Caterpillar']),
    prompt('culture_robot', 'Name a famous fictional robot.', 'fictional robot', ['R2-D2', 'C-3PO', 'WALL-E', 'Optimus Prime', 'The Terminator', 'Baymax', 'The Iron Giant', 'Bender']),
    prompt('culture_musical', 'Name a well-known stage musical.', 'musical', ['The Lion King', 'Wicked', 'Hamilton', 'The Sound of Music', 'Grease', 'Les Misérables', 'Annie', 'Cats'])
  );
  tracks[2].push(
    prompt('culture_band', 'Name a well-known music group or band.', 'music group', ['The Beatles', 'Queen', 'ABBA', 'The Rolling Stones', 'BTS', 'Coldplay', 'U2', 'Blackpink']),
    prompt('culture_detective', 'Name a famous fictional detective.', 'detective', ['Sherlock Holmes', 'Scooby-Doo', 'Nancy Drew', 'Hercule Poirot', 'Batman', 'Inspector Gadget', 'Encyclopedia Brown', 'Miss Marple']),
    prompt('culture_book_series', 'Name a popular book series.', 'book series', ['Harry Potter', 'The Hunger Games', 'The Lord of the Rings', 'Diary of a Wimpy Kid', 'The Chronicles of Narnia', 'Percy Jackson', 'The Twilight Saga', 'The Baby-Sitters Club']),
    prompt('culture_fictional_animal', 'Name a famous fictional animal character.', 'fictional animal', ['Mickey Mouse', 'Snoopy', 'Garfield', 'Simba', 'Winnie-the-Pooh', 'Pikachu', 'Scooby-Doo', 'Dumbo']),
    prompt('culture_book_genre', 'Name a kind of book or story.', 'book genre', ['Mystery', 'Fantasy', 'Romance', 'Science fiction', 'Adventure', 'Horror', 'Biography', 'Fairy tale']),
    prompt('culture_fictional_kingdom', 'Name a well-known fictional place from a story or movie.', 'fictional place', ['Hogwarts', 'Middle-earth', 'Narnia', 'Wakanda', 'Gotham City', 'Neverland', 'Oz', 'Jurassic Park']),
    prompt('culture_puppet', 'Name a familiar character from a puppet or children’s TV show.', 'TV character', ['Kermit the Frog', 'Elmo', 'Big Bird', 'Cookie Monster', 'Miss Piggy', 'Grover', 'Oscar the Grouch', 'Count von Count']),
    prompt('culture_animated_series', 'Name a popular animated television series.', 'animated series', ['The Simpsons', 'SpongeBob SquarePants', 'Bluey', 'Scooby-Doo', 'Tom and Jerry', 'Pokémon', 'Avatar: The Last Airbender', 'Peppa Pig']),
    prompt('culture_famous_comedy', 'Name a well-known comedy movie.', 'comedy movie', ['Home Alone', 'Groundhog Day', 'Mrs. Doubtfire', 'Shrek', 'The Princess Bride', 'Ghostbusters', 'The Incredibles', 'School of Rock']),
    prompt('culture_fictional_hero', 'Name a famous fictional hero who is not a superhero.', 'fictional hero', ['Indiana Jones', 'Luke Skywalker', 'Katniss Everdeen', 'Frodo Baggins', 'Hermione Granger', 'Mary Poppins', 'Princess Leia', 'James Bond']),
    prompt('culture_popular_app', 'Name a widely used social media or video-sharing app.', 'app', ['YouTube', 'Instagram', 'TikTok', 'Facebook', 'Snapchat', 'Reddit', 'Pinterest', 'WhatsApp']),
    prompt('culture_famous_actor', 'Name a well-known movie actor.', 'actor', ['Tom Hanks', 'Dwayne Johnson', 'Jackie Chan', 'Meryl Streep', 'Will Smith', 'Julia Roberts', 'Keanu Reeves', 'Zendaya'])
  );
  tracks[3].push(
    prompt('science_element', 'Name a chemical element.', 'chemical element', ['Oxygen', 'Gold', 'Iron', 'Carbon', 'Hydrogen', 'Silver', 'Copper', 'Helium']),
    prompt('science_energy_form', 'Name a form of energy.', 'energy', ['Light', 'Heat', 'Electrical energy', 'Sound', 'Chemical energy', 'Nuclear energy', 'Kinetic energy', 'Potential energy']),
    prompt('science_length_unit', 'Name a unit used to measure length.', 'unit of length', ['Meter', 'Kilometer', 'Centimeter', 'Mile', 'Inch', 'Foot', 'Yard', 'Millimeter']),
    prompt('science_plant_part', 'Name a part of a flowering plant.', 'plant part', ['Root', 'Stem', 'Leaf', 'Flower', 'Seed', 'Fruit', 'Petal', 'Bark']),
    prompt('science_body_system', 'Name a system in the human body.', 'body system', ['Circulatory system', 'Digestive system', 'Nervous system', 'Respiratory system', 'Skeletal system', 'Muscular system', 'Immune system', 'Urinary system']),
    prompt('science_mineral', 'Name a familiar mineral or gemstone.', 'mineral', ['Quartz', 'Diamond', 'Salt', 'Gold', 'Copper', 'Emerald', 'Ruby', 'Amethyst']),
    prompt('science_spacecraft', 'Name a famous spacecraft or space telescope.', 'spacecraft', ['Apollo 11', 'Voyager 1', 'Hubble Space Telescope', 'International Space Station', 'Sputnik 1', 'James Webb Space Telescope', 'Curiosity rover', 'Perseverance rover']),
    prompt('science_force', 'Name a force that can affect a moving object.', 'force', ['Gravity', 'Friction', 'Magnetism', 'Air resistance', 'Tension', 'Buoyancy', 'Push', 'Pull'])
  );
  tracks[3].push(
    prompt('science_weather_tool', 'Name a tool used to measure or study the weather.', 'weather tool', ['Thermometer', 'Rain gauge', 'Barometer', 'Wind vane', 'Anemometer', 'Weather radar', 'Hygrometer', 'Weather satellite']),
    prompt('science_natural_disaster', 'Name a kind of natural disaster.', 'natural disaster', ['Earthquake', 'Flood', 'Wildfire', 'Hurricane', 'Tornado', 'Drought', 'Volcanic eruption', 'Tsunami']),
    prompt('science_hand_tool', 'Name a common hand tool.', 'hand tool', ['Hammer', 'Screwdriver', 'Wrench', 'Pliers', 'Saw', 'Tape measure', 'Level', 'Chisel']),
    prompt('science_home_appliance', 'Name a common household appliance.', 'appliance', ['Refrigerator', 'Oven', 'Washing machine', 'Dishwasher', 'Microwave', 'Vacuum cleaner', 'Toaster', 'Blender']),
    prompt('science_transport', 'Name a common way to travel from place to place.', 'transport', ['Car', 'Bus', 'Bicycle', 'Train', 'Airplane', 'Boat', 'Subway', 'Motorcycle']),
    prompt('science_branch', 'Name a branch of science.', 'science branch', ['Biology', 'Chemistry', 'Physics', 'Astronomy', 'Geology', 'Ecology', 'Meteorology', 'Anatomy']),
    prompt('science_metal', 'Name a familiar metal.', 'metal', ['Iron', 'Copper', 'Gold', 'Aluminum', 'Silver', 'Steel', 'Zinc', 'Tin']),
    prompt('science_cell_part', 'Name a part of a plant or animal cell.', 'cell part', ['Nucleus', 'Cell membrane', 'Cytoplasm', 'Mitochondrion', 'Chloroplast', 'Cell wall', 'Ribosome', 'Vacuole']),
    prompt('science_measurement', 'Name something people measure in science.', 'measurement', ['Temperature', 'Time', 'Length', 'Mass', 'Speed', 'Volume', 'Distance', 'Pressure']),
    prompt('science_common_material', 'Name a material used to make everyday objects.', 'material', ['Wood', 'Glass', 'Metal', 'Plastic', 'Paper', 'Cotton', 'Rubber', 'Ceramic']),
    prompt('science_light_source', 'Name something in nature that can produce visible light.', 'light source', ['Sun', 'Stars', 'Lightning', 'Fire', 'Aurora', 'Lava', 'Firefly', 'Meteor']),
    prompt('science_energy_source', 'Name a source that can produce electricity.', 'energy source', ['Battery', 'Solar panel', 'Wind turbine', 'Hydroelectric dam', 'Power plant', 'Generator', 'Fuel cell', 'Nuclear power station'])
  );
  tracks[4].push(
    prompt('food_sandwich', 'Name a popular sandwich.', 'sandwich', ['Grilled cheese', 'Peanut butter and jelly', 'BLT', 'Ham sandwich', 'Tuna sandwich', 'Club sandwich', 'Egg salad sandwich', 'Turkey sandwich']),
    prompt('food_bean', 'Name a kind of bean or legume.', 'bean or legume', ['Black bean', 'Kidney bean', 'Chickpea', 'Pinto bean', 'Lentil', 'Lima bean', 'Soybean', 'Navy bean']),
    prompt('food_cooking_method', 'Name a common way to cook food.', 'cooking method', ['Bake', 'Fry', 'Boil', 'Grill', 'Roast', 'Steam', 'Sauté', 'Simmer']),
    prompt('food_nut', 'Name a kind of edible nut.', 'nut', ['Almond', 'Peanut', 'Walnut', 'Cashew', 'Pistachio', 'Pecan', 'Hazelnut', 'Macadamia nut']),
    prompt('food_dish', 'Name a popular dish from around the world.', 'dish', ['Tacos', 'Sushi', 'Pizza', 'Curry', 'Paella', 'Pad Thai', 'Falafel', 'Dumplings']),
    prompt('food_ice_cream', 'Name a familiar ice cream flavor.', 'ice cream flavor', ['Vanilla', 'Chocolate', 'Strawberry', 'Mint chocolate chip', 'Cookies and cream', 'Cookie dough', 'Pistachio', 'Butter pecan']),
    prompt('food_citrus', 'Name a citrus fruit.', 'citrus fruit', ['Orange', 'Lemon', 'Lime', 'Grapefruit', 'Mandarin', 'Tangerine', 'Pomelo', 'Clementine']),
    prompt('food_soup', 'Name a popular soup.', 'soup', ['Tomato soup', 'Chicken noodle soup', 'Minestrone', 'Ramen', 'Miso soup', 'Clam chowder', 'French onion soup', 'Lentil soup'])
  );
  tracks[4].push(
    prompt('food_breakfast_drink', 'Name a drink often served at breakfast.', 'drink', ['Coffee', 'Tea', 'Orange juice', 'Milk', 'Smoothie', 'Hot chocolate', 'Apple juice', 'Chai']),
    prompt('food_grain', 'Name a grain people commonly eat.', 'grain', ['Rice', 'Wheat', 'Oats', 'Corn', 'Barley', 'Quinoa', 'Rye', 'Millet']),
    prompt('food_pastry', 'Name a familiar pastry or baked treat.', 'pastry', ['Croissant', 'Muffin', 'Cupcake', 'Scone', 'Cinnamon roll', 'Danish pastry', 'Éclair', 'Apple turnover']),
    prompt('food_pie_filling', 'Name a common fruit used as a pie filling.', 'pie filling', ['Apple', 'Cherry', 'Blueberry', 'Peach', 'Pumpkin', 'Lemon', 'Key lime', 'Blackberry']),
    prompt('food_sauce', 'Name a familiar sauce or condiment.', 'sauce', ['Ketchup', 'Mustard', 'Mayonnaise', 'Soy sauce', 'Hot sauce', 'Barbecue sauce', 'Salsa', 'Pesto']),
    prompt('food_cereal', 'Name a familiar breakfast cereal.', 'cereal', ['Cheerios', 'Corn Flakes', 'Rice Krispies', 'Frosted Flakes', 'Wheaties', 'Raisin Bran', 'Chex', 'Shredded Wheat']),
    prompt('food_noodle_dish', 'Name a popular noodle dish.', 'noodle dish', ['Ramen', 'Spaghetti', 'Pad Thai', 'Pho', 'Macaroni and cheese', 'Chow mein', 'Udon', 'Lasagna']),
    prompt('food_salad_ingredient', 'Name a common ingredient in a green salad.', 'salad ingredient', ['Lettuce', 'Tomato', 'Cucumber', 'Carrot', 'Onion', 'Olive', 'Crouton', 'Bell pepper']),
    prompt('food_hot_drink', 'Name a hot drink.', 'hot drink', ['Coffee', 'Tea', 'Hot chocolate', 'Espresso', 'Chai', 'Matcha', 'Warm cider', 'Café au lait']),
    prompt('food_barbecue', 'Name a food people often cook at a barbecue.', 'barbecue food', ['Hamburger', 'Hot dog', 'Ribs', 'Chicken', 'Corn on the cob', 'Kebab', 'Sausage', 'Salmon']),
    prompt('food_popular_soda', 'Name a popular soft drink.', 'soft drink', ['Coca-Cola', 'Pepsi', 'Sprite', 'Dr Pepper', 'Fanta', 'Root beer', '7 Up', 'Mountain Dew']),
    prompt('food_common_dip', 'Name a popular dip or spread.', 'dip or spread', ['Hummus', 'Guacamole', 'Salsa', 'Peanut butter', 'Cream cheese', 'Ranch dressing', 'Tzatziki', 'Spinach dip'])
  );
  tracks[5].push(
    prompt('history_empire', 'Name a famous empire from history.', 'empire', ['Roman Empire', 'British Empire', 'Ottoman Empire', 'Mongol Empire', 'Egyptian Empire', 'Persian Empire', 'Inca Empire', 'Byzantine Empire']),
    prompt('history_ancient_site', 'Name a famous ancient historical site.', 'ancient site', ['Pyramids of Giza', 'Colosseum', 'Great Wall of China', 'Stonehenge', 'Machu Picchu', 'Pompeii', 'Acropolis of Athens', 'Petra']),
    prompt('history_historical_woman', 'Name a well-known woman from history.', 'historical figure', ['Cleopatra', 'Marie Curie', 'Rosa Parks', 'Queen Elizabeth I', 'Joan of Arc', 'Amelia Earhart', 'Harriet Tubman', 'Susan B. Anthony']),
    prompt('history_writer', 'Name a famous writer from history.', 'writer', ['William Shakespeare', 'Jane Austen', 'Mark Twain', 'Charles Dickens', 'Homer', 'Mary Shelley', 'George Orwell', 'Maya Angelou']),
    prompt('history_composer', 'Name a famous composer.', 'composer', ['Ludwig van Beethoven', 'Wolfgang Amadeus Mozart', 'Johann Sebastian Bach', 'Frédéric Chopin', 'Pyotr Ilyich Tchaikovsky', 'George Frideric Handel', 'Antonio Vivaldi', 'Claude Debussy']),
    prompt('history_battle', 'Name a famous battle from history.', 'battle', ['Battle of Waterloo', 'Battle of Gettysburg', 'D-Day', 'Battle of Hastings', 'Battle of Yorktown', 'Battle of Marathon', 'Battle of the Bulge', 'Battle of the Alamo']),
    prompt('history_invention', 'Name an invention that changed everyday life.', 'invention', ['Telephone', 'Light bulb', 'Printing press', 'Airplane', 'Internet', 'Steam engine', 'Wheel', 'Television']),
    prompt('history_queen', 'Name a famous queen from history.', 'queen', ['Queen Elizabeth II', 'Cleopatra', 'Queen Victoria', 'Marie Antoinette', 'Queen Elizabeth I', 'Catherine the Great', 'Nefertiti', 'Mary, Queen of Scots'])
  );
  tracks[5].push(
    prompt('history_scientist', 'Name a famous scientist from history.', 'scientist', ['Albert Einstein', 'Marie Curie', 'Isaac Newton', 'Charles Darwin', 'Galileo Galilei', 'Nikola Tesla', 'Ada Lovelace', 'Stephen Hawking']),
    prompt('history_ancient_greek', 'Name a well-known figure from ancient Greece.', 'historical figure', ['Socrates', 'Plato', 'Aristotle', 'Alexander the Great', 'Homer', 'Pericles', 'Hippocrates', 'Pythagoras']),
    prompt('history_ancient_egypt', 'Name a famous ruler or figure from ancient Egypt.', 'historical figure', ['Cleopatra', 'Tutankhamun', 'Ramses II', 'Nefertiti', 'Hatshepsut', 'Akhenaten', 'Khufu', 'Imhotep']),
    prompt('history_revolution', 'Name a famous revolution from history.', 'revolution', ['American Revolution', 'French Revolution', 'Russian Revolution', 'Haitian Revolution', 'Industrial Revolution', 'Chinese Revolution', 'Mexican Revolution', 'Glorious Revolution']),
    prompt('history_war', 'Name a major war or conflict studied in school.', 'war or conflict', ['World War I', 'World War II', 'American Civil War', 'Vietnam War', 'Korean War', 'American Revolutionary War', 'Cold War', 'War of 1812']),
    prompt('history_ancient_story', 'Name a famous epic, myth, or legend.', 'epic or legend', ['The Odyssey', 'The Iliad', 'The Epic of Gilgamesh', 'The Aeneid', 'The Ramayana', 'The Mahabharata', 'Beowulf', 'King Arthur and the Knights of the Round Table']),
    prompt('history_civil_rights_champion', 'Name a famous person who fought for civil rights or equality.', 'historical figure', ['Martin Luther King Jr.', 'Rosa Parks', 'Nelson Mandela', 'Harriet Tubman', 'Mahatma Gandhi', 'Frederick Douglass', 'Cesar Chavez', 'Susan B. Anthony']),
    prompt('history_us_event', 'Name a major event in United States history.', 'historical event', ['American Revolution', 'Civil War', 'Moon landing', 'Civil Rights Movement', 'Great Depression', 'Declaration of Independence', 'Louisiana Purchase', 'End of World War II']),
    prompt('history_international_event', 'Name a major event from world history.', 'historical event', ['Fall of the Berlin Wall', 'Moon landing', 'French Revolution', 'Invention of the printing press', 'First powered flight', 'Opening of the Suez Canal', 'End of World War II', 'First Olympic Games']),
    prompt('history_instrument_invention', 'Name a famous invention from history.', 'invention', ['Printing press', 'Telephone', 'Light bulb', 'Airplane', 'Steam engine', 'Radio', 'Television', 'Computer']),
    prompt('history_king', 'Name a famous king from history or legend.', 'king', ['King Tutankhamun', 'Henry VIII', 'Charlemagne', 'Richard the Lionheart', 'King Arthur', 'Alexander the Great', 'Louis XIV', 'King George III']),
    prompt('history_mythological_hero', 'Name a hero from a well-known myth or legend.', 'mythological hero', ['Hercules', 'King Arthur', 'Achilles', 'Perseus', 'Odysseus', 'Robin Hood', 'Beowulf', 'Mulan'])
  );
  tracks[6].push(
    prompt('sports_combat', 'Name a combat sport or martial art.', 'combat sport', ['Boxing', 'Wrestling', 'Karate', 'Judo', 'Taekwondo', 'Fencing', 'Kickboxing', 'Mixed martial arts']),
    prompt('sports_track_event', 'Name an event in track and field.', 'track and field', ['Sprint', 'Marathon', 'Relay race', 'Long jump', 'High jump', 'Hurdles', 'Shot put', 'Pole vault']),
    prompt('sports_soccer_position', 'Name a position in soccer.', 'soccer position', ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Striker', 'Winger', 'Fullback', 'Center back']),
    prompt('sports_famous_race', 'Name a famous sporting race.', 'race', ['Tour de France', 'Boston Marathon', 'Kentucky Derby', 'Indianapolis 500', 'Daytona 500', 'New York City Marathon', 'America’s Cup', 'Grand National']),
    prompt('sports_playground_equipment', 'Name a piece of equipment found on a playground.', 'playground equipment', ['Slide', 'Swing', 'Seesaw', 'Monkey bars', 'Merry-go-round', 'Climbing frame', 'Sandbox', 'Spring rider']),
    prompt('sports_swim_stroke', 'Name a competitive swimming stroke.', 'swimming stroke', ['Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly']),
    prompt('sports_league', 'Name a professional sports league.', 'sports league', ['NBA', 'NFL', 'Major League Baseball', 'NHL', 'English Premier League', 'WNBA', 'Major League Soccer', 'National Rugby League']),
    prompt('sports_tournament', 'Name a famous sports tournament.', 'sports tournament', ['Wimbledon', 'Super Bowl', 'World Series', 'FIFA World Cup', 'The Olympics', 'Masters Tournament', 'Stanley Cup playoffs', 'Rugby World Cup'])
  );
  tracks[6].push(
    prompt('sports_tennis_tournament', 'Name one of tennis’s four major tournaments.', 'tennis tournament', ['Wimbledon', 'US Open', 'French Open', 'Australian Open']),
    prompt('sports_bat_sport', 'Name a sport played with a bat.', 'bat sport', ['Baseball', 'Cricket', 'Softball', 'Rounders', 'T-ball', 'Wiffle ball']),
    prompt('sports_puck_sport', 'Name a kind of hockey.', 'hockey', ['Ice hockey', 'Field hockey', 'Roller hockey', 'Street hockey', 'Floor hockey', 'Inline hockey']),
    prompt('sports_basketball_team', 'Name a well-known professional basketball team.', 'basketball team', ['Los Angeles Lakers', 'Boston Celtics', 'Chicago Bulls', 'Golden State Warriors', 'New York Knicks', 'Miami Heat', 'Toronto Raptors', 'San Antonio Spurs']),
    prompt('sports_exercise', 'Name a popular type of exercise.', 'exercise', ['Walking', 'Running', 'Cycling', 'Yoga', 'Weightlifting', 'Swimming', 'Dancing', 'Hiking']),
    prompt('sports_safety_gear', 'Name a piece of safety gear used in sports.', 'sports safety gear', ['Helmet', 'Mouthguard', 'Shin guards', 'Knee pads', 'Goggles', 'Life jacket', 'Shoulder pads', 'Wrist guards']),
    prompt('sports_goal_sport', 'Name a sport where players score by getting a ball or puck into a goal or basket.', 'sport', ['Soccer', 'Hockey', 'Basketball', 'Lacrosse', 'Water polo', 'Rugby', 'Handball', 'Netball']),
    prompt('sports_field_sport', 'Name a sport played on a field.', 'sport', ['Soccer', 'Baseball', 'Football', 'Field hockey', 'Lacrosse', 'Rugby', 'Cricket', 'Ultimate frisbee']),
    prompt('sports_snow_activity', 'Name a sport or activity done on snow.', 'snow sport', ['Skiing', 'Snowboarding', 'Sledding', 'Snowshoeing', 'Cross-country skiing', 'Snowmobiling', 'Ski jumping', 'Snow tubing']),
    prompt('sports_golf_tournament', 'Name a famous golf tournament.', 'golf tournament', ['The Masters', 'U.S. Open', 'The Open Championship', 'PGA Championship', 'Ryder Cup', 'PGA Tour Championship', 'Players Championship']),
    prompt('sports_team_position', 'Name a position on a baseball team.', 'baseball position', ['Pitcher', 'Catcher', 'First baseman', 'Second baseman', 'Shortstop', 'Third baseman', 'Outfielder', 'Designated hitter']),
    prompt('sports_american_football_position', 'Name a position in American football.', 'football position', ['Quarterback', 'Running back', 'Wide receiver', 'Tight end', 'Linebacker', 'Cornerback', 'Kicker', 'Offensive lineman'])
  );

  const packs = {
    'Expeditions: Geography Trek': {
      theme: 'trek',
      tagline: '7 expedition legs · 25 seconds each · familiar landmarks and places to discover',
      prompts: [
        prompt('pack_trek_volcano', 'Name a famous volcano.', 'volcano', ['Mount Fuji', 'Mount Vesuvius', 'Mount St. Helens', 'Mount Etna', 'Krakatoa', 'Mauna Loa', 'Kilauea', 'Mount Rainier']),
        prompt('pack_trek_national_park', 'Name a famous national park.', 'national park', ['Yellowstone', 'Yosemite', 'Grand Canyon', 'Zion', 'Banff', 'Kruger National Park', 'Serengeti National Park', 'Grand Teton National Park']),
        prompt('pack_trek_mountain_range', 'Name a major mountain range.', 'mountain range', ['Rocky Mountains', 'Himalayas', 'Alps', 'Andes', 'Appalachian Mountains', 'Atlas Mountains', 'Pyrenees', 'Ural Mountains']),
        prompt('pack_trek_island', 'Name a well-known island.', 'island', ['Madagascar', 'Greenland', 'Sicily', 'Hawaii', 'Cuba', 'Iceland', 'Bali', 'Corsica']),
        prompt('pack_trek_waterway', 'Name a famous river or canal.', 'waterway', ['Nile', 'Amazon River', 'Mississippi River', 'Panama Canal', 'Suez Canal', 'Thames', 'Danube', 'Yangtze River']),
        prompt('pack_trek_city', 'Name a famous city outside the United States.', 'city', ['London', 'Paris', 'Tokyo', 'Rome', 'Sydney', 'Rio de Janeiro', 'Cape Town', 'Marrakesh']),
        prompt('pack_trek_landmark', 'Name a famous world landmark.', 'landmark', ['Eiffel Tower', 'Great Wall of China', 'Taj Mahal', 'Colosseum', 'Machu Picchu', 'Pyramids of Giza', 'Petra', 'Angkor Wat'])
      ]
    },
    'At the Movies': {
      theme: 'cinema',
      tagline: '7 movie-night rounds · familiar films, characters, and stories',
      prompts: [
        prompt('pack_movie_animated', 'Name a popular animated movie.', 'animated movie', ['Toy Story', 'Frozen', 'Finding Nemo', 'The Lion King', 'Shrek', 'Moana', 'Coco', 'Up']),
        prompt('pack_movie_hero', 'Name a well-known movie superhero.', 'superhero', ['Spider-Man', 'Batman', 'Superman', 'Wonder Woman', 'Iron Man', 'Hulk', 'Black Panther', 'Captain America']),
        prompt('pack_movie_series', 'Name a popular movie series.', 'movie series', ['Star Wars', 'Harry Potter', 'Jurassic Park', 'Toy Story', 'James Bond', 'The Lord of the Rings', 'The Hunger Games', 'Mission: Impossible']),
        prompt('pack_movie_genre', 'Name a movie genre.', 'film genre', ['Comedy', 'Action', 'Horror', 'Romance', 'Science fiction', 'Adventure', 'Drama', 'Mystery']),
        prompt('pack_movie_wizard', 'Name a famous fictional wizard.', 'wizard', ['Harry Potter', 'Merlin', 'Gandalf', 'Dumbledore', 'The Wizard of Oz', 'Doctor Strange', 'Saruman', 'Sabrina Spellman']),
        prompt('pack_movie_character', 'Name a famous movie character.', 'movie character', ['Indiana Jones', 'Darth Vader', 'Rocky Balboa', 'Shrek', 'E.T.', 'Forrest Gump', 'Mary Poppins', 'Jack Sparrow']),
        prompt('pack_movie_fairy_tale', 'Name a fairy-tale character who has appeared in movies.', 'fairy-tale character', ['Cinderella', 'Snow White', 'Pinocchio', 'The Little Mermaid', 'Beauty and the Beast', 'Peter Pan', 'Rapunzel', 'Puss in Boots'])
      ]
    },
    'The Deep Bench': {
      theme: 'sports',
      tagline: '7 sports rounds · big games, familiar athletes, and playground classics',
      prompts: [
        prompt('pack_sport_team', 'Name a sport played by teams.', 'team sport', ['Soccer', 'Basketball', 'Baseball', 'Volleyball', 'Hockey', 'Rugby', 'Cricket', 'Water polo']),
        prompt('pack_sport_winter', 'Name a winter sport.', 'winter sport', ['Skiing', 'Figure skating', 'Ice hockey', 'Snowboarding', 'Curling', 'Bobsleigh', 'Luge', 'Biathlon']),
        prompt('pack_sport_athlete', 'Name a famous athlete.', 'athlete', ['Serena Williams', 'Michael Jordan', 'Lionel Messi', 'Simone Biles', 'Usain Bolt', 'LeBron James', 'Wayne Gretzky', 'Megan Rapinoe']),
        prompt('pack_sport_racket', 'Name a sport played with a racket.', 'racket sport', ['Tennis', 'Badminton', 'Squash', 'Table tennis', 'Padel', 'Pickleball']),
        prompt('pack_sport_racing', 'Name a type of racing sport.', 'racing sport', ['Formula One', 'Horse racing', 'NASCAR', 'Cycling', 'Motorcycle racing', 'Drag racing', 'Ski racing', 'Sailing']),
        prompt('pack_sport_playground', 'Name a playground game.', 'playground game', ['Tag', 'Hide-and-seek', 'Hopscotch', 'Dodgeball', 'Four square', 'Simon Says', 'Capture the flag', 'Red light, green light']),
        prompt('pack_sport_equipment', 'Name a piece of sports equipment.', 'sports equipment', ['Ball', 'Racket', 'Helmet', 'Bat', 'Skateboard', 'Skis', 'Glove', 'Hockey stick'])
      ]
    },
    "Chef's Table": {
      theme: 'food',
      tagline: '7 delicious rounds · everyday favorites from kitchens around the world',
      prompts: [
        prompt('pack_food_fruit', 'Name a fruit.', 'fruit', ['Apple', 'Banana', 'Orange', 'Strawberry', 'Grapes', 'Watermelon', 'Mango', 'Pineapple']),
        prompt('pack_food_dessert', 'Name a popular dessert.', 'dessert', ['Ice cream', 'Chocolate cake', 'Cookies', 'Apple pie', 'Brownies', 'Cheesecake', 'Doughnut', 'Pudding']),
        prompt('pack_food_breakfast', 'Name a common breakfast food.', 'breakfast food', ['Cereal', 'Toast', 'Eggs', 'Pancakes', 'Oatmeal', 'Yogurt', 'Waffles', 'Bagel']),
        prompt('pack_food_pizza', 'Name a common pizza topping.', 'pizza topping', ['Pepperoni', 'Mushrooms', 'Cheese', 'Olives', 'Sausage', 'Onions', 'Bell peppers', 'Bacon']),
        prompt('pack_food_pasta', 'Name a kind of pasta.', 'pasta', ['Spaghetti', 'Macaroni', 'Penne', 'Fettuccine', 'Ravioli', 'Lasagna', 'Fusilli', 'Linguine']),
        prompt('pack_food_cuisine', 'Name a style of food from a country or region.', 'cuisine', ['Italian', 'Mexican', 'Chinese', 'Japanese', 'Indian', 'Thai', 'Greek', 'French']),
        prompt('pack_food_drink', 'Name a drink people often have with a meal.', 'drink', ['Water', 'Milk', 'Tea', 'Coffee', 'Orange juice', 'Lemonade', 'Soda', 'Hot chocolate'])
      ]
    },
    'Cosmos & Stargazer': {
      theme: 'sky',
      tagline: '7 skyward rounds · planets, space, and science everyone can explore',
      prompts: [
        prompt('pack_space_planet', 'Name a planet in our solar system.', 'planet', ['Earth', 'Mars', 'Jupiter', 'Venus', 'Saturn', 'Neptune', 'Mercury', 'Uranus']),
        prompt('pack_space_moon', 'Name a moon in our solar system.', 'moon', ['Earth’s Moon', 'Europa', 'Titan', 'Ganymede', 'Phobos', 'Io', 'Triton', 'Enceladus']),
        prompt('pack_space_star', 'Name a star or constellation people can see in the night sky.', 'star or constellation', ['Sirius', 'Polaris', 'Orion', 'Big Dipper', 'Little Dipper', 'Vega', 'Pleiades', 'Cassiopeia']),
        prompt('pack_space_weather', 'Name a natural phenomenon you might see in the sky.', 'sky phenomenon', ['Rainbow', 'Lightning', 'Aurora', 'Clouds', 'Thunderstorm', 'Tornado', 'Hurricane', 'Meteor shower']),
        prompt('pack_space_science_tool', 'Name a tool used to study space or science.', 'science tool', ['Telescope', 'Microscope', 'Thermometer', 'Magnifying glass', 'Camera', 'Spectroscope', 'Binoculars', 'Radio telescope']),
        prompt('pack_space_energy', 'Name a source of renewable energy.', 'energy source', ['Solar power', 'Wind power', 'Hydropower', 'Geothermal energy', 'Tidal power', 'Wave power', 'Biomass energy', 'Solar thermal energy']),
        prompt('pack_space_mission', 'Name a famous space mission or spacecraft.', 'space mission', ['Apollo 11', 'Voyager 1', 'Hubble Space Telescope', 'Mars rover', 'International Space Station', 'Sputnik 1', 'James Webb Space Telescope', 'Apollo 13'])
      ]
    },
    'Chronicles & Lore': {
      theme: 'history',
      tagline: '7 story-filled rounds · familiar people, places, and moments from history',
      prompts: [
        prompt('pack_history_civilization', 'Name an ancient civilization studied in school.', 'ancient civilization', ['Ancient Egypt', 'Ancient Greece', 'Roman Empire', 'Maya', 'Inca', 'Aztec', 'Ancient China', 'Persian Empire']),
        prompt('pack_history_figure', 'Name a well-known historical leader.', 'historical figure', ['Abraham Lincoln', 'George Washington', 'Cleopatra', 'Julius Caesar', 'Queen Elizabeth I', 'Nelson Mandela', 'Napoleon Bonaparte', 'Winston Churchill']),
        prompt('pack_history_inventor', 'Name a famous inventor.', 'inventor', ['Thomas Edison', 'Alexander Graham Bell', 'The Wright brothers', 'Benjamin Franklin', 'Johannes Gutenberg', 'Nikola Tesla', 'James Watt', 'Marie Curie']),
        prompt('pack_history_era', 'Name a period in history.', 'historical era', ['Middle Ages', 'Renaissance', 'Ancient Rome', 'Ancient Greece', 'Industrial Revolution', 'Victorian era', 'Age of Exploration', 'Stone Age']),
        prompt('pack_history_document', 'Name a famous historical document.', 'historical document', ['Declaration of Independence', 'Magna Carta', 'United States Constitution', 'Bill of Rights', 'Emancipation Proclamation', 'Gettysburg Address', 'Mayflower Compact', 'Universal Declaration of Human Rights']),
        prompt('pack_history_explorer', 'Name a famous explorer.', 'explorer', ['Marco Polo', 'Christopher Columbus', 'Ferdinand Magellan', 'Amelia Earhart', 'Neil Armstrong', 'Sacagawea', 'Roald Amundsen', 'Jacques Cousteau']),
        prompt('pack_history_artist', 'Name a famous painter.', 'painter', ['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Claude Monet', 'Michelangelo', 'Frida Kahlo', 'Georgia O’Keeffe', 'Salvador Dalí'])
      ]
    },
    'Reef & Trench': {
      theme: 'ocean',
      tagline: '7 ocean rounds · familiar marine life and discoveries beneath the waves',
      prompts: [
        prompt('pack_ocean_animal', 'Name an animal that lives in the ocean.', 'ocean animal', ['Dolphin', 'Shark', 'Whale', 'Octopus', 'Sea turtle', 'Seal', 'Clownfish', 'Sea otter']),
        prompt('pack_ocean_seabird', 'Name a bird that lives near or over the ocean.', 'seabird', ['Seagull', 'Penguin', 'Albatross', 'Pelican', 'Puffin', 'Cormorant', 'Tern', 'Gannet']),
        prompt('pack_ocean_reef', 'Name an animal that can live around a coral reef.', 'reef animal', ['Clownfish', 'Sea turtle', 'Parrotfish', 'Manta ray', 'Moray eel', 'Seahorse', 'Reef shark', 'Sea star']),
        prompt('pack_ocean_sea', 'Name a sea or ocean.', 'sea or ocean', ['Pacific Ocean', 'Atlantic Ocean', 'Mediterranean Sea', 'Caribbean Sea', 'Red Sea', 'North Sea', 'Indian Ocean', 'Arctic Ocean']),
        prompt('pack_ocean_whale', 'Name a kind of whale.', 'whale', ['Blue whale', 'Humpback whale', 'Killer whale', 'Sperm whale', 'Beluga whale', 'Gray whale', 'Fin whale', 'Narwhal']),
        prompt('pack_ocean_shellfish', 'Name a shellfish or other familiar sea creature.', 'sea creature', ['Crab', 'Lobster', 'Shrimp', 'Oyster', 'Clam', 'Mussel', 'Scallop', 'Sea urchin']),
        prompt('pack_ocean_coast', 'Name a familiar feature found along a coast.', 'coastal feature', ['Beach', 'Cliff', 'Island', 'Harbor', 'Lighthouse', 'Bay', 'Coral reef', 'Tide pool'])
      ]
    }
  };

  window.CUSTOM_KRILLION_PROMPT_DATA = { tracks, packs };
})();
