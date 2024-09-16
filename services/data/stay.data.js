import { getRandomInt, getRandomIntInclusive, makeId } from "../util.service.js";
const italyImg = '../../assets/imgs/countries/italy.jpeg';
const spainImg = '../../assets/imgs/countries/spain.jpg';
const portugalImg = '../../assets/imgs/countries/portugal.jpg';
const usaImg = '../../assets/imgs/countries/united-states.jpg';
const greeceImg = '../../assets/imgs/countries/greece.jpg';

const iconsImg = '../../assets/imgs/labels/icons.webp'
const barnsImg = '../../assets/imgs/labels/barns.jpeg';
const beachImg = '../../assets/imgs/labels/beach.jpeg';
const beachfrontImg = '../../assets/imgs/labels/beachfront.jpeg';
const bedAndBreakfastImg = '../../assets/imgs/labels/bed&breakfast.jpeg';
const boatsImg = '../../assets/imgs/labels/boats.jpeg';
const cabinsImg = '../../assets/imgs/labels/cabins.jpeg';
const campersImg = '../../assets/imgs/labels/campers.jpeg';
const campingImg = '../../assets/imgs/labels/camping.jpeg';
const casasParticularesImg = '../../assets/imgs/labels/casas-particulares.jpeg';
const castelsImg = '../../assets/imgs/labels/castels.jpeg';
const cavesImg = '../../assets/imgs/labels/caves.jpeg';
const chefsKitchensImg = '../../assets/imgs/labels/chefs-kitchens.jpeg';
const containersImg = '../../assets/imgs/labels/containers.jpeg';
const countrysideImg = '../../assets/imgs/labels/countryside.jpeg';
const creativeSpacesImg = '../../assets/imgs/labels/creative-spaces.jpeg';
const cycladicHomesImg = '../../assets/imgs/labels/cycladic-homes.jpeg';
const dammusiImg = '../../assets/imgs/labels/dammusi.jpeg';
const desertImg = '../../assets/imgs/labels/desert.jpeg';
const designImg = '../../assets/imgs/labels/design.jpeg';
const domesImg = '../../assets/imgs/labels/domes.jpeg';
const earthHomesImg = '../../assets/imgs/labels/earth-homes.jpeg';
const farmsImg = '../../assets/imgs/labels/farms.jpeg';
const golfingImg = '../../assets/imgs/labels/golfing.jpeg';
const grandPianosImg = '../../assets/imgs/labels/grand-pianos.jpeg';
const hanoksImg = '../../assets/imgs/labels/hanoks.jpeg';
const historicalHomesImg = '../../assets/imgs/labels/historical-homes.jpeg';
const houseboatsImg = '../../assets/imgs/labels/houseboats.jpeg';
const islandsImg = '../../assets/imgs/labels/islands.jpeg';
const lakefrontImg = '../../assets/imgs/labels/lakefront.jpeg';
const luxeImg = '../../assets/imgs/labels/luxe.jpeg';
const mansionsImg = '../../assets/imgs/labels/mansions.jpeg';
const minsusImg = '../../assets/imgs/labels/minsus.jpeg';
const nationalParksImg = '../../assets/imgs/labels/national-parks.jpeg';
const newImg = '../../assets/imgs/labels/new.jpeg';
const offTheGridImg = '../../assets/imgs/labels/off-the-grid.jpeg';
const omgImg = '../../assets/imgs/labels/omg.jpeg';
const playImg = '../../assets/imgs/labels/play.jpeg';
const riadsImg = '../../assets/imgs/labels/riads.jpeg';
const roomsImg = '../../assets/imgs/labels/rooms.jpeg';
const ryokansImg = '../../assets/imgs/labels/ryokans.jpeg';
const shepardsHutsImg = '../../assets/imgs/labels/shepards-huts.jpeg';
const skiInOutImg = '../../assets/imgs/labels/ski-in-out.jpeg';
const skiingImg = '../../assets/imgs/labels/skiing.jpeg';
const surfingImg = '../../assets/imgs/labels/surfing.jpeg';
const tinyHomesImg = '../../assets/imgs/labels/tinyhomes.jpeg';
const topCitiesImg = '../../assets/imgs/labels/top-cities.jpeg';
const topOfTheWorldImg = '../../assets/imgs/labels/top-of-the-world.jpeg';
const towersImg = '../../assets/imgs/labels/towers.jpeg';
const treehousesImg = '../../assets/imgs/labels/treehouses.jpeg';
const trendingImg = '../../assets/imgs/labels/trending.jpeg';
const tropicalImg = '../../assets/imgs/labels/tropical.jpeg';
const trulliImg = '../../assets/imgs/labels/trulli.jpeg';
const vineyardsImg = '../../assets/imgs/labels/vineyards.jpeg';
const windmillsImg = '../../assets/imgs/labels/windmills.jpeg';
const yurtsImg = '../../assets/imgs/labels/yurts.jpeg';

const parkingImg = '../../assets/imgs/Extra/parking.png'
const tvImg = '../../assets/imgs/Extra/tv.png'
const acImg = '../../assets/imgs/Extra/ac.png'
const kitchenImg = '../../assets/imgs/Extra/kitchen.png'
const washingMashineImg = '/src/assets/imgs/more/washer.svg'
const wifiImg = '../../assets/imgs/Extra/wifi.png'

export function createStayData(users, listingsPerHost = 4) {
    let stays = []
    const hosts = users.filter(user => user.host)
    for (let i = 0; i < hosts.length; i++) {
        for (let j = 0; j < listingsPerHost; j++) {
            const stay = createStay(hosts[i])
            stays.push(stay)
        }
    }
    stays = createStayForDemo(stays, users[0])
    stays.sort(() => Math.random() - 0.5)
    return stays
}

function createStayForDemo(stays, user) {
    const newStays = [...stays]
    newStays[0].imgs = ['https://res.cloudinary.com/dn08iwpyq/image/upload/v1726406811/rivkaImg_sblq6s.png', ...imgs]
    newStays[0].sleep = createSleep(3)
    newStays[0].type = 'home'
    newStays[0].reservedDates =
        [{ startDate: new Date('2024-09-25'), endDate: new Date('2024-09-29') },
        { startDate: new Date('2024-10-03'), endDate: new Date('2024-10-06') },
        { startDate: new Date('2024-10-17'), endDate: new Date('2024-10-22') },
        { startDate: new Date('2024-11-02'), endDate: new Date('2024-11-07') },
        { startDate: new Date('2024-11-18'), endDate: new Date('2024-11-21') }]

    newStays[0].host = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, ...user.host }
    newStays[0].location = { country: 'France', city: 'Paris', lat: 48.85, lng: 2.35 }
    return newStays

}

