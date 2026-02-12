// Dry Park Images
import frisbeeImg from '../assets/Dry Park/Frisbee.jpg';
import bullRideImg from '../assets/Dry Park/Bull Ride.jpg';
import bumpingCarImg from '../assets/Dry Park/Bumping Car.JPG';
import merryGoRoundImg from '../assets/Dry Park/Merry Go Round.jpg';
import horseImg from '../assets/Dry Park/Horse Ride.jpg';
import cricketMissionImg from '../assets/Dry Park/ Cricket Mission.jpg';
import boatImg from '../assets/Dry Park/Boating.jpg';
import toyTrainImg from '../assets/Dry Park/Toy Train.jpg';
import dragonTrainImg from '../assets/Dry Park/Dragon Train.jpg';
import jumpingMickeyImg from '../assets/Dry Park/Jumping Mickey.jpg';
import trampolinImg from '../assets/Dry Park/Trampolin.JPG';
import carouselImg from '../assets/Dry Park/Child Flying Carousel.jpg';
import gameZoneImg from '../assets/Dry Park/Game Zone.JPG';
import hauntedHouseImg from '../assets/Dry Park/Haunted House.JPG';
import show5DImg from '../assets/Dry Park/5D Show.jpg';

// Water Park Images
import multiSlideImg from '../assets/Water Park/Multi Slide Water Ride.JPG';
import multiSlide1Img from '../assets/Water Park/Multi Slide Water Ride (1).JPG';
import multiSlide2Img from '../assets/Water Park/Multi Slide Water Ride .JPG';
import childrenWaterParkImg from '../assets/Water Park/Children Water Park .JPG';
import childrenWaterPark1Img from '../assets/Water Park/Children Water Park (1).JPG';
import waterWaveImg from '../assets/Water Park/Water Wave .JPG';
import waterWave1Img from '../assets/Water Park/Water Wave (1).JPG';
import waterCaveImg from '../assets/Water Park/Water Cave .JPG';
import danceFloorImg from '../assets/Water Park/Dance Floor.jpg';
import poolSideImg from '../assets/Water Park/Pool Side.jpg';

