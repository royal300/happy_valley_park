import frisbeeImg from '../assets/images/frisbee_ride.jpg';
import carouselImg from '../assets/images/flyingcarousel.jpg';
import horseImg from '../assets/images/horseride.jpg';
import trainImg from '../assets/images/toytrain.jpg';
import jumpImg from '../assets/images/jumping-house.jpg';
import poolImg from '../assets/images/waterpool.jpg';
import carImg from '../assets/images/striking_car.jpg';
import boatImg from '../assets/images/boating.jpg';
import mickeyImg from '../assets/images/mickeymouse.jpg';
import hauntedImg from '../assets/images/hauntedhouse.jpg';
import gameZoneImg from '../assets/images/gamezone.jpg';
import beesImg from '../assets/images/bees-round.jpg';
import happyBeesImg from '../assets/images/happybees.jpg';
import splashImg from '../assets/images/waterpark.jpg';
import waveImg from '../assets/images/wavepool.jpg';
import waterWorldHero from '../assets/images/waterworld.jpg';

export const ridesData = [
    // Dry Park Rides
    {
        id: 'frisbee-ride',
        title: "Frisbee Ride",
        category: "Thrill",
        type: "Dry",
        image: frisbeeImg,
        description: "Spin and swing through the air on this high-thrill adventure ride that defies gravity."
    },
    {
        id: 'haunted-house',
        title: "Haunted House",
        category: "Thrill",
        type: "Dry",
        image: hauntedImg,
        description: "Dare to enter? A spooky walk-through experience filled with scares and surprises."
    },
    {
        id: 'game-zone',
        title: "Game Zone",
        category: "Indoor",
        type: "Dry",
        image: gameZoneImg,
        description: "An arcade paradise with the latest video games and classic redemption games for all ages."
    },
    {
        id: 'toy-train',
        title: "Toy Train",
        category: "Kids",
        type: "Dry",
        image: trainImg,
        description: "A delightful ride for little ones, chugging through a scenic mini-track."
    },
    {
        id: 'striking-car',
        title: "Striking Car",
        category: "Adventure",
        type: "Dry",
        image: carImg,
        description: "Bump and dodge! The classic bumper car experience for friends and family."
    },
    {
        id: 'lake-boating',
        title: "Lake Boating",
        category: "Family",
        type: "Dry",
        image: boatImg,
        description: "Relaxing paddle boating on our serene lake. Perfect for a calm evening."
    },
    {
        id: 'flying-carousel',
        title: "Flying Carousel",
        category: "Family",
        type: "Dry",
        image: carouselImg,
        description: "Soar high in the sky on this beautiful swing ride that offers great views of the park."
    },
    {
        id: 'mickey-mouse',
        title: "Mickey Mouse",
        category: "Kids",
        type: "Dry",
        image: mickeyImg,
        description: "A gentle rotating ride featuring beloved cartoon characters."
    },
    {
        id: 'jumping-house',
        title: "Jumping House",
        category: "Kids",
        type: "Dry",
        image: jumpImg,
        description: "Bounce around in this colorful inflatable castle. Pure joy for kids!"
    },
    {
        id: 'horse-ride',
        title: "Horse Ride",
        category: "Family",
        type: "Dry",
        image: horseImg,
        description: "A classic merry-go-round experience with beautifully crafted horses."
    },
    {
        id: 'bees-round',
        title: "Bees Round",
        category: "Kids",
        type: "Dry",
        image: beesImg,
        description: "Buzz around in these cute bee-themed pods. A favorite for toddlers."
    },
    {
        id: 'happy-bees',
        title: "Happy Bees",
        category: "Kids",
        type: "Dry",
        image: happyBeesImg,
        description: "Another variation of the bee ride, specifically designed for our youngest guests."
    },

    // Water Park Rides
    {
        id: 'water-playground',
        title: "Water Playground",
        category: "Water",
        type: "Water",
        image: splashImg,
        description: "A massive aquatic play structure with buckets, small slides, and sprinklers."
    },
    {
        id: 'children-pool',
        title: "Children Pool",
        category: "Water",
        type: "Water",
        image: poolImg,
        description: "A shallow, safe pool designed specifically for toddlers and young children."
    },
    {
        id: 'wave-pool',
        title: "Wave Pool",
        category: "Water",
        type: "Water",
        image: waveImg,
        description: "Experience the ocean on land! Artificial waves create a beach-like vibe for everyone."
    },
    {
        id: 'water-world-overview',
        title: "Water World Overview",
        category: "Water",
        type: "Water",
        image: waterWorldHero,
        description: "The complete water park experience, featuring slides, pools, and relaxation zones."
    }
];
