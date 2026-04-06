const fs = require('fs');

const products = [
  {
    name: "Spintly AURA",
    price: 10500,
    features: [
      "Access control reader blending elegant aesthetics with high security.",
      "Effortless access through BLE, NFC, and keypad authentication.",
      "Sleek glass finish with a glowing light indicator."
    ],
    image: "/images/spintly_aura.png",
    stock: 10,
    category: "Hardware",
    description: "Sleek and advanced access control reader."
  },
  {
    name: "Spintly KREO",
    price: 13500,
    features: [
      "Advanced access control reader with IP-65 rugged rating.",
      "Seamless door unlocking using BLE, NFC, and Keypad.",
      "Highest level of security and reliability for critical entry points."
    ],
    image: "/images/spintly_kreo.png",
    stock: 5,
    category: "Hardware",
    description: "Advanced rugged access control reader."
  },
  {
    name: "Spintly Face Recognition",
    price: 25000,
    features: [
      "Biometric access control via advanced face recognition.",
      "High-speed detection with an elegant dark-mode screen interface.",
      "Wall-mounted smart device integrating seamlessly into professional spaces."
    ],
    image: "/images/spintly_face_recognition.png",
    stock: 5,
    category: "Biometric",
    description: "High-speed modern face recognition device."
  }
];

const dbPath = 'database.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

products.forEach(p => {
  p.id = Date.now().toString() + Math.floor(Math.random()*1000);
  db.products.push(p);
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

async function pushToApi() {
  for(let p of products) {
     try {
       const res = await fetch('http://localhost:3000/api/products', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(p)
       });
       const json = await res.json();
       console.log('API response:', json);
     } catch (e) {
       console.log('Failed hitting API, relies on local DB:', e.message);
     }
  }
}

pushToApi();