export function createStay(host) {
    const sleep = createSleep()
    const location = host.host.location

    return {
        name: getRandomItems(names, 1),
        imgs: generateImgUrls(imgs),
        sleep,
        description: getRandomItems(descriptions, 1),
        highlights: getRandomItems(highlights, 3),
        price: {
            night: getRandomIntInclusive(500, 2000),
            cleaning: getRandomIntInclusive(100, 500)
        },
        type: getRandomItems(types, 1),
        amenities: getRandomItems(amenities, getRandomIntInclusive(10, 35)),
        labels: getRandomItems(labels, 3),
        reservedDates: generateSequentialAvailabilityRanges(),
        host: {
            _id: host._id,
            fullname: host.fullname,
            imgUrl: host.imgUrl,
            reviews: host.host.reviews,
            rating: host.host.rating,
            yearsHosting: host.host.yearsHosting,
            responseRate: host.host.responseRate,
            personalDetails: host.host.personalDetails
        },
        location,
        reviews: getRandomItems(reviews, getRandomIntInclusive(3, 15)),
        thingsToKnow: {
            houseRules: getRandomItems(houseRules, getRandomIntInclusive(6, 12)),
            safetyProperty: getRandomItems(safetyProperty, getRandomIntInclusive(4, 10)),
            cancellationPolicy: getRandomItems(cancellationPolicy, 1)
        },
        status: 'published'
    }
}

export function getData(type) {
    switch (type) {
        case 'names': return names;
        case 'imgs': return imgs;
        case 'amenities': return amenities;
        case 'descriptions': return descriptions;
        case 'labels': return labels;
        case 'highlights': return highlights;
        case 'locations': return locations;
        case 'reviewTxts': return reviewsTxts;
        case 'mainAmenities': return mainAmenities
        default: return null;
    }
}


function getRandomItems(arr, numItems) {
    if (arr.length === 0 || numItems <= 0) return numItems === 1 ? null : []

    const shuffled = [...arr].sort(() => 0.5 - Math.random())
    const result = shuffled.slice(0, Math.min(numItems, arr.length))

    return numItems === 1 ? result[0] : result
}


const names = [
    "A Beautiful Apartment in the Center of the City!",
    "Charming Studio with a Scenic View!",
    "Luxurious Condo with Modern Amenities!",
    "Spacious Loft with Artistic Vibes!",
    "Cozy Home with a Private Garden!",
    "Elegant Townhouse with Classic Decor!",
    "Contemporary Flat with Open-Plan Living!",
    "Stylish Penthouse with Cityscape Views!",
    "Quaint Cottage with Rustic Charm!",
    "Sleek Apartment with High-End Finishes!",
    "Sunny Suite with Floor-to-Ceiling Windows!",
    "Art Deco Residence with Unique Flair!",
    "Minimalist Space with a Chic Ambiance!",
    "Sprawling Villa with a Pool and Lounge Area!",
    "Designer Loft with a Creative Touch!",
    "Eclectic Studio with Vintage Furniture!",
    "Modern Duplex with Smart Home Features!",
    "Boutique Apartment with Luxurious Touches!",
    "Sophisticated Suite with a Cozy Atmosphere!",
    "Upscale Condo with Stunning Interiors!",
    "Trendy Loft with an Urban Edge!",
    "Coastal Retreat with a Relaxing Vibe!",
    "Inviting Flat with a Warm Atmosphere!",
    "Lavish Penthouse with Skyline Views!",
    "Charming Bungalow with a Serene Garden!",
    "Contemporary Suite with a Sleek Design!",
    "Bright Apartment with Stylish Decor!",
    "Elegant Loft with an Open-Concept Layout!",
    "Luxury Residence with Top-of-the-Line Finishes!",
    "Chic Studio with Modern Conveniences!"
]

const imgs = ['271624', '1918291', '6315808', '7045712', '6283965', '7214173', '279614', '5998117', '6283961', '5997959', '1457841', '6908367', '6758788', '6908368', '6492398', '6782567', '5997967', '4450337', '6775268', '6527069', '3315291', '2079249', '7018391', '7018824', '6903160', '5998120', '4099357', '3190541']
const singleBedroomImgs = [
    '4115551', '7587810', '19836795',
    '26859033', '271618', '271695'
]

const doubleBedroomImgs = [
    '1454806', '90317', '262048', '1329711', '279746',
    '271743', '1743229', '775219', '1457845', '3773575',
    '5178070', '9130978', '9582420'
]

const livingRoomImgs = [
    '2747901', '1428348', '26859039', '6782353', '6908363',
    '7534294', '6782346'
]

function createSleep(length = 0) {
    const bedTypes = ["king bed", "queen bed", "double bed", "single bed"];
    const roomAmount = length || getRandomIntInclusive(1, 6)
    let rooms = [];
    let maxCapacity = 0;

    for (let i = 0; i < roomAmount; i++) {
        const bedType = getRandomItems(bedTypes, 1);
        let imgUrl;

        // Generate room images based on bed type
        if (bedType === "single bed") {
            imgUrl = generateImgUrls(singleBedroomImgs)[0];
        } else if (bedType === "double bed" || bedType === "queen bed" || bedType === "king bed") {
            imgUrl = generateImgUrls(doubleBedroomImgs)[0];
        } else {
            imgUrl = generateImgUrls(livingRoomImgs)[0];
        }

        const room = {
            roomType: 'bedroom',
            bedType: bedType,
            imgUrl: imgUrl || (bedType === 'single bed'
                ? '../assets/imgs/beds/single-bed.svg'
                : './assets/imgs/beds/double-bed.svg')
        };

        rooms.push(room);
        maxCapacity += room.bedType === 'single bed' ? 1 : 2;
    }

    // Optionally add a living room
    if (Math.random() > 0.5) { // Randomly decide whether to add a living room
        const livingRoomImgUrl = generateImgUrls(livingRoomImgs)[0];
        rooms.push({
            roomType: 'living room',
            bedType: 'sofa bed',
            imgUrl: livingRoomImgUrl || '../assets/imgs/beds/sofa-bed.svg'
        });
        maxCapacity += 1;
    }

    return {
        rooms,
        maxCapacity,
        bathrooms: getRandomIntInclusive(1, 3),
        beds: rooms.length,
        bedrooms: rooms.filter(room => room.roomType === 'bedroom').length
    };
}

function generateImgUrls(imgs) {
    const imgIds = getRandomItems(imgs, getRandomIntInclusive(5, 10))
    return imgIds.map(imgId => {
        return `https://images.pexels.com/photos/${imgId}/pexels-photo-${imgId}.jpeg?width=400`
    })
}