export const ridesData = [
    // Dry Park Rides - Thrill Category
    {
        id: 'frisbee',
        title: "Frisbee",
        category: "Thrill",
        type: "Dry",
        image: frisbeeImg,
        description: "Spin and swing through the air on this high-thrill adventure ride that defies gravity."
    },
    {
        id: 'bull-ride',
        title: "Bull Ride",
        category: "Thrill",
        type: "Dry",
        image: bullRideImg,
        description: "Test your skills on this mechanical bull riding adventure!"
    },
    {
        id: 'bumping-car',
        title: "Bumping Car",
        category: "Thrill",
        type: "Dry",
        image: bumpingCarImg,
        description: "Bump and dodge! The classic bumper car experience for friends and family."
    },
    {
        id: 'merry-go-round',
        title: "Merry Go Round",
        category: "Thrill",
        type: "Dry",
        image: merryGoRoundImg,
        description: "The timeless carousel ride that brings smiles to all ages."
    },
    {
        id: 'horse-ride',
        title: "Horse Ride",
        category: "Thrill",
        type: "Dry",
        image: horseImg,
        description: "A classic carousel experience with beautifully crafted horses."
    },
    {
        id: 'cricket-mission',
        title: "Cricket Mission",
        category: "Thrill",
        type: "Dry",
        image: cricketMissionImg,
        description: "An exciting cricket-themed gaming experience for sports enthusiasts."
    },

    // Dry Park Rides - Family Category
    {
        id: 'boating',
        title: "Boating",
        category: "Family",
        type: "Dry",
        image: boatImg,
        description: "Relaxing paddle boating on our serene lake. Perfect for a calm evening."
    },
    {
        id: 'toy-train',
        title: "Toy Train",
        category: "Family",
        type: "Dry",
        image: toyTrainImg,
        description: "A delightful ride for little ones, chugging through a scenic mini-track."
    },

    // Dry Park Rides - Kids Category
    {
        id: 'dragon-train',
        title: "Dragon Train",
        category: "Kids",
        type: "Dry",
        image: dragonTrainImg,
        description: "An adventurous train ride with a magical dragon theme for young explorers."
    },
    {
        id: 'jumping-mickey',
        title: "Jumping Mickey",
        category: "Kids",
        type: "Dry",
        image: jumpingMickeyImg,
        description: "A bouncing adventure featuring beloved cartoon characters. Pure joy for kids!"
    },
    {
        id: 'trampolin',
        title: "Trampolin",
        category: "Kids",
        type: "Dry",
        image: trampolinImg,
        description: "Bounce to your heart's content on our safe and fun trampoline area!"
    },
    {
        id: 'flying-carousel',
        title: "Flying Carousel",
        category: "Kids",
        type: "Dry",
        image: carouselImg,
        description: "Soar high in the sky on this beautiful swing ride that offers great views of the park."
    },

    // Dry Park Rides - Indoor Category
    {
        id: 'game-zone',
        title: "Game Zone",
        category: "Indoor",
        type: "Dry",
        image: gameZoneImg,
        description: "An arcade paradise with the latest video games and classic redemption games for all ages."
    },

    // Dry Park Rides - Adventure Category
    {
        id: 'haunted-house',
        title: "Haunted House",
        category: "Adventure",
        type: "Dry",
        image: hauntedHouseImg,
        description: "Dare to enter? A spooky walk-through experience filled with scares and surprises."
    },
    {
        id: '5d-show',
        title: "5D Show",
        category: "Adventure",
        type: "Dry",
        image: show5DImg,
        description: "Immersive 5D cinema experience with motion seats and environmental effects."
    },

    // Water Park Rides
    {
        id: 'multi-slide-water-ride',
        title: "Multi Slide Water Ride",
        category: "Water",
        type: "Water",
        image: multiSlideImg,
        description: "Experience the thrill of multiple water slides with twists, turns, and splashes!"
    },
    {
        id: 'multi-slide-water-ride-1',
        title: "Multi Slide Water Ride - Variant 1",
        category: "Water",
        type: "Water",
        image: multiSlide1Img,
        description: "Another exciting angle of our thrilling multi-slide water adventure!"
    },
    {
        id: 'multi-slide-water-ride-2',
        title: "Multi Slide Water Ride - Variant 2",
        category: "Water",
        type: "Water",
        image: multiSlide2Img,
        description: "More water slide fun with exciting twists and turns!"
    },
    {
        id: 'children-water-park',
        title: "Children Water Park",
        category: "Water",
        type: "Water",
        image: childrenWaterParkImg,
        description: "A safe and fun water playground designed specifically for young children."
    },
    {
        id: 'children-water-park-1',
        title: "Children Water Park - Play Area",
        category: "Water",
        type: "Water",
        image: childrenWaterPark1Img,
        description: "Interactive water play area with sprinklers and fountains for kids."
    },
    {
        id: 'water-wave',
        title: "Water Wave Pool",
        category: "Water",
        type: "Water",
        image: waterWaveImg,
        description: "Experience the ocean on land! Artificial waves create a beach-like vibe for everyone."
    },
    {
        id: 'water-wave-1',
        title: "Water Wave Pool - Beach Zone",
        category: "Water",
        type: "Water",
        image: waterWave1Img,
        description: "Relax in the wave pool and enjoy the simulated beach experience."
    },
    {
        id: 'water-cave',
        title: "Water Cave",
        category: "Water",
        type: "Water",
        image: waterCaveImg,
        description: "Explore the mysterious water cave with exciting water features and surprises."
    },
    {
        id: 'dance-floor',
        title: "Dance Floor",
        category: "Water",
        type: "Water",
        image: danceFloorImg,
        description: "Groove to the beats at our poolside dance floor - the perfect party spot!"
    },
    {
        id: 'pool-side',
        title: "Pool Side Relaxation",
        category: "Water",
        type: "Water",
        image: poolSideImg,
        description: "Unwind and relax by the poolside with comfortable lounging areas."
    }
];