const descriptions = [
    "This stylish loft offers an open layout with industrial charm, featuring exposed brick walls and high ceilings. Perfectly sized for comfort, it includes modern furnishings and a spacious living area. The location provides easy access to everything you need.",
    "Step into this cozy retreat, where mid-century design meets modern comfort. The space is thoughtfully decorated with minimalist furniture, offering a welcoming atmosphere. The layout is efficient, making it ideal for a short or extended stay in a prime area.",
    "A bright and airy apartment with contemporary furnishings and clean lines. The spacious living room flows into a sleek kitchen with high-end appliances. The well-placed location makes exploring the surroundings a breeze.",
    "This charming home boasts a quaint exterior with a beautifully crafted interior. Featuring hardwood floors and cozy furnishings, the open-plan living area is perfect for relaxing. Its convenient location offers easy access to local attractions.",
    "Enjoy the elegance of this luxurious condo, with its expansive layout and sophisticated decor. The space is adorned with plush furniture, and large windows fill the rooms with natural light. Located in a sought-after area, it’s perfect for a high-end stay.",
    "Experience modern living in this tastefully designed flat. The space offers a blend of comfort and style with sleek furniture and a well-organized layout. The prime location allows you to enjoy nearby amenities effortlessly.",
    "A beautifully designed townhouse with classic charm and contemporary updates. The spacious interiors are filled with light, thanks to large windows and an open-concept design. The home is well-furnished and ideally located for exploring the area.",
    "This spacious apartment combines modern design with cozy touches. Featuring comfortable furniture and thoughtful details, the space is both stylish and functional. Its great location offers easy access to dining and entertainment.",
    "A compact yet charming studio, perfect for a solo traveler or couple. The minimalist decor is complemented by functional furniture, making the most of the space. The central location ensures you’re never far = the action.",
    "This sleek and modern loft features high ceilings and an airy feel. The industrial design is softened with warm accents, creating a welcoming space. Its ideal location puts you close to everything you need.",
    "A cozy bungalow with a rustic vibe, complete with comfortable furniture and a well-equipped kitchen. The open-plan living area is perfect for relaxing, while the location provides convenient access to local hotspots.",
    "This elegant suite offers a refined experience with its tasteful decor and high-end furnishings. The space is designed for comfort and luxury, with a layout that makes it easy to unwind. You’ll love the convenience of the nearby amenities.",
    "A bright and modern apartment, designed with simplicity and elegance. The furniture is carefully selected for both style and comfort. The location is perfect for those looking to explore the surroundings with ease.",
    "Experience the best of contemporary living in this stylish flat. The clean, minimalist design is complemented by comfortable furniture and an efficient layout. Situated in a desirable area, everything you need is within reach.",
    "A charming and cozy home, with a warm and inviting atmosphere. The furniture is a mix of modern and classic, creating a unique style. The home’s excellent location makes it easy to enjoy all the local attractions.",
    "This spacious and modern apartment features an open-concept design with sleek furnishings. The large windows provide plenty of natural light, creating a bright and welcoming space. You’ll appreciate the convenient location for all your needs.",
    "A quaint and cozy cottage, with a beautiful blend of vintage and modern touches. The furniture is comfortable and thoughtfully chosen, making the space feel like home. The location is perfect for those who want a peaceful retreat.",
    "This chic loft combines industrial elements with modern comfort. The space is open and bright, with stylish furniture and a functional layout. Its prime location offers easy access to local attractions and amenities.",
    "A beautifully decorated flat, with an airy and spacious feel. The furniture is modern and comfortable, with a design that maximizes the space. The central location allows you to explore the area with ease.",
    "This luxurious condo offers a sophisticated and elegant stay. The furniture is plush and high-end, with a layout designed for relaxation. The location is ideal for those who want to be close to everything.",
    "A cozy and well-designed apartment, with a focus on comfort and style. The furniture is carefully chosen to create a warm and inviting space. The location is perfect for enjoying everything the area has to offer.",
    "Experience a unique stay in this creatively designed loft. The space is filled with artistic touches, = the furniture to the decor. The location is unbeatable, with easy access to all the local hotspots.",
    "This modern duplex offers a spacious and open layout, with sleek furnishings and a contemporary design. The large windows bring in natural light, making the space feel even more expansive. The location provides easy access to nearby attractions.",
    "A charming and cozy suite, with a warm and inviting atmosphere. The furniture is comfortable and stylish, creating a space where you can relax. The location is ideal for exploring the local area.",
    "This stylish and modern flat is perfect for those who appreciate clean lines and contemporary design. The furniture is sleek and functional, with a layout that maximizes space. The location is central to everything you’ll need.",
    "A beautiful and spacious apartment, with elegant decor and comfortable furnishings. The layout is open and inviting, making it easy to unwind. The location is ideal for those who want to be close to local attractions.",
    "This trendy loft features a unique blend of industrial and modern design. The furniture is a mix of vintage and new, creating a one-of-a-kind space. The location is perfect for those who want to explore the area.",
    "A luxurious and spacious home, with high-end furnishings and elegant decor. The open-plan living area is perfect for entertaining, while the location offers easy access to all the best attractions.",
    "This cozy and stylish flat is perfect for a short or extended stay. The furniture is comfortable and modern, with a layout that makes the most of the space. The location is central, with everything you need nearby.",
    "A charming and elegant apartment, with tasteful decor and comfortable furniture. The layout is spacious and bright, making it a perfect retreat. The location offers convenient access to all the local amenities."
]

const highlights = [
    {
        main: 'Great communication',
        sub: '95% of recent guests gave the host a 5-star rating for communication.',
        imgUrl: '/src/assets/imgs/labels/omg.jpeg'
    },
    {
        main: 'Flexible cancellation policy',
        sub: 'Get a full refund if you cancel within 48 hours of booking.',
        imgUrl: '/src/assets/imgs/more/safe.svg'

    },
    {
        main: 'Superhost',
        sub: 'This host is highly rated for their outstanding hospitality.',
        imgUrl: '/src/assets/imgs/labels/luxe.jpeg'
    },
    {
        main: 'Self check-in',
        sub: 'Check yourself in with the smart lock for added convenience.',
        imgUrl: '/src/assets/imgs/labels/new.jpeg'

    },
    {
        main: 'Sparkling clean',
        sub: 'Recent guests said this place was sparkling clean.',
        imgUrl: '/src/assets/imgs/labels/design.jpeg'

    },
    {
        main: 'Fast wifi',
        sub: 'Guests often compliment the fast and reliable wifi.',
        imgUrl: '/src/assets/imgs/labels/golfing.jpeg'

    },
    {
        main: 'Highly rated location',
        sub: '100% of recent guests gave the location a 5-star rating.',
        imgUrl: '/src/assets/imgs/icons/star.svg'

    },
    {
        main: 'Well-equipped for long stays',
        sub: 'Guests who stayed a month or longer rated this place 5 stars.',
        imgUrl: '/src/assets/imgs/labels/skiing.jpeg'

    },
    {
        main: 'Safe and secure',
        sub: 'Guests appreciated the safety features and felt secure.',
        imgUrl: '/src/assets/imgs/labels/new.jpeg'

    },
    {
        main: 'Pet-friendly',
        sub: 'Previous guests loved bringing their pets to this home.',
        imgUrl: '/src/assets/imgs/labels/farms.jpeg'

    },
    {
        main: 'Dedicated workspace',
        sub: 'Perfect for remote work, with a comfortable desk and fast wifi.',
        imgUrl: '/src/assets/imgs/labels/creative-spaces.jpeg'

    },
    {
        main: 'Excellent amenities',
        sub: 'Guests praised the range of amenities offered here.',
        imgUrl: '/src/assets/imgs/labels/campers.jpeg'

    },
    {
        main: 'Great for families',
        sub: 'Families rated this home 5 stars for kid-friendly amenities.',
        imgUrl: '/src/assets/imgs/labels/play.jpeg'

    },
    {
        main: 'Great check-in experience',
        sub: '100% of recent guests gave the check-in process a 5-star rating.',
        imgUrl: '/src/assets/imgs/icons/star.svg'

    },
    {
        main: 'Stylish space',
        sub: 'Guests loved the stylish decor and comfortable layout.',
        imgUrl: '/src/assets/imgs/labels/design.jpeg'


    },
    {
        main: 'Free parking on premises',
        sub: 'This place offers free parking for added convenience.',
        imgUrl: '/src/assets/imgs/more/parking.svg'

    },
    {
        main: 'Comfortable beds',
        sub: 'Guests consistently mention the comfortable and cozy beds.',
        imgUrl: '/src/assets/imgs/labels/mansions.jpeg'

    },
    {
        main: 'Highly rated host',
        sub: 'This host has received great reviews for their hospitality.',
        imgUrl: '/src/assets/imgs/labels/omg.jpeg'

    },
    {
        main: 'Quiet neighborhood',
        sub: 'Guests praised the peaceful and quiet surroundings.',
        imgUrl: '/src/assets/imgs/labels/countryside.jpeg'

    },
    {
        main: 'Fully equipped kitchen',
        sub: 'Guests appreciated the well-stocked kitchen for home-cooked meals.',
        imgUrl: '/src/assets/imgs/labels/bed&breakfast.jpeg'

    },
    {
        main: 'Fast response time',
        sub: 'This host is known for responding quickly to guest inquiries.',
        imgUrl: '/src/assets/imgs/labels/omg.jpeg'

    },
    {
        main: 'Great value',
        sub: 'Recent guests rated this place 5 stars for value.',
        imgUrl: '/src/assets/imgs/labels/containers.jpeg'

    },
    {
        main: 'Thoughtful touches',
        sub: 'Guests loved the small details and thoughtful touches.',
        imgUrl: '/src/assets/imgs/labels/historical-homes.jpeg'

    },
    {
        main: 'Private entrance',
        sub: 'Enjoy the privacy of a separate entrance to the property.',
        imgUrl: '/src/assets/imgs/labels/mansons.jpeg'

    },
    {
        main: 'Close to public transport',
        sub: 'Guests found the location convenient for public transportation.',
        imgUrl: '/src/assets/imgs/labels/off-the-grid.jpeg'

    },
    {
        main: 'Walkable area',
        sub: 'Guests loved the walkability of the neighborhood.',
        imgUrl: '/src/assets/imgs/labels/top-cities.jpeg'

    },
    {
        main: 'Effortless check-in',
        sub: 'Check-in is easy with this hosts detailed',
        imgUrl: '/src/assets/imgs/labels/trending.jpeg'

    },
    {
        main: 'Luxury stay',
        sub: 'Exceptional and uniqe place',
        imgUrl: '/src/assets/imgs/labels/luxe.jpeg'

    }

]
const types = ['home', 'room', 'apartment', 'villa',]
const amenities = [
    { type: 'main', name: 'wifi', imgUrl: '/src/assets/imgs/amenities/no-wifi.svg' },
    { type: 'main', name: 'Air conditioning', imgUrl: '/src/assets/imgs/more/aircon.svg' },
    { type: 'main', name: 'kitchen', imgUrl: '/src/assets/imgs/more/kitchen1.svg' },
    { type: 'main', name: 'free parking', imgUrl: '/src/assets/imgs/more/parking.svg' },
    { type: 'main', name: 'Television', imgUrl: '/src/assets/imgs/Extra/tv.png' },
    { type: 'main', name: 'washing mashine', imgUrl: '/src/assets/imgs/more/washer.svg' },

    { type: 'bathroom', name: 'Hair dryer', imgUrl: '/src/assets/imgs/more/hair-dryer.svg' },
    { type: 'bathroom', name: 'Shampoo', imgUrl: '/src/assets/imgs/amenities/essentials.svg' },
    { type: 'bathroom', name: 'Conditioner', imgUrl: '/src/assets/imgs/amenities/essentials.svg' },
    { type: 'bathroom', name: 'Body soap', imgUrl: '/src/assets/imgs/more/body-saop.svg' },
    { type: 'bathroom', name: 'Hot water', imgUrl: '/src/assets/imgs/amenities/hot-water.svg' },
    { type: 'bathroom', name: 'Towels', imgUrl: '/src/assets/imgs/amenities/hot-water.svg' },
    { type: 'bathroom', name: 'Toilet paper', imgUrl: '/src/assets/imgs/amenities/hot-water.svg' },
    { type: 'bathroom', name: 'Bathrobe', imgUrl: '/src/assets/imgs/amenities/hot-water.svg' },
    { type: 'bathroom', name: 'Slippers', imgUrl: '/src/assets/imgs/amenities/hot-water.svg' },

    { type: 'heatingAndCooling', name: 'Air conditioning', imgUrl: '/src/assets/imgs/more/aircon.svg' },
    { type: 'heatingAndCooling', name: 'Central heating', imgUrl: '/src/assets/imgs/amenities/indoor-fireplace.svg' },
    { type: 'heatingAndCooling', name: 'Portable fans', imgUrl: '/src/assets/imgs/more/fan.svg' },
    { type: 'heatingAndCooling', name: 'Space heater', imgUrl: '/src/assets/imgs/more/hot.svg' },
    { type: 'heatingAndCooling', name: 'Dehumidifier', imgUrl: '/src/assets/imgs/amenities/indoor-fireplace.svg' },

    { type: 'kitchen', name: 'Refrigerator', imgUrl: '/src/assets/imgs/more/refrigirator.svg' },
    { type: 'kitchen', name: 'Microwave', imgUrl: '/src/assets/imgs/more/microwave.svg' },
    { type: 'kitchen', name: 'Oven', imgUrl: '/src/assets/imgs/more/oven.svg' },
    { type: 'kitchen', name: 'Stove', imgUrl: '/src/assets/imgs/more/oven.svg' },
    { type: 'kitchen', name: 'Dishwasher', imgUrl: '/src/assets/imgs/more/dishwasher.svg' },
    { type: 'kitchen', name: 'Coffee maker', imgUrl: '/src/assets/imgs/more/cofee.svg' },
    { type: 'kitchen', name: 'Toaster', imgUrl: '/src/assets/imgs/more/toast.svg' },
    { type: 'kitchen', name: 'Cooking basics', imgUrl: '/src/assets/imgs/amenities/breakfast.svg' },
    { type: 'kitchen', name: 'Dishes and silverware', imgUrl: '/src/assets/imgs/more/dishes.svg' },
    { type: 'kitchen', name: 'Wine glasses', imgUrl: '/src/assets/imgs/more/wine.svg' },

    { type: 'livingRoom', name: 'TV', imgUrl: '/src/assets/imgs/Extra/tv.png' },
    { type: 'livingRoom', name: 'Cable TV', imgUrl: '/src/assets/imgs/Extra/tv.png' },
    { type: 'livingRoom', name: 'Streaming services', imgUrl: '/src/assets/imgs/amenities/host-greets-you.svg' },
    { type: 'livingRoom', name: 'DVD player', imgUrl: '/src/assets/imgs/amenities/host-greets-you.svg' },
    { type: 'livingRoom', name: 'Sofa', imgUrl: '/src/assets/imgs/amenities/host-greets-you.svg' },
    { type: 'livingRoom', name: 'Coffee table', imgUrl: '/src/assets/imgs/more/cofee.svg' },
    { type: 'livingRoom', name: 'Books and reading material', imgUrl: '/src/assets/imgs/more/book.svg' },

    { type: 'outdoor', name: 'Patio or balcony', imgUrl: '/src/assets/imgs/amenities/patio.svg' },
    { type: 'outdoor', name: 'Garden', imgUrl: '/src/assets/imgs/amenities/backyard.svg' },
    { type: 'outdoor', name: 'BBQ grill', imgUrl: '/src/assets/imgs/amenities/bbq-gril.svg' },
    { type: 'outdoor', name: 'Outdoor furniture', imgUrl: '/src/assets/imgs/amenities/outdoor-dining.svg' },
    { type: 'outdoor', name: 'Fire pit', imgUrl: '/src/assets/imgs/amenities/fire-pit.svg' },
    { type: 'outdoor', name: 'Pool', imgUrl: '/src/assets/imgs/amenities/pool.svg' },
    { type: 'outdoor', name: 'Hot tub', imgUrl: '/src/assets/imgs/amenities/hot-tub.svg' },

    { type: 'safety', name: 'Smoke alarm', imgUrl: '/src/assets/imgs/amenities/smoke-alarm.svg' },
    { type: 'safety', name: 'Carbon monoxide alarm', imgUrl: '/src/assets/imgs/amenities/carbon-alarm.svg' },
    { type: 'safety', name: 'First aid kit', imgUrl: '/src/assets/imgs/amenities/first-aid-kit.svg' },
    { type: 'safety', name: 'Fire extinguisher', imgUrl: '/src/assets/imgs/amenities/fire-extinguisher.svg' },
    { type: 'safety', name: 'Lock on bedroom door', imgUrl: '/src/assets/imgs/amenities/queen-bed.svg' },

    { type: 'workspace', name: 'Desk', imgUrl: '/src/assets/imgs/amenities/workspace.svg' },
    { type: 'workspace', name: 'Laptop - friendly workspace', imgUrl: '/src/assets/imgs/amenities/workspace.svg' },
    { type: 'workspace', name: 'Office chair', imgUrl: '/src/assets/imgs/amenities/workspace.svg' },
    { type: 'workspace', name: 'Printer', imgUrl: '/src/assets/imgs/amenities/workspace.svg' },
    { type: 'workspace', name: 'High-speed internet', imgUrl: '/src/assets/imgs/amenities/workspace.svg' },

    { type: 'accessibility', name: 'Wheelchair accessible', imgUrl: '/src/assets/imgs/amenities/free-parking.svg' },
    { type: 'accessibility', name: 'Elevator', imgUrl: '/src/assets/imgs/amenities/free-parking.svg' },
    { type: 'accessibility', name: 'Accessible entrance', imgUrl: '/src/assets/imgs/amenities/free-parking.svg' },
    { type: 'accessibility', name: 'Accessible bathroom', imgUrl: '/src/assets/imgs/amenities/free-parking.svg' },
    { type: 'accessibility', name: 'Grab rails', imgUrl: '/src/assets/imgs/amenities/free-parking.svg' },

    { type: 'laundry', name: 'Washing machine', imgUrl: '/src/assets/imgs/more/washer.svg' },
    { type: 'laundry', name: 'Dryer', imgUrl: '/src/assets/imgs/more/dryer.svg' },
    { type: 'laundry', name: 'Iron', imgUrl: '/src/assets/imgs/more/iron.svg' },
    { type: 'laundry', name: 'Ironing board', imgUrl: '/src/assets/imgs/more/iron.svg' },
    { type: 'laundry', name: 'Laundry detergent', imgUrl: '/src/assets/imgs/more/washer.svg' },

    { type: 'familyFeatures', name: 'Crib', imgUrl: '/src/assets/imgs/Extra/wifi.png' },
    { type: 'familyFeatures', name: 'High chair', imgUrl: '/src/assets/imgs/Extra/wifi.png' },
    { type: 'familyFeatures', name: 'Child safety locks', imgUrl: '/src/assets/imgs/Extra/wifi.png' },
    { type: 'familyFeatures', name: 'Children’s books and toys', imgUrl: '/src/assets/imgs/more/book.svg' },
    { type: 'familyFeatures', name: 'Baby monitor', imgUrl: '/src/assets/imgs/Extra/wifi.png' },

    { type: 'petFriendly', name: 'Pets allowed', imgUrl: '/src/assets/imgs/amenities/no-kitchen.svg' },
    { type: 'petFriendly', name: 'Pet bowls', imgUrl: '/src/assets/imgs/amenities/no-kitchen.svg' },
    { type: 'petFriendly', name: 'Pet bed', imgUrl: '/src/assets/imgs/amenities/no-kitchen.svg' },
    { type: 'petFriendly', name: 'Fenced yard', imgUrl: '/src/assets/imgs/amenities/no-kitchen.svg' },

    // Parking
    { type: 'parking', name: 'Free parking on premises', imgUrl: '/src/assets/imgs/more/parking.svg' },
    { type: 'parking', name: 'Street parking', imgUrl: '/src/assets/imgs/amenities/paid-parking.svg' },
    { type: 'parking', name: 'Garage', imgUrl: '/src/assets/imgs/more/parking.svg' },
    { type: 'parking', name: 'EV charger', imgUrl: '/src/assets/imgs/more/charger.svg' },

    // Entertainment
    { type: 'entertainment', name: 'Games', imgUrl: '/src/assets/imgs/amenities/gym.svg' },
    { type: 'entertainment', name: 'Board games', imgUrl: '/src/assets/imgs/amenities/pool-table.svg' },
    { type: 'entertainment', name: 'Outdoor toys', imgUrl: '/src/assets/imgs/Extra/pets.png' },
    { type: 'entertainment', name: 'Books', imgUrl: '/src/assets/imgs/more/book.svg' },
    { type: 'entertainment', name: 'Music player', imgUrl: '/src/assets/imgs/amenities/piano.svg' }
]

const mainAmenities = [
    { name: 'wifi', imgUrl: wifiImg, isSelected: false },
    { name: 'Air conditioning', imgUrl: acImg, isSelected: false },
    { name: 'kitchen', imgUrl: kitchenImg, isSelected: false },
    { name: 'free parking', imgUrl: parkingImg, isSelected: false },
    { name: 'Television', imgUrl: tvImg, isSelected: false },
    { name: 'washing mashine', imgUrl: washingMashineImg, isSelected: false },
]

const labels = [
    { label: 'icons', img: iconsImg },
    { label: 'barns', img: barnsImg },
    { label: 'beach', img: beachImg },
    { label: 'beachfront', img: beachfrontImg },
    { label: 'bed&breakfast', img: bedAndBreakfastImg },
    { label: 'boats', img: boatsImg },
    { label: 'cabins', img: cabinsImg },
    { label: 'campers', img: campersImg },
    { label: 'camping', img: campingImg },
    { label: 'casas-particulares', img: casasParticularesImg },
    { label: 'castels', img: castelsImg },
    { label: 'caves', img: cavesImg },
    { label: 'chefs-kitchens', img: chefsKitchensImg },
    { label: 'containers', img: containersImg },
    { label: 'countryside', img: countrysideImg },
    { label: 'creative-spaces', img: creativeSpacesImg },
    { label: 'cycladic-homes', img: cycladicHomesImg },
    { label: 'dammusi', img: dammusiImg },
    { label: 'desert', img: desertImg },
    { label: 'design', img: designImg },
    { label: 'domes', img: domesImg },
    { label: 'earth-homes', img: earthHomesImg },
    { label: 'farms', img: farmsImg },
    { label: 'golfing', img: golfingImg },
    { label: 'grand-pianos', img: grandPianosImg },
    { label: 'hanoks', img: hanoksImg },
    { label: 'historical-homes', img: historicalHomesImg },
    { label: 'houseboats', img: houseboatsImg },
    { label: 'islands', img: islandsImg },
    { label: 'lakefront', img: lakefrontImg },
    { label: 'luxe', img: luxeImg },
    { label: 'mansions', img: mansionsImg },
    { label: 'minsus', img: minsusImg },
    { label: 'national-parks', img: nationalParksImg },
    { label: 'new', img: newImg },
    { label: 'off-the-grid', img: offTheGridImg },
    { label: 'omg', img: omgImg },
    { label: 'play', img: playImg },
    { label: 'riads', img: riadsImg },
    { label: 'rooms', img: roomsImg },
    { label: 'ryokans', img: ryokansImg },
    { label: 'shepards-huts', img: shepardsHutsImg },
    { label: 'ski-in-out', img: skiInOutImg },
    { label: 'skiing', img: skiingImg },
    { label: 'surfing', img: surfingImg },
    { label: 'tinyhomes', img: tinyHomesImg },
    { label: 'top-cities', img: topCitiesImg },
    { label: 'top-of-the-world', img: topOfTheWorldImg },
    { label: 'towers', img: towersImg },
    { label: 'treehouses', img: treehousesImg },
    { label: 'trending', img: trendingImg },
    { label: 'tropical', img: tropicalImg },
    { label: 'trulli', img: trulliImg },
    { label: 'vineyards', img: vineyardsImg },
    { label: 'windmills', img: windmillsImg },
    { label: 'yurts', img: yurtsImg }
]

function getRandomDateRange(startDate, endDate, minDays = 2, maxDays = 10) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Generate a random start date within the given range
    const randomStart = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

    // Set a random end date between the minimum and maximum range duration
    const duration = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
    const randomEnd = new Date(randomStart.getTime());
    randomEnd.setDate(randomStart.getDate() + duration);

    // Ensure the end date doesn't exceed the month's end date
    if (randomEnd > end) {
        randomEnd.setTime(end.getTime());
    }

    return {
        startDate: randomStart,
        endDate: randomEnd,
    };
}

function generateSequentialAvailabilityRanges() {
    const months = [
        { start: new Date('2024-09-01'), end: new Date('2024-09-30') },
        { start: new Date('2024-10-01'), end: new Date('2024-10-31') },
        { start: new Date('2024-11-01'), end: new Date('2024-11-30') },
        { start: new Date('2024-12-01'), end: new Date('2024-12-31') },
        { start: new Date('2025-01-01'), end: new Date('2025-01-31') },
    ];

    const availabilityRanges = [];

    months.forEach(month => {
        const numRanges = Math.min(Math.floor(Math.random() * 2) + 2, 10); // Generate 2-3 ranges per month

        let currentStart = new Date(month.start);

        for (let i = 0; i < numRanges; i++) {
            // Generate a random range starting from the current start date
            const newRange = getRandomDateRange(currentStart, month.end);

            // Push the generated range to the availabilityRanges array
            availabilityRanges.push(newRange);

            // Set the new start date for the next range to be after the current range's end date
            currentStart = new Date(newRange.endDate.getTime());
            currentStart.setDate(currentStart.getDate() + 1); // Ensure the next range starts at least 1 day later

            // Stop generating ranges if we've hit the end of the month
            if (currentStart >= month.end) {
                break;
            }

            // Limit to 10 total reservations across months
            if (availabilityRanges.length >= 10) {
                break;
            }
        }
    });

    return availabilityRanges;
}



const locations = [
    { country: 'Greece', city: 'Athens', lat: 37.98, lng: 23.73, img: greeceImg },
    { country: 'Spain', city: 'Madrid', lat: 40.42, lng: -3.70, img: spainImg },
    { country: 'Portugal', city: 'Lisbon', lat: 38.72, lng: -9.14, img: portugalImg },
    { country: 'Italy', city: 'Rome', lat: 41.90, lng: 12.49, img: italyImg },
    { country: 'USA', city: 'New York', lat: 40.71, lng: -74.01, img: usaImg },

    { country: 'Israel', city: 'Tel-Aviv', lat: 32.07, lng: 34.78 },
    { country: 'USA', city: 'Los Angeles', lat: 34.05, lng: -118.24 },
    { country: 'France', city: 'Paris', lat: 48.85, lng: 2.35 },
    { country: 'Germany', city: 'Berlin', lat: 52.52, lng: 13.40 },
    { country: 'UK', city: 'London', lat: 51.51, lng: -0.13 },
    { country: 'Brazil', city: 'Rio de Janeiro', lat: -22.91, lng: -43.20 },
    { country: 'Argentina', city: 'Buenos Aires', lat: -34.60, lng: -58.38 },
    { country: 'Japan', city: 'Tokyo', lat: 35.68, lng: 139.76 },
    { country: 'China', city: 'Beijing', lat: 39.90, lng: 116.40 },
    { country: 'Australia', city: 'Sydney', lat: -33.86, lng: 151.21 },
    { country: 'South Africa', city: 'Cape Town', lat: -33.92, lng: 18.42 },
    { country: 'India', city: 'Mumbai', lat: 19.08, lng: 72.88 },
    { country: 'Canada', city: 'Toronto', lat: 43.65, lng: -79.38 },
    { country: 'Mexico', city: 'Mexico City', lat: 19.43, lng: -99.13 },
    { country: 'Russia', city: 'Moscow', lat: 55.76, lng: 37.62 },
    { country: 'Turkey', city: 'Istanbul', lat: 41.01, lng: 28.97 },
    { country: 'Egypt', city: 'Cairo', lat: 30.06, lng: 31.25 },
    { country: 'Saudi Arabia', city: 'Riyadh', lat: 24.71, lng: 46.72 },
    { country: 'United Arab Emirates', city: 'Dubai', lat: 25.20, lng: 55.27 },
    { country: 'Thailand', city: 'Bangkok', lat: 13.76, lng: 100.53 },
    { country: 'South Korea', city: 'Seoul', lat: 37.56, lng: 126.97 },
    { country: 'Singapore', city: 'Singapore', lat: 1.35, lng: 103.82 },
    { country: 'Malaysia', city: 'Kuala Lumpur', lat: 3.14, lng: 101.69 },
    { country: 'Vietnam', city: 'Ho Chi Minh City', lat: 10.76, lng: 106.66 },
    { country: 'Philippines', city: 'Manila', lat: 14.60, lng: 120.99 },
    { country: 'New Zealand', city: 'Auckland', lat: -36.85, lng: 174.76 },
    { country: 'Chile', city: 'Santiago', lat: -33.46, lng: -70.65 },
    { country: 'Colombia', city: 'Bogotá', lat: 4.61, lng: -74.08 },
]


function getRandomDate() {
    const year = getRandomIntInclusive(new Date().getFullYear() - 10, new Date().getFullYear());
    const month = getRandomIntInclusive(1, 12);
    return `${year}-${month.toString().padStart(2, '0')}`;
}

const reviewsTxts = [
    'Great place! The views were stunning, and the house was very comfortable. Slightly remote, but perfect for relaxation.',
    'Wonderful stay! The hosts were amazing and the house had everything we needed. The location was a bit far from town but worth it for the peace and quiet.',
    'Fantastic property with beautiful views. The house was clean and cozy. The location was a little isolated, but that made it more enjoyable.',
    'Had a lovely time here. The house was well-equipped and the hosts were very welcoming. The distance to local amenities was minor compared to the tranquility.',
    'Perfect retreat! The property was charming and the hosts were friendly. It’s a bit far from everything, but the serenity and views were incredible.',
    'Excellent stay! The home was beautiful and the surroundings were peaceful. The location was a little off the beaten path, but that added to the experience.',
    'Really enjoyed our stay. The house was great and the views were amazing. The remote location was a small trade-off for the privacy and tranquility.',
    'Great property with everything we needed. The hosts were very helpful. The location was a bit far from the nearest town, but we enjoyed the peace and quiet.',
    'Wonderful experience! The house was clean and had beautiful decor. It was slightly remote, but that made for a very relaxing stay.',
    'Nice place with fantastic views. The house was well-maintained. The location was a bit secluded, but that made it more peaceful.',
    'Fantastic stay! The home was well-furnished and the hosts were very nice. It was a bit far from local attractions, but the peaceful setting was perfect.',
    'Enjoyed every minute of our stay. The house was cozy and the views were stunning. The distance to town was minor compared to the tranquility we experienced.',
    'Great rental! The house had all the amenities we needed and the hosts were very accommodating. The location was a bit remote but ideal for a quiet getaway.',
    'Very pleased with our stay. The property was beautiful and well-equipped. The slightly isolated location was perfect for a relaxing retreat.',
    'Had a great time! The house was lovely and the views were fantastic. The location was a little off the beaten path, but that just added to the charm.',
    'Perfect spot for a getaway. The house was clean and comfortable. The remote location was a minor drawback compared to the overall experience.',
    'Wonderful stay with beautiful views and a cozy house. The location was somewhat isolated, but it made for a very peaceful retreat.',
    'The house was great and the hosts were very friendly. It was a bit far from local attractions, but the peaceful surroundings made it worth it.',
    'Lovely property with excellent views. The house was comfortable and clean. The location was a little remote, but that only added to the relaxation.',
    'Fantastic property with stunning views. The house had everything we needed. The slightly isolated location was perfect for a quiet escape.',
    'The property was a delightful escape with stunning views and a cozy atmosphere. While the house was clean and well-equipped, the location was a bit far from local amenities. The hosts were incredibly welcoming and made sure we had everything we needed. The peace and quiet we experienced were well worth the minor inconvenience of the distance from town.',
    'We had a wonderful stay at this property. The house was stylish and comfortable, with beautiful views all around. The location was somewhat isolated, but that added to the serenity and provided the perfect environment for a relaxing vacation. The hosts were attentive and provided excellent local recommendations. The slight distance to nearby attractions was easily outweighed by the tranquility.',
    'Our experience at this property was fantastic. The house was clean, well-furnished, and offered magnificent views. The remote location provided a peaceful retreat, although it was a bit of a drive to get to local services. The hosts were very friendly and ensured our stay was enjoyable. The seclusion of the property was ideal for a quiet getaway, despite the distance.',
    'This property was a gem. The house was charming and had all the amenities we needed for a comfortable stay. The views were breathtaking, and the slightly remote location offered a peaceful escape from the hustle and bustle. Although it was a bit far from the nearest town, the tranquility and relaxation we found were worth the trade-off. The hosts were helpful and made us feel at home.',
    'We thoroughly enjoyed our time at this property. The house was well-maintained, clean, and had beautiful decor. The isolated location provided a serene environment, though it was a bit of a drive to local attractions. The hosts were very accommodating and made sure we had a pleasant stay. The peace and quiet we enjoyed made the remote location worthwhile.',
    'The stay at this property was very satisfying. The house was lovely, with all the necessary amenities and stunning views. The location was somewhat remote, but that contributed to the peaceful atmosphere. While it was a bit of a drive to get to local services, the overall experience was great. The hosts were friendly and ensured we had everything we needed.',
    'A wonderful retreat with a clean, cozy house and fantastic views. The location was a bit far from local amenities, but the seclusion added to the peaceful experience. The hosts were very helpful and provided excellent service. The distance to nearby attractions was a minor issue compared to the tranquility and relaxation we enjoyed at the property.',
    'This property provided an excellent getaway with beautiful scenery and a comfortable home. The slightly remote location was perfect for a quiet escape, though it took a bit longer to get to local services. The hosts were attentive and made sure our stay was enjoyable. The peace and serenity of the property more than made up for the distance from town.',
    'We had a great stay at this property. The house was well-kept and had amazing views. The remote location provided a peaceful retreat from everyday life, even though it was a bit far from the nearest town. The hosts were friendly and ensured that everything was perfect for our stay. The tranquility of the property was well worth the slight inconvenience of the distance.',
    'The property was a fantastic choice for our vacation. The house was clean, comfortable, and had wonderful views. The location was somewhat isolated, which contributed to a very relaxing stay. Although it was a bit far from local amenities, the hosts were very accommodating and provided excellent service. The peaceful setting made the remote location worthwhile.',
    // 'Not bad, but could use some improvements.',
    // 'The apartment was okay, but not what I expected.',
    // 'Amazing experience! Will definitely return.',
    // 'Very disappointed. The place was not as described.',
    // 'Perfect for a short stay, had everything I needed.',
    // 'Nice place but a bit noisy at night.',
    // 'Clean and comfortable. Worth the price.',
    // 'Great location, but the apartment was a bit small.'
]
const fullnames = [
    'James Green', 'Anna Smith', 'Robert Johnson', 'Emily Davis', 'Michael Brown',
    'Sarah Wilson', 'David Lee', 'Jessica Harris', 'Daniel Clark', 'Laura Lewis'
]

const womanImgs = generateSequentialImageUrls(20, 50, 'women');
const manImgs = generateSequentialImageUrls(20, 50, 'men');

function generateSequentialImageUrls(start, end, gender) {
    const urls = [];

    for (let i = start; i <= end; i++) {
        urls.push(`https://randomuser.me/api/portraits/${gender}/${i}.jpg`);
    }
    return urls;
}

let currentIndexFemale = 0;
let currentIndexMale = 0;
function getNextImageUrl(isFemale) {
    if (isFemale) {
        if (currentIndexFemale >= womanImgs.length) {
            currentIndexFemale = 0;
        }
        return womanImgs[currentIndexFemale++];
    } else {
        if (currentIndexMale >= manImgs.length) {
            currentIndexMale = 0;
        }
        return manImgs[currentIndexMale++];
    }
}

let currentIndexFemaleNames = 0;
let currentIndexMaleNames = 0;

function getNextName(isFemale) {
    if (isFemale) {
        if (currentIndexFemaleNames >= womenNames.length) {
            currentIndexFemaleNames = 0;
        }
        return womenNames[currentIndexFemaleNames++];
    } else {
        if (currentIndexMaleNames >= menNames.length) {
            currentIndexMaleNames = 0;
        }
        return menNames[currentIndexMaleNames++];
    }
}

const womenNames = [
    'Anna Smith', 'Emily Davis', 'Sarah Wilson', 'Jessica Harris', 'Laura Lewis',
    'Olivia Martinez', 'Sophia Taylor', 'Isabella White', 'Mia Thompson', 'Charlotte King',
    'Amelia Scott', 'Evelyn Young', 'Abigail Adams', 'Ella Mitchell', 'Ava Perez',
    'Madison Campbell', 'Harper Roberts', 'Grace Lewis', 'Chloe Turner', 'Avery Rodriguez'
]

const menNames = [
    'James Green', 'Robert Johnson', 'Michael Brown', 'David Lee', 'Daniel Clark',
    'William Anderson', 'Liam Walker', 'Benjamin Hall', 'Lucas Allen', 'Henry Baker',
    'Alexander Gonzalez', 'Sebastian Lopez', 'Jackson Hill', 'Mateo Wright', 'Elijah Martin',
    'Owen Evans', 'Gabriel Robinson', 'Carter Torres', 'Jayden Reed', 'Dylan Rivera'
]

const ratingCategoriesList = [
    'cleanliness',
    'accuracy',
    'checkIn',
    'communication',
    'location',
    'value'
]

function generateRandomRatingCategories(categories) {
    const updatedRatings = {}
    categories.forEach(category => {
        updatedRatings[category] = getRandomIntInclusive(4, 5)
    })
    return updatedRatings
}

function calculateOverallRate(ratingCategories) {
    const values = Object.values(ratingCategories)
    const count4 = values.filter(value => value === 4).length
    const count5 = values.filter(value => value === 5).length
    return count5 > count4 ? 5 : 4
}


const reviews = Array.from({ length: 10 }, () => {
    const isFemale = Math.random() < 0.5
    const fullname = getNextName(isFemale)
    const imgUrl = getNextImageUrl(isFemale)
    const randomLocation = getRandomItems(locations, 1)
    const ratingCategories = generateRandomRatingCategories(ratingCategoriesList)
    const overallRate = calculateOverallRate(ratingCategories)

    return {
        _id: makeId(),
        txt: getRandomItems(reviewsTxts, 1),
        date: getRandomDate(),
        rate: overallRate,
        ratingCategories,
        by: {
            _id: makeId(),
            fullname: fullname,
            imgUrl: imgUrl,
            livingIn: `${randomLocation.city}, ${randomLocation.country}`,
            daysStayed: getRandomInt(1, 5),
        }
    }
})
console.log(reviews.ratingCategories)


const houseRules = [
    //  Checking In and Checking Out
    { txt: "Check-in time starts at 3:00 PM.", type: "checking in/checking out" },
    { txt: "Check-out time is by 11:00 AM.", type: "checking in/checking out" },
    { txt: "Instructions for key pickup are provided.", type: "checking in/checking out" },
    { txt: "Dispose of trash in the appropriate bins.", type: "checking in/checking out" },
    { txt: "Return all keys to the designated spot.", type: "checking in/checking out" },
    { txt: "Ensure all windows are locked before leaving.", type: "checking in/checking out" },
    { txt: "Leave used towels in the bathroom.", type: "checking in/checking out" },

    // During Your Stay
    { txt: "No smoking inside. Use designated area outside.", type: "during your stay" },
    { txt: "No pets allowed without prior approval.", type: "during your stay" },
    { txt: "Quiet hours are = 10:00 PM.", type: "during your stay" },
    { txt: "Parties and events are not allowed.", type: "during your stay" },
    { txt: "Report damages immediately for prompt assistance.", type: "during your stay" },
    { txt: "Only registered guests are allowed inside.", type: "during your stay" },
    { txt: "Use coasters to protect furniture surfaces.", type: "during your stay" },
    { txt: "Turn off lights and appliances when leaving.", type: "during your stay" }
]

const safetyProperty = [
    // Safety Considerations
    { txt: "In emergencies, follow the evacuation plan.", type: "Safety considerations" },
    { txt: "Do not obstruct fire exits at any time.", type: "Safety considerations" },
    { txt: "Secure all windows and doors when leaving.", type: "Safety considerations" },
    { txt: "Avoid using candles inside the property.", type: "Safety considerations" },
    { txt: "Do not overload electrical outlets and strips.", type: "Safety considerations" },
    { txt: "Keep hazardous materials out of children's reach.", type: "Safety considerations" },
    { txt: "Report any plumbing issues immediately.", type: "Safety considerations" },
    { txt: "Keep stairs and walkways free of obstacles.", type: "Safety considerations" },

    // Safety Devices
    { txt: "Smoke detectors are installed in all areas.", type: "Safety devices" },
    { txt: "Carbon monoxide detector is near sleeping areas.", type: "Safety devices" },
    { txt: "Fire extinguishers are located near the entrance.", type: "Safety devices" },
    { txt: "First aid kits are available in the kitchen.", type: "Safety devices" },
    { txt: "A fire blanket is located in the kitchen.", type: "Safety devices" },
    { txt: "The alarm system instructions are provided.", type: "Safety devices" },
    { txt: "Security cameras are installed at the exterior.", type: "Safety devices" },

    // Property Info
    { txt: "Alarm system instructions are provided.", type: "Property info" },
    { txt: "The surveillance system monitors the entrance.", type: "Property info" },
    { txt: "Water heater is set to safe temperature.", type: "Property info" },
    { txt: "Heating and cooling systems are automated.", type: "Property info" },
    { txt: "Use the safe to secure valuables.", type: "Property info" },
    { txt: "Smoking allowed in designated outdoor areas.", type: "Property info" },
    { txt: "Ensure all doors and windows are locked.", type: "Property info" },
    { txt: "Guests are responsible for hot tub safety.", type: "Property info" },
    { txt: "Fire sprinklers are in all rooms.", type: "Property info" }
]

const cancellationPolicy = [
    { txt: "Full refund if canceled within 48 hours.", type: "Cancellation Policy" },
    { txt: "50% refund if canceled 7-14 days before.", type: "Cancellation Policy" },
    { txt: "No refund if canceled within 7 days.", type: "Cancellation Policy" },
    { txt: "Charged for entire stay if canceled after check-in.", type: "Cancellation Policy" },
    { txt: "Check listing details for specific policies.", type: "Cancellation Policy" },
    { txt: "Full refund for force majeure events.", type: "Cancellation Policy" },
    { txt: "Some bookings may be non-refundable.", type: "Cancellation Policy" },
    { txt: "Full refund if canceled 30 days before long-term stay.", type: "Cancellation Policy" },
    { txt: "50% refund if canceled 15-30 days before long-term stay.", type: "Cancellation Policy" },
    { txt: "No refund if canceled less than 15 days before.", type: "Cancellation Policy" },
    { txt: "Refunds may take up to 10 business days.", type: "Cancellation Policy" },
    { txt: "Service fees are non-refundable.", type: "Cancellation Policy" },
    { txt: "Change booking dates within 48 hours.", type: "Cancellation Policy" },
    { txt: "Additional fees for changes after 48 hours.", type: "Cancellation Policy" },
    { txt: "No refund for cancellations within 24 hours before check-in.", type: "Cancellation Policy" }
]