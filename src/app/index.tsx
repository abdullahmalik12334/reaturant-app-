import { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const API_URL = "http://10.0.12.181:5001";

/*
  EMBERFORK

  ----------
  Frontend-only React Native + TypeScript restaurant app.
  No backend, API, database, or extra package is required.

  Paste this complete file into:
  src/app/index.tsx
*/
const [authToken, setAuthToken] = useState("");
type Screen =
  | "welcome"
  | "login"
  | "signup"
  | "home"
  | "menu"
  | "details"
  | "favorites"
  | "cart"
  | "booking"
  | "orders"
  | "tracking"
  | "profile"
  | "editProfile"
  | "manager";

type ThemeKey = "sand" | "mist" | "sage" | "lavender" | "night";

type FoodItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  tag?: string;
};

type CartItem = FoodItem & {
  quantity: number;
};

type Order = {
  id: string;
  date: string;
  total: number;
  status: "Confirmed" | "Preparing" | "Out for Delivery" | "Delivered";
  items: CartItem[];
};

type DiningTable = {
  id: number;
  name: string;
  seats: number;
  image: string;
};

const HERO_IMAGES = {
  welcome:
    "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=1400",
  home:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400",
  booking:
    "https://images.unsplash.com/photo-1511081692775-05d0f180a065?w=1200",
  profile:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500",
  tracking:
    "https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhY2tpbmdyZXN0YXVyYW50fGVufDB8fDB8fHww",
};

const TABLE_IMAGES = {
  1: "https://images.unsplash.com/photo-1761515397115-606a6897eb44?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdpbmRvdyUyMGJvb3RoJTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
  2: "https://images.unsplash.com/photo-1782983595358-d8f8d59ae442?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8R2FyZGVuJTIwVmlldyUyMHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
  3: "https://plus.unsplash.com/premium_photo-1661953124283-76d0a8436b87?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
  4: "https://plus.unsplash.com/premium_photo-1661962360690-e91cc0df88f1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8THV4dXJ5JTIwTG91bmdlJTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D0",
  5: "https://plus.unsplash.com/premium_photo-1661371461659-606701661da7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZhbWlseSUyMHRhYmxlJTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
  6: "https://images.unsplash.com/photo-1734027851931-6e06637151ed?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2VsZWJyYXRpb24lMjB0YWJsZSUyMHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
};
const FOOD: FoodItem[] = [
  {
    id: "f1",
    name: "cheeseburger",
    category: "Burgers",
    price: 790,
    image:
      "https://images.unsplash.com/photo-1600688640154-9619e002df30?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fENoZWVzZWJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D",
    description:
      "Char-grilled beef, smoked cheddar, caramelized onion and house sauce.",
    tag: "Chef's Pick",
  },
  {
    id: "f2",
    name: "Tacos",
    category: "wraps",
    price: 720,
    image:
      "https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VGFjb3N8ZW58MHx8MHx8fDA%3D",
    description:
      "Crunchy chicken fillet, lettuce, pickles and signature pepper mayo.",
    tag: "Popular",
  },
  {
    id: "f3",
    name: "Truffle Melt",
    category: "sandwich",
    price: 860,
    image:
      "https://plus.unsplash.com/premium_photo-1739906393226-9978e7943b00?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8VHJ1ZmZsZSUyME1lbHR8ZW58MHx8MHx8fDA%3D",
    description:
      "Double patty, truffle aioli, grilled mushrooms and aged cheese.",
  },
  {
    id: "f4",
    name: "Fire Wrap",
    category: "Wraps",
    price: 560,
    image:
      "https://images.unsplash.com/photo-1671572579845-52270341950f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpY2tlbiUyMHdyYXB8ZW58MHx8MHx8fDA%3D",
    description:
      "Spiced chicken, crunchy slaw, herb yogurt and warm flatbread.",
  },
  {
    id: "f5",
    name: "Garden Crunch Wrap",
    category: "Wraps",
    price: 490,
    image:
      "https://images.unsplash.com/photo-1666493243525-cd8ad9d26a86?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEdhcmRlbiUyMENydW5jaCUyMFdyYXB8ZW58MHx8MHx8fDA%3D",
    description:
      "Grilled vegetables, avocado cream, tomato salsa and crisp lettuce.",
  },
  {
    id: "f6",
    name: "Neapolitan Pizza",
    category: "Pizza",
    price: 980,
    image:
      "https://images.unsplash.com/photo-1651978595416-9956a5fb8f7a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fE5lYXBvbGl0YW4lMjBQaXp6YXxlbnwwfHwwfHx8MA%3D%3D",
    description:
      "Stone-baked dough, tomato passata, mozzarella and fresh basil.",
    tag: "Classic",
  },
  {
    id: "f7",
    name: "Tikka Fire Pizza",
    category: "Pizza",
    price: 1180,
    image:
      "https://media.istockphoto.com/id/1291580648/photo/pizza.webp?a=1&b=1&s=612x612&w=0&k=20&c=XrCgDy2qiO38rTt_E5HP_qGBKra6xfadn3E5BJQMFjA=",
    description:
      "Creamy tikka chicken, peppers, onions and a smoky cheese blend.",
    tag: "Spicy",
  },
  {
    id: "f8",
    name: "Pepperoni Forge",
    category: "Pizza",
    price: 1260,
    image:
      "https://plus.unsplash.com/premium_photo-1667682942099-4d38cc8cc091?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8UGVwcGVyb25pJTIwRm9yZ2V8ZW58MHx8MHx8fDA%3D",
    description:
      "Slow-roasted tomato sauce, mozzarella and crisp pepperoni.",
  },
  {
    id: "f9",
    name: "Creamy Alfredo",
    category: "Pasta",
    price: 860,
    image:
      "https://images.unsplash.com/photo-1561001070-ce11eea271b5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fENyZWFteSUyMEFsZnJlZG98ZW58MHx8MHx8fDA%3D",
    description:
      "Fettuccine, parmesan cream, roasted garlic and cracked pepper.",
    tag: "Comfort",
  },
  {
    id: "f10",
    name: "Pesto Chicken Rigatoni",
    category: "Pasta",
    price: 930,
    image:
      "https://media.istockphoto.com/id/2239793766/photo/boiled-spgaghetti-with-grilled-chicken-breast-on-plate.webp?a=1&b=1&s=612x612&w=0&k=20&c=Z2sN8F2ZoqEYxoYijvsz18lJfelRhT7C1NE6vkrsR-w=",
    description:
      "Rigatoni, basil pesto, grilled chicken and roasted cherry tomatoes.",
  },
  {
    id: "f11",
    name: "Spicy Arrabbiata",
    category: "Pasta",
    price: 760,
    image:
      "https://images.unsplash.com/photo-1625211069951-f9729ceae8b8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U3BpY3klMjBBcnJhYmJpYXRhfGVufDB8fDB8fHww",
    description:
      "Penne tossed in spicy tomato sauce, herbs and parmesan.",
  },
  {
    id: "f12",
    name: "Butter Chicken Bowl",
    category: "Desi",
    price: 980,
    image:
      "https://media.istockphoto.com/id/1170729895/photo/indian-butter-chicken-horizontal-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=QLus6mm40xIC73B-JDpRjVthYjFQnMbBD5wpLACefkM=",
    description:
      "Tender chicken in buttery tomato gravy with rice and fresh naan.",
    tag: "Best Seller",
  },
  {
    id: "f13",
    name: "Chicken Karahi",
    category: "Desi",
    price: 1280,
    image:
      "https://plus.unsplash.com/premium_photo-1669742927923-32d9ee86887c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fENoaWNrZW4lMjBLYXJhaGl8ZW58MHx8MHx8fDA%3D",
    description:
      "Wok-fired chicken, tomato, ginger, green chili and coriander.",
  },
  {
    id: "f14",
    name: "Saffron Biryani",
    category: "Desi",
    price: 590,
    image:
      "https://media.istockphoto.com/id/2260264252/photo/image-of-indian-takeaway-chicken-dum-biryani-in-terracotta-clay-pot-handi-served-with-flaky.webp?a=1&b=1&s=612x612&w=0&k=20&c=Vr0WmX6JNooe03oBx_ZN9D5OMmmoaMMTUjUEZ1f26T4=",
    description:
      "Fragrant basmati rice, spiced chicken, saffron and crispy onion.",
  },
  {
    id: "f15",
    name: "kebab Seekh Platter",
    category: "Grill",
    price: 980,
    image:
      "https://images.unsplash.com/photo-1781332143834-19a40f746cd9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2Vla2glMjBLZWJhYiUyMFBsYXR0ZXJ8ZW58MHx8MHx8fDA%3D",
    description:
      "Juicy seekh kebabs with mint chutney, onion salad and naan.",
  },
  {
    id: "f16",
    name: "Miso Glazed Wings",
    category: "Starters",
    price: 640,
    image:
      "https://media.istockphoto.com/id/2223360800/photo/chicken-wings-in-teriyaki-sauce-with-sesame-and-onion-asian-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=kIiOnv0HEUd-G2qmWKx9mB8zMKu1r_iVVgoLsOLPKF4=",
    description:
      "Crispy wings coated in a sweet-spicy miso glaze and sesame.",
    tag: "New",
  },
  {
    id: "f17",
    name: "Loaded Parmesan Fries",
    category: "Sides",
    price: 460,
    image:
      "https://plus.unsplash.com/premium_photo-1672498329467-b27e2a97d29b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TG9hZGVkJTIwUGFybWVzYW4lMjBGcmllc3xlbnwwfHwwfHx8MA%3D%3D",
    description:
      "Crisp fries, parmesan, herbs and smoked garlic dip.",
  },
  {
    id: "f18",
    name: "Citrus Mint Cooler",
    category: "Drinks",
    price: 390,
    image:
      "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2l0cnVzJTIwTWludCUyMENvb2xlcnxlbnwwfHwwfHx8MA%3D%3D",
    description:
      "Fresh lime, mint, citrus syrup and sparkling water.",
  },
  {
    id: "f19",
    name: "Berry Basil Spritz",
    category: "Drinks",
    price: 450,
    image:
      "https://plus.unsplash.com/premium_photo-1721315652102-dbafc89ec437?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmVycnklMjBCYXNpbCUyMFNwcml0enxlbnwwfHwwfHx8MA%3D%3D",
    description:
      "Mixed berries, basil, lemon and chilled sparkling soda.",
  },
  {
    id: "f20",
    name: "Dark Chocolate Slice",
    category: "Desserts",
    price: 520,
    image:
      "https://images.unsplash.com/photo-1768260732302-12822bd6427b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fERhcmslMjBDaG9jb2xhdGUlMjBTbGljZXxlbnwwfHwwfHx8MA%3D%3D",
    description:
      "Rich chocolate sponge layered with dark ganache and cocoa cream.",
  },
  {
    id: "f21",
    name: "Lotus cake",
    category: "Desserts",
    price: 580,
    image:
      "https://media.istockphoto.com/id/1297193634/photo/caramel-biscoff-cheese-cake-with-slice.webp?a=1&b=1&s=612x612&w=0&k=20&c=bL3MojzrV22gilua_SbZFiLY5TEN_eqmwJU4lZSWsGk=",
    description:
      "Silky cheesecake with biscuit crumb and caramel drizzle.",
  },
  {
    id: "f22",
    name: " Caramel Sundae",
    category: "Desserts",
    price: 430,
    image:
      "https://plus.unsplash.com/premium_photo-1664391744509-2a96af429dc4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2FyYW1lbCUyMFN1bmRhZXxlbnwwfHwwfHx8MA%3D%3D",
    description:
      "Vanilla ice cream, salted caramel, brownie crumbs and nuts.",
  },
  {
    id: "f23",
    name: "minetta tavern Burger ",
    category: "Burgers",
    price: 3000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUweXONl20_Be_f7fJrh_JAO1uI6KJK9ftRNbdgQwm9g&s=10",
    description:
      "• Made with a custom dry-aged beef blend from Pat LaFrieda.",
  },
];
const CATEGORIES = [
  { name: "All", icon: "🍽️" },
  { name: "Burgers", icon: "🍔" },
  { name: "Pizza", icon: "🍕" },
  { name: "Pasta", icon: "🍝" },
  { name: "Desi", icon: "🍛" },
  { name: "Grill", icon: "🔥" },
  { name: "Drinks", icon: "🥤" },
  { name: "Desserts", icon: "🍰" },
];



const TABLES: DiningTable[] = [
  { id: 1, name: "Window Booth", seats: 2, image: TABLE_IMAGES[1] },
  { id: 2, name: "Garden Table", seats: 2, image: TABLE_IMAGES[2] },
  { id: 3, name: "Corner Table", seats: 4, image: TABLE_IMAGES[3] },
  { id: 4, name: "Lounge Table", seats: 4, image: TABLE_IMAGES[4] },
  { id: 5, name: "Family Table", seats: 6, image: TABLE_IMAGES[5] },
  { id: 6, name: "Celebration Table", seats: 8, image: TABLE_IMAGES[6] },
];

const THEMES: Record<
  ThemeKey,
  { background: string; surface: string; card: string; text: string; muted: string }
> = {
  sand: {
    background: "#494f51ff",
    surface: "#060101ff",
    card: "#021a24ff",
    text: "#e5e5e5ff",
    muted: "#dadadaff",
  },
  mist: {
    background: "#d7d7d7ff",
    surface: "#b1b1b1ff",
    card: "#FBFEFF",
    text: "#173042",
    muted: "#71818A",
  },
  sage: {
    background: "#EFF5EF",
    surface: "#FFFFFF",
    card: "#FCFFFC",
    text: "#20352C",
    muted: "#6D7B74",
  },
  lavender: {
    background: "#F3F0F8",
    surface: "#FFFFFF",
    card: "#FFFDFF",
    text: "#2D2440",
    muted: "#766F81",
  },
  night: {
    background: "#121821",
    surface: "#19232E",
    card: "#1E2A35",
    text: "#F6F7F8",
    muted: "#A8B1BB",
  },
};

const formatRs = (value: number) => `Rs. ${value.toLocaleString()}`;

const pad2 = (n: number) => n.toString().padStart(2, "0");

const makeOrderId = () =>
  `EF-${new Date().getFullYear()}${pad2(new Date().getMonth() + 1)}${pad2(
    new Date().getDate(),
  )}-${Math.floor(100 + Math.random() * 900)}`;

const todayLabel = () => new Date().toLocaleDateString();

const getDays = () => [
  "Sat 10",
  "Sun 11",
  "Mon 12",
  "Tue 13",
  "Wed 14",
  "Thu 15",
  "Fri 16",
];

function ThemeStrip({
  value,
  onChange,
}: {
  value: ThemeKey;
  onChange: (value: ThemeKey) => void;
}) {
const choices: { key: ThemeKey; label: string; dot: string }[] = [
  { key: "sand", label: "Warm Cream", dot: "#E8C39E" },
  { key: "mist", label: "Soft Ocean", dot: "#7FA9B8" },
  { key: "sage", label: "Fresh Sage", dot: "#829F83" },
  { key: "lavender", label: "Soft Lilac", dot: "#A28CB8" },
  { key: "night", label: "Deep Night", dot: "#26384A" },
];

  return (
    <View style={styles.themeStrip}>
      <Text style={styles.themeTitle}>Background</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {choices.map((item) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => onChange(item.key)}
            style={[
              styles.themeChip,
              value === item.key && styles.themeChipActive,
            ]}
          >
            <View style={[styles.themeDot, { backgroundColor: item.dot }]} />
            <Text
              style={[
                styles.themeChipText,
                value === item.key && styles.themeChipTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

function BottomNav({
  screen,
  setScreen,
  cartCount,
  theme,
}: {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  cartCount: number;
  theme: ThemeKey;
}) {
  const colors = THEMES[theme];

  const item = (target: Screen, label: string, icon: string) => (
    <TouchableOpacity
      key={target}
      style={styles.bottomItem}
      onPress={() => setScreen(target)}
    >
      <Text
        style={[
          styles.bottomIcon,
          { color: screen === target ? "#EF8354" : colors.muted },
        ]}
      >
        {icon}
      </Text>
      <Text
        style={[
          styles.bottomText,
          { color: screen === target ? "#EF8354" : colors.muted },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.bottomBar,
        {
          backgroundColor: colors.surface,
          borderTopColor: theme === "night" ? "#263340" : "#cbcbcbff",
        },
      ]}
    >
      {item("home", "Home", "⌂︎")}
      {item("menu", "Menu", "✦")}
      {item("favorites", "Saved", "♥")}
      {item("booking", "Book", "▣")}
      <TouchableOpacity
        style={styles.bottomItem}
        onPress={() => setScreen("cart")}
      >
        <View>
          <Text
            style={[
              styles.bottomIcon,
              { color: screen === "cart" ? "#c66b44a6" : colors.muted },
            ]}
          >
            🛍
          </Text>
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </View>
        <Text
          style={[
            styles.bottomText,
            { color: screen === "cart" ? "#EF8354" : colors.muted },
          ]}
        >
          Cart
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function SectionHeading({
  title,
  action,
  onPress,
  colors,
}: {
  title: string;
  action?: string;
  onPress?: () => void;
  colors: (typeof THEMES)[ThemeKey];
}) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={[styles.sectionHeadingTitle, { color: colors.text }]}>
        {title}
      </Text>
      {action && (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.sectionAction}>{action}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function ProductCard({
  item,
  colors,
  favorite,
  onFavorite,
  onAdd,
  onOpen,
}: {
  item: FoodItem;
  colors: (typeof THEMES)[ThemeKey];
  favorite: boolean;
  onFavorite: () => void;
  onAdd: () => void;
  onOpen: () => void;
}) {
  return (
    <View style={[styles.productCard, { backgroundColor: colors.card }]}>
      <View style={styles.productImageWrap}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <TouchableOpacity
          style={styles.productHeart}
          onPress={onFavorite}
        >
          <Text style={styles.productHeartText}>{favorite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
        {item.tag && (
          <View style={styles.productTag}>
            <Text style={styles.productTagText}>{item.tag}</Text>
          </View>
        )}
      </View>

      <View style={styles.productBody}>
        <TouchableOpacity onPress={onOpen} activeOpacity={0.8}>
          <Text
            numberOfLines={1}
            style={[styles.productName, { color: colors.text }]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
        <Text
          numberOfLines={1}
          style={[styles.productCategory, { color: colors.muted }]}
        >
          {item.category}
        </Text>

        <View style={styles.productBottom}>
          <Text style={styles.productPrice}>{formatRs(item.price)}</Text>
          <TouchableOpacity
            style={styles.quickAdd}
            onPress={onAdd}
          >
            <Text style={styles.quickAddText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function Index() {
  const [authToken, setAuthToken] = useState("");
  const [screen, setScreen] = useState<Screen>("welcome");
  const [themeKey, setThemeKey] = useState<ThemeKey>("sand");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [detailQty, setDetailQty] = useState(1);

  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  const [orders, setOrders] = useState<Order[]>([]);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);

  const [bookingDate, setBookingDate] = useState("Sat 10");
  const [bookingTime, setBookingTime] = useState("7:00 PM");
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [guestCount, setGuestCount] = useState("2");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const colors = THEMES[themeKey];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = Math.round((subtotal * discountPercent) / 100);
  const grandTotal = subtotal - discount;

  const trackingOrder = orders.find((order) => order.id === trackingOrderId);
  const latestOrder = orders[0];
const filteredFood = FOOD.filter((item) => {
  const q = search.trim().toLowerCase();
  const categoryMatch =
    selectedCategory === "All" || item.category === selectedCategory;
  const searchMatch =
    !q ||
    item.name.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q);

  return categoryMatch && searchMatch;
});
  const favoriteFood = FOOD.filter((item) => favorites.includes(item.id));

  const toggleFavorite = (id: string) => {
    setFavorites((old) =>
      old.includes(id) ? old.filter((x) => x !== id) : [...old, id],
    );
  };

  const addToCart = (food: FoodItem, quantity = 1) => {
    setCart((old) => {
      const existing = old.find((item) => item.id === food.id);

      if (existing) {
        return old.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...old, { ...food, quantity }];
    });
  };

  const increaseItem = (id: string) => {
    setCart((old) =>
      old.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseItem = (id: string) => {
    setCart((old) =>
      old
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const openDetails = (item: FoodItem) => {
    setSelectedFood(item);
    setDetailQty(1);
    setScreen("details");
  };

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "EMBER10") {
      setDiscountPercent(10);
      Alert.alert("Promo applied", "10% discount added to your order.");
    } else {
      setDiscountPercent(0);
      Alert.alert("Invalid code", "Try EMBER10 for a demo discount.");
    }
  };

  const placeOrder = () => {
    if (!cart.length) {
      Alert.alert("Cart is empty", "Add a few dishes before checking out.");
      return;
    }

    const order: Order = {
      id: makeOrderId(),
      date: todayLabel(),
      total: grandTotal,
      status: "Confirmed",
      items: cart,
    };

    setOrders((old) => [order, ...old]);
    setTrackingOrderId(order.id);
    setCart([]);
    setPromoCode("");
    setDiscountPercent(0);

    Alert.alert("Order confirmed", "Your EmberFork order has been placed.", [
      {
        text: "Track order",
        onPress: () => setScreen("tracking"),
      },
      {
        text: "Home",
        onPress: () => setScreen("home"),
      },
    ]);
  };

  const confirmBooking = () => {
    if (!selectedTable) {
      Alert.alert("Choose a table", "Please select a table before confirming.");
      return;
    }

    setBookingConfirmed(true);

    Alert.alert(
      "Booking confirmed",
      `Table ${selectedTable} is booked for ${guestCount} guests on ${bookingDate} at ${bookingTime}.`,
    );
  };

const signIn = async () => {
  if (!loginEmail.trim() || !loginPassword) {
    Alert.alert("Missing information", "Enter your email and password.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginEmail.trim().toLowerCase(),
        password: loginPassword,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      Alert.alert(
        "Login failed",
        data.message || "Please check your email and password."
      );
      return;
    }

    setAuthToken(data.token || "");
    setProfileName(data.user?.name || "Guest");
    setProfileEmail(data.user?.email || loginEmail.trim());
    setScreen("home");

    Alert.alert("Welcome back!", "You have signed in successfully.");
  } catch (error) {
    Alert.alert(
      "Connection error",
      "Backend se connection nahi ho raha. Check karo ke server chal raha hai aur API_URL sahi hai."
    );
  }
};

  if (screen === "welcome") {
    return (
      <SafeAreaView style={styles.fullScreen}>
        <View style={styles.welcomeRoot}>
          <Image source={{ uri: HERO_IMAGES.welcome }} style={styles.welcomeImage} />
          <View style={styles.welcomeShade} />

          <View style={styles.welcomeTop}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>EF</Text>
            </View>
            <Text style={styles.brandName}>EMBERFORK</Text>
          </View>

          <View style={styles.welcomeCopy}>
            <Text style={styles.welcomeKicker}>A MODERN FOOD HOUSE</Text>
            <Text style={styles.welcomeTitle}>
              Eat curious.
              {"\n"}
              Stay awhile.
            </Text>
            <Text style={styles.welcomeDescription}>
              A fresh mix of grill, pasta, pizza and desi comfort — served with
              a modern edge.
            </Text>

            <TouchableOpacity
              style={styles.welcomePrimary}
              onPress={() => setScreen("login")}
            >
              <Text style={styles.welcomePrimaryText}>Enter EmberFork</Text>
              <Text style={styles.welcomeArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.welcomeSecondary}
              onPress={() => setScreen("home")}
            >
              <Text style={styles.welcomeSecondaryText}>Browse as guest</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (screen === "login") {
    return (
      <SafeAreaView style={[styles.appRoot, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={styles.authScroll}>
          <TouchableOpacity onPress={() => setScreen("welcome")} style={styles.authBackButton}>
            <Text style={styles.authBackText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.authBrandRow}>
            <View style={[styles.brandMini, { backgroundColor: "#173042" }]}>
              <Text style={styles.brandMiniText}>EF</Text>
            </View>
            <View>
              <Text style={[styles.authBrand, { color: colors.text }]}>EMBERFORK</Text>
              <Text style={[styles.authTagline, { color: colors.muted }]}>
                food worth slowing down for
              </Text>
            </View>
          </View>

          <Text style={[styles.authTitle, { color: colors.text }]}>Welcome back</Text>
          <Text style={[styles.authSubtitle, { color: colors.muted }]}>
            Sign in to keep your favorites, orders and table bookings together.
          </Text>

          <View style={styles.authFieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.text }]}>Email</Text>
            <TextInput
              value={loginEmail}
              onChangeText={setLoginEmail}
              placeholder="you@example.com"
              placeholderTextColor={colors.muted}
              autoCapitalize="none"
              keyboardType="email-address"
              style={[
                styles.authInput,
                {
                  backgroundColor: colors.surface,
                  borderColor: themeKey === "night" ? "#30404D" : "#E6DED5",
                  color: colors.text,
                },
              ]}
            />

            <Text style={[styles.fieldLabel, { color: colors.text }]}>Password</Text>
            <TextInput
              value={loginPassword}
              onChangeText={setLoginPassword}
              placeholder="Your password"
              placeholderTextColor={colors.muted}
              secureTextEntry
              style={[
                styles.authInput,
                {
                  backgroundColor: colors.surface,
                  borderColor: themeKey === "night" ? "#30404D" : "#E6DED5",
                  color: colors.text,
                },
              ]}
            />
          </View>

          <TouchableOpacity style={styles.primaryWide} onPress={signIn}>
            <Text style={styles.primaryWideText}>Sign in</Text>
          </TouchableOpacity>

          <View style={styles.authHintBox}>
            <Text style={[styles.authHintTitle, { color: colors.text }]}>
              Demo manager
            </Text>
            <Text style={[styles.authHintText, { color: colors.muted }]}>
              manager@emberfork.com
            </Text>
          </View>

          <TouchableOpacity onPress={() => setScreen("signup")}>
            <Text style={[styles.switchText, { color: colors.muted }]}>
              New here?{" "}
              <Text style={styles.switchHighlight}>Create an account</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === "signup") {
    return (
      <SafeAreaView style={[styles.appRoot, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={styles.authScroll}>
          <TouchableOpacity onPress={() => setScreen("login")} style={styles.authBackButton}>
            <Text style={styles.authBackText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.signupHero}>
            <Image source={{ uri: HERO_IMAGES.home }} style={styles.signupHeroImage} />
            <View style={styles.signupHeroShade} />
            <View style={styles.signupHeroCopy}>
              <Text style={styles.signupHeroKicker}>MAKE ROOM FOR GOOD FOOD</Text>
              <Text style={styles.signupHeroTitle}>Your table starts here.</Text>
            </View>
          </View>

          <Text style={[styles.authTitle, { color: colors.text }]}>Create account</Text>
          <Text style={[styles.authSubtitle, { color: colors.muted }]}>
            Save favorites, book your table and keep your orders close.
          </Text>

          <Text style={[styles.fieldLabel, { color: colors.text }]}>Full name</Text>
          <TextInput
            value={signupName}
            onChangeText={setSignupName}
            placeholder="Your name"
            placeholderTextColor={colors.muted}
            style={[
              styles.authInput,
              {
                backgroundColor: colors.surface,
                borderColor: themeKey === "night" ? "#30404D" : "#E6DED5",
                color: colors.text,
              },
            ]}
          />

          <Text style={[styles.fieldLabel, { color: colors.text }]}>Email</Text>
          <TextInput
            value={signupEmail}
            onChangeText={setSignupEmail}
            placeholder="you@example.com"
            placeholderTextColor={colors.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[
              styles.authInput,
              {
                backgroundColor: colors.surface,
                borderColor: themeKey === "night" ? "#30404D" : "#E6DED5",
                color: colors.text,
              },
            ]}
          />

          <Text style={[styles.fieldLabel, { color: colors.text }]}>Password</Text>
          <TextInput
            value={signupPassword}
            onChangeText={setSignupPassword}
            placeholder="Create a password"
            placeholderTextColor={colors.muted}
            secureTextEntry
            style={[
              styles.authInput,
              {
                backgroundColor: colors.surface,
                borderColor: themeKey === "night" ? "#30404D" : "#E6DED5",
                color: colors.text,
              },
            ]}
          />

          <TouchableOpacity
            style={styles.primaryWide}
            onPress={() => {
              if (!signupName || !signupEmail || !signupPassword) {
                Alert.alert("Missing information", "Fill all three fields.");
                return;
              }

              Alert.alert("Account ready", "Your demo account has been created.", [
                { text: "Continue", onPress: () => setScreen("login") },
              ]);
            }}
          >
            <Text style={styles.primaryWideText}>Create account</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === "home") {
    const popular = FOOD.filter((item) => item.tag).slice(0, 6);

    return (
      <SafeAreaView style={[styles.appRoot, { backgroundColor: colors.background }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBottomSpace}>
          <View style={styles.homeTopRow}>
            <View>
              <Text style={[styles.locationSmall, { color: colors.muted }]}>
                YOUR TABLE TONIGHT
              </Text>
              <Text style={[styles.locationMain, { color: colors.text }]}>
                Blue Area · Islamabad
              </Text>
            </View>

            <TouchableOpacity
              style={styles.headerAvatarWrap}
              onPress={() => setScreen("profile")}
            >
              <Image source={{ uri: profileEmail ? HERO_IMAGES.profile : HERO_IMAGES.profile }} style={styles.headerAvatar} />
            </TouchableOpacity>
          </View>

          <View style={styles.homeIntro}>
            <Text style={[styles.homeIntroKicker, { color: "#EF8354" }]}>
              WELCOME TO EMBERFORK
            </Text>
            <Text style={[styles.homeIntroTitle, { color: colors.text }]}>
              Find your next favorite bite.
            </Text>
          </View>

          <View style={[styles.searchPill, { backgroundColor: colors.surface }]}>
            <Text style={styles.searchPillIcon}>⌕</Text>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search burger, pasta, dessert..."
              placeholderTextColor={colors.muted}
              style={[styles.searchPillInput, { color: colors.text }]}
            />
            <TouchableOpacity
              style={styles.searchAction}
              onPress={() => setScreen("menu")}
            >
              <Text style={styles.searchActionText}>Explore</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.heroCard}>
            <Image source={{ uri: HERO_IMAGES.home }} style={styles.heroImage} />
            <View style={styles.heroShade} />
            <View style={styles.heroContent}>
              <View style={styles.heroPill}>
                <Text style={styles.heroPillText}>Tonight's Feature</Text>
              </View>
              <Text style={styles.heroTitle}>Dinner, without the ordinary.</Text>
              <Text style={styles.heroText}>
                Fresh plates, open-fire flavors and just enough surprise.
              </Text>
              <TouchableOpacity
                style={styles.heroButton}
                onPress={() => {
                  setSelectedCategory("All");
                  setScreen("menu");
                }}
              >
                <Text style={styles.heroButtonText}>View menu</Text>
              </TouchableOpacity>
            </View>
          </View>

          <SectionHeading
            title="Browse by mood"
            action="See all"
            onPress={() => setScreen("menu")}
            colors={colors}
          />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.name}
                onPress={() => {
                  setSelectedCategory(category.name);
                  setScreen("menu");
                }}
                style={[
                  styles.categoryTile,
                  { backgroundColor: colors.surface },
                  selectedCategory === category.name && styles.categoryTileActive,
                ]}
              >
                <View
                  style={[
                    styles.categoryIconCircle,
                    selectedCategory === category.name && { backgroundColor: "#173042" },
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryIcon,
                      selectedCategory === category.name && { color: "#FFFFFF" },
                    ]}
                  >
                    {category.icon}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.categoryTileText,
                    { color: selectedCategory === category.name ? "#173042" : colors.text },
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <SectionHeading
            title="Popular right now"
            action="Full menu"
            onPress={() => setScreen("menu")}
            colors={colors}
          />

          <View style={styles.popularStack}>
            {popular.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.popularRow, { backgroundColor: colors.surface }]}
                onPress={() => openDetails(item)}
              >
                <Image source={{ uri: item.image }} style={styles.popularImage} />
                <View style={styles.popularCopy}>
                  <Text style={[styles.popularName, { color: colors.text }]} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={[styles.popularCategory, { color: colors.muted }]}>
                    {item.category} · {formatRs(item.price)}
                  </Text>
                  <Text style={[styles.popularDescription, { color: colors.muted }]} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
                <View style={styles.popularArrow}>
                  <Text style={styles.popularArrowText}>→</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.dualActionRow}>
            <TouchableOpacity
              style={[styles.dualActionCard, { backgroundColor: "#173042" }]}
              onPress={() => setScreen("booking")}
            >
              <Text style={styles.dualActionKicker}>BOOK A TABLE</Text>
              <Text style={styles.dualActionTitle}>Make tonight special.</Text>
              <Text style={styles.dualActionArrow}>↗</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.dualActionCard, { backgroundColor: "#EF8354" }]}
              onPress={() => setScreen("favorites")}
            >
              <Text style={styles.dualActionKicker}>YOUR SAVED DISHES</Text>
              <Text style={styles.dualActionTitle}>Pick up where you left off.</Text>
              <Text style={styles.dualActionArrow}>↗</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <BottomNav screen={screen} setScreen={setScreen} cartCount={cartCount} theme={themeKey} />
      </SafeAreaView>
    );
  }

  if (screen === "menu") {
    return (
      <SafeAreaView style={[styles.appRoot, { backgroundColor: colors.background }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBottomSpace}>
          <View style={styles.menuHeader}>
            <View>
              <Text style={[styles.locationSmall, { color: colors.muted }]}>
                EMBERFORK MENU
              </Text>
              <Text style={[styles.menuHeaderTitle, { color: colors.text }]}>
                Good things, one scroll away.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.menuCartTop}
              onPress={() => setScreen("cart")}
            >
              <Text style={styles.menuCartTopText}>🛍</Text>
              {cartCount > 0 && (
                <View style={styles.menuCartBadge}>
                  <Text style={styles.menuCartBadgeText}>{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={[styles.searchPill, { backgroundColor: colors.surface }]}>
            <Text style={styles.searchPillIcon}>⌕</Text>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search the menu..."
              placeholderTextColor={colors.muted}
              style={[styles.searchPillInput, { color: colors.text }]}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.name}
                onPress={() => setSelectedCategory(category.name)}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor:
                      selectedCategory === category.name ? "#173042" : colors.surface,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    {
                      color:
                        selectedCategory === category.name ? "#FFFFFF" : colors.text,
                    },
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.menuSummaryRow}>
            <Text style={[styles.menuSummaryCount, { color: colors.text }]}>
              {filteredFood.length} dishes
            </Text>
            <Text style={[styles.menuSummaryText, { color: colors.muted }]}>
              Hand-picked for this menu
            </Text>
          </View>

          <View style={styles.twoColumnGrid}>
            {filteredFood.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                colors={colors}
                favorite={favorites.includes(item.id)}
                onFavorite={() => toggleFavorite(item.id)}
                onAdd={() => addToCart(item)}
                onOpen={() => openDetails(item)}
              />
            ))}
          </View>

          <View style={styles.bottomCallout}>
            <Text style={[styles.bottomCalloutSmall, { color: "#EF8354" }]}>
              CAN'T DECIDE?
            </Text>
            <Text style={[styles.bottomCalloutTitle, { color: colors.text }]}>
              Let the chef choose for you.
            </Text>
            <Text style={[styles.bottomCalloutText, { color: colors.muted }]}>
              Add any three chef-tagged dishes and we’ll build a mixed table
              experience in this demo app.
            </Text>
          </View>
        </ScrollView>

        <BottomNav screen={screen} setScreen={setScreen} cartCount={cartCount} theme={themeKey} />
      </SafeAreaView>
    );
  }

  if (screen === "details" && selectedFood) {
    const item = selectedFood;

    return (
      <SafeAreaView style={[styles.appRoot, { backgroundColor: colors.background }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.detailScroll}>
          <TouchableOpacity style={styles.detailBack} onPress={() => setScreen("menu")}>
            <Text style={[styles.detailBackText, { color: colors.text }]}>←</Text>
          </TouchableOpacity>

          <View style={styles.detailImageWrap}>
            <Image source={{ uri: item.image }} style={styles.detailImage} />
            <TouchableOpacity
              style={styles.detailHeart}
              onPress={() => toggleFavorite(item.id)}
            >
              <Text style={styles.detailHeartText}>
                {favorites.includes(item.id) ? "♥" : "♡"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailMetaRow}>
            <View style={styles.detailTag}>
              <Text style={styles.detailTagText}>{item.category}</Text>
            </View>
            {item.tag && (
              <View style={[styles.detailTag, { backgroundColor: "#FCE9E2" }]}>
                <Text style={[styles.detailTagText, { color: "#B95731" }]}>{item.tag}</Text>
              </View>
            )}
          </View>

          <Text style={[styles.detailTitle, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.detailPrice, { color: "#EF8354" }]}>{formatRs(item.price)}</Text>
          <Text style={[styles.detailDescription, { color: colors.muted }]}>
            {item.description}
          </Text>

          <View style={[styles.detailInfoBox, { backgroundColor: colors.surface }]}>
            <View>
              <Text style={[styles.detailInfoSmall, { color: colors.muted }]}>Prepared fresh</Text>
              <Text style={[styles.detailInfoStrong, { color: colors.text }]}>15–25 min</Text>
            </View>
            <View>
              <Text style={[styles.detailInfoSmall, { color: colors.muted }]}>Serving</Text>
              <Text style={[styles.detailInfoStrong, { color: colors.text }]}>1 person</Text>
            </View>
            <View>
              <Text style={[styles.detailInfoSmall, { color: colors.muted }]}>Style</Text>
              <Text style={[styles.detailInfoStrong, { color: colors.text }]}>Chef's plate</Text>
            </View>
          </View>

          <Text style={[styles.detailSectionTitle, { color: colors.text }]}>Quantity</Text>

          <View style={styles.quantitySelector}>
            <TouchableOpacity
              style={styles.qtyCircle}
              onPress={() => setDetailQty((q) => Math.max(1, q - 1))}
            >
              <Text style={styles.qtyCircleText}>−</Text>
            </TouchableOpacity>

            <Text style={[styles.qtyNumber, { color: colors.text }]}>{detailQty}</Text>

            <TouchableOpacity
              style={styles.qtyCircle}
              onPress={() => setDetailQty((q) => q + 1)}
            >
              <Text style={styles.qtyCircleText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.detailAddButton}
            onPress={() => {
              addToCart(item, detailQty);
              Alert.alert("Added to cart", `${detailQty} × ${item.name}`);
            }}
          >
            <Text style={styles.detailAddButtonText}>
              Add to cart · {formatRs(item.price * detailQty)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.detailSecondaryButton} onPress={() => setScreen("cart")}>
            <Text style={[styles.detailSecondaryText, { color: colors.text }]}>
              View cart
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === "favorites") {
    return (
      <SafeAreaView style={[styles.appRoot, { backgroundColor: colors.background }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBottomSpace}>
          <View style={styles.pageHeader}>
            <View>
              <Text style={[styles.locationSmall, { color: colors.muted }]}>SAVED FOR LATER</Text>
              <Text style={[styles.pageTitle, { color: colors.text }]}>Your favorites</Text>
            </View>
            <View style={styles.countPill}>
              <Text style={styles.countPillText}>{favoriteFood.length}</Text>
            </View>
          </View>

          <View style={styles.savedBanner}>
            <Image source={{ uri: HERO_IMAGES.tracking }} style={styles.savedBannerImage} />
            <View style={styles.savedBannerShade} />
            <View style={styles.savedBannerText}>
              <Text style={styles.savedBannerKicker}>ONE TAP AWAY</Text>
              <Text style={styles.savedBannerTitle}>Keep the good ones close.</Text>
            </View>
          </View>

          {!favoriteFood.length ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconBubble}>
                <Text style={styles.emptyIcon}>♡</Text>
              </View>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>Nothing saved yet</Text>
              <Text style={[styles.emptyText, { color: colors.muted }]}>
                Tap the heart on a dish and it will land here.
              </Text>
              <TouchableOpacity style={styles.primarySmall} onPress={() => setScreen("menu")}>
                <Text style={styles.primarySmallText}>Browse menu</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.favoriteList}>
              {favoriteFood.map((item) => (
                <View key={item.id} style={[styles.favoriteRow, { backgroundColor: colors.surface }]}>
                  <Image source={{ uri: item.image }} style={styles.favoriteImage} />
                  <View style={styles.favoriteInfo}>
                    <Text style={[styles.favoriteName, { color: colors.text }]}>{item.name}</Text>
                    <Text style={[styles.favoriteCategory, { color: colors.muted }]}>
                      {item.category}
                    </Text>
                    <Text style={styles.favoritePrice}>{formatRs(item.price)}</Text>
                    <TouchableOpacity style={styles.favoriteAdd} onPress={() => addToCart(item)}>
                      <Text style={styles.favoriteAddText}>Add to order</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.favoriteRemove}
                    onPress={() => toggleFavorite(item.id)}
                  >
                    <Text style={styles.favoriteRemoveText}>♥</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        <BottomNav screen={screen} setScreen={setScreen} cartCount={cartCount} theme={themeKey} />
      </SafeAreaView>
    );
  }

  if (screen === "cart") {
    return (
      <SafeAreaView style={[styles.appRoot, { backgroundColor: colors.background }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.cartScroll}>
          <View style={styles.pageHeader}>
            <View>
              <Text style={[styles.locationSmall, { color: colors.muted }]}>YOUR ORDER</Text>
              <Text style={[styles.pageTitle, { color: colors.text }]}>Cart & checkout</Text>
            </View>
            <View style={styles.countPill}>
              <Text style={styles.countPillText}>{cartCount}</Text>
            </View>
          </View>

          <View style={styles.cartBanner}>
            <Image source={{ uri: HERO_IMAGES.home }} style={styles.cartBannerImage} />
            <View style={styles.cartBannerShade} />
            <Text style={styles.cartBannerTitle}>Dinner is almost on the way.</Text>
          </View>

          {!cart.length ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconBubble}>
                <Text style={styles.emptyIcon}>🛍</Text>
              </View>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>Your cart is empty</Text>
              <Text style={[styles.emptyText, { color: colors.muted }]}>
                Start with one dish. Your future self will thank you.
              </Text>
              <TouchableOpacity style={styles.primarySmall} onPress={() => setScreen("menu")}>
                <Text style={styles.primarySmallText}>Explore dishes</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.cartList}>
                {cart.map((item) => (
                  <View key={item.id} style={[styles.cartRow, { backgroundColor: colors.surface }]}>
                    <Image source={{ uri: item.image }} style={styles.cartImage} />
                    <View style={styles.cartRowMain}>
                      <Text style={[styles.cartRowTitle, { color: colors.text }]}>{item.name}</Text>
                      <Text style={[styles.cartRowCategory, { color: colors.muted }]}>
                        {item.category}
                      </Text>
                      <Text style={styles.cartRowPrice}>{formatRs(item.price)}</Text>

                      <View style={styles.cartQtyRow}>
                        <TouchableOpacity
                          style={styles.cartQtyButton}
                          onPress={() => decreaseItem(item.id)}
                        >
                          <Text style={styles.cartQtyText}>−</Text>
                        </TouchableOpacity>
                        <Text style={[styles.cartQtyNumber, { color: colors.text }]}>
                          {item.quantity}
                        </Text>
                        <TouchableOpacity
                          style={styles.cartQtyButton}
                          onPress={() => increaseItem(item.id)}
                        >
                          <Text style={styles.cartQtyText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              <View style={[styles.promoCard, { backgroundColor: colors.surface }]}>
                <Text style={[styles.promoTitle, { color: colors.text }]}>Have a promo code?</Text>
                <View style={styles.promoRow}>
                  <TextInput
                    value={promoCode}
                    onChangeText={setPromoCode}
                    placeholder="EMBER10"
                    placeholderTextColor={colors.muted}
                    autoCapitalize="characters"
                    style={[
                      styles.promoInput,
                      {
                        color: colors.text,
                        borderColor: themeKey === "night" ? "#30404D" : "#E7DDD4",
                        backgroundColor: colors.background,
                      },
                    ]}
                  />
                  <TouchableOpacity style={styles.promoApply} onPress={applyPromo}>
                    <Text style={styles.promoApplyText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[styles.summaryCard, { backgroundColor: colors.surface }]}>
                <View style={styles.summaryLine}>
                  <Text style={[styles.summaryLabel, { color: colors.muted }]}>Subtotal</Text>
                  <Text style={[styles.summaryValue, { color: colors.text }]}>
                    {formatRs(subtotal)}
                  </Text>
                </View>
                <View style={styles.summaryLine}>
                  <Text style={[styles.summaryLabel, { color: colors.muted }]}>Delivery</Text>
                  <Text style={styles.summaryGreen}>FREE</Text>
                </View>
                {discountPercent > 0 && (
                  <View style={styles.summaryLine}>
                    <Text style={[styles.summaryLabel, { color: colors.muted }]}>
                      Discount ({discountPercent}%)
                    </Text>
                    <Text style={styles.summaryGreen}>− {formatRs(discount)}</Text>
                  </View>
                )}

                <View style={styles.summaryDivider} />

                <View style={styles.summaryLine}>
                  <Text style={[styles.summaryTotalLabel, { color: colors.text }]}>Total</Text>
                  <Text style={styles.summaryTotal}>{formatRs(grandTotal)}</Text>
                </View>

                <TouchableOpacity style={styles.checkoutButton} onPress={placeOrder}>
                  <Text style={styles.checkoutButtonText}>Place order</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>

        <BottomNav screen={screen} setScreen={setScreen} cartCount={cartCount} theme={themeKey} />
      </SafeAreaView>
    );
  }

  if (screen === "booking") {
    const availableTables = TABLES.filter((table) =>
      guestCount ? table.seats >= Number(guestCount) : true,
    );

    return (
      <SafeAreaView style={[styles.appRoot, { backgroundColor: colors.background }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBottomSpace}>
          <View style={styles.pageHeader}>
            <View>
              <Text style={[styles.locationSmall, { color: colors.muted }]}>DINING ROOM</Text>
              <Text style={[styles.pageTitle, { color: colors.text }]}>Book your table</Text>
            </View>
            <View style={styles.roundOutline}>
              <Text style={styles.roundOutlineText}>▣</Text>
            </View>
          </View>

          <View style={styles.bookingHero}>
            <Image source={{ uri: HERO_IMAGES.booking }} style={styles.bookingHeroImage} />
            <View style={styles.bookingHeroShade} />
            <View style={styles.bookingHeroCopy}>
              <Text style={styles.bookingHeroKicker}>A BETTER WAY TO ARRIVE</Text>
              <Text style={styles.bookingHeroTitle}>Pick a seat that feels right.</Text>
            </View>
          </View>

          <Text style={[styles.bookingLabel, { color: colors.text }]}>1 · Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateScroll}>
            {getDays().map((day) => (
              <TouchableOpacity
                key={day}
                onPress={() => {
                  setBookingDate(day);
                  setBookingConfirmed(false);
                }}
                style={[
                  styles.dateChip,
                  {
                    backgroundColor: bookingDate === day ? "#173042" : colors.surface,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.dateChipText,
                    { color: bookingDate === day ? "#FFFFFF" : colors.text },
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={[styles.bookingLabel, { color: colors.text }]}>2 · Time</Text>
          <View style={styles.timeGrid}>
            {["12:30 PM", "1:30 PM", "6:30 PM", "7:00 PM", "8:00 PM", "9:00 PM"].map(
              (time) => (
                <TouchableOpacity
                  key={time}
                  onPress={() => {
                    setBookingTime(time);
                    setBookingConfirmed(false);
                  }}
                  style={[
                    styles.timeChip,
                    {
                      backgroundColor: bookingTime === time ? "#FCE9E2" : colors.surface,
                      borderColor: bookingTime === time ? "#EF8354" : "#E6DED5",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.timeChipText,
                      { color: bookingTime === time ? "#B95731" : colors.text },
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </View>

          <Text style={[styles.bookingLabel, { color: colors.text }]}>3 · Guests</Text>
          <View style={styles.guestStepperRow}>
            <Text style={[styles.guestHint, { color: colors.muted }]}>
              How many people are joining?
            </Text>
            <View style={styles.guestStepper}>
              <TouchableOpacity
                style={styles.guestButton}
                onPress={() => setGuestCount((n) => String(Math.max(1, Number(n) - 1)))}
              >
                <Text style={styles.guestButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={[styles.guestNumber, { color: colors.text }]}>{guestCount}</Text>
              <TouchableOpacity
                style={styles.guestButton}
                onPress={() => setGuestCount((n) => String(Math.min(8, Number(n) + 1)))}
              >
                <Text style={styles.guestButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={[styles.bookingLabel, { color: colors.text }]}>4 · Table</Text>
          <View style={styles.tableList}>
            {availableTables.map((table) => (
              <TouchableOpacity
                key={table.id}
                onPress={() => {
                  setSelectedTable(table.id);
                  setBookingConfirmed(false);
                }}
                style={[
                  styles.tableChoice,
                  {
                    backgroundColor: colors.surface,
                    borderColor: selectedTable === table.id ? "#EF8354" : "#E6DED5",
                    borderWidth: selectedTable === table.id ? 2 : 1,
                  },
                ]}
              >
                <Image source={{ uri: table.image }} style={styles.tableChoiceImage} />
                <View style={styles.tableChoiceCopy}>
                  <Text style={[styles.tableChoiceName, { color: colors.text }]}>
                    {table.name}
                  </Text>
                  <Text style={[styles.tableChoiceMeta, { color: colors.muted }]}>
                    {table.seats} seats · {table.id % 2 === 0 ? "Indoor" : "By the window"}
                  </Text>
                  <Text style={styles.tableChoiceSelect}>
                    {selectedTable === table.id ? "Selected ✓" : "Choose this table"}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.bookingConfirm} onPress={confirmBooking}>
            <Text style={styles.bookingConfirmText}>
              {bookingConfirmed ? "Reservation confirmed ✓" : "Confirm reservation"}
            </Text>
          </TouchableOpacity>

          {bookingConfirmed && selectedTable && (
            <View style={[styles.bookingReceipt, { backgroundColor: colors.surface }]}>
              <Text style={[styles.bookingReceiptKicker, { color: "#EF8354" }]}>
                YOUR RESERVATION
              </Text>
              <Text style={[styles.bookingReceiptTitle, { color: colors.text }]}>
                {TABLES.find((x) => x.id === selectedTable)?.name}
              </Text>
              <Text style={[styles.bookingReceiptText, { color: colors.muted }]}>
                {bookingDate} · {bookingTime} · {guestCount} guests
              </Text>
              <Text style={[styles.bookingReceiptText, { color: colors.muted }]}>
                EmberFork · Blue Area, Islamabad
              </Text>
            </View>
          )}
        </ScrollView>

        <BottomNav screen={screen} setScreen={setScreen} cartCount={cartCount} theme={themeKey} />
      </SafeAreaView>
    );
  }

  if (screen === "orders") {
    return (
      <SafeAreaView style={[styles.appRoot, { backgroundColor: colors.background }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBottomSpace}>
          <View style={styles.pageHeader}>
            <View>
              <Text style={[styles.locationSmall, { color: colors.muted }]}>ORDER HISTORY</Text>
              <Text style={[styles.pageTitle, { color: colors.text }]}>Your orders</Text>
            </View>
          </View>

          {!orders.length ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconBubble}>
                <Text style={styles.emptyIcon}>⌁</Text>
              </View>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>No orders yet</Text>
              <Text style={[styles.emptyText, { color: colors.muted }]}>
                Place your first order and its story will appear here.
              </Text>
              <TouchableOpacity style={styles.primarySmall} onPress={() => setScreen("menu")}>
                <Text style={styles.primarySmallText}>Start ordering</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {orders.map((order) => (
                <View key={order.id} style={[styles.orderHistoryCard, { backgroundColor: colors.surface }]}>
                  <View style={styles.orderTopLine}>
                    <View>
                      <Text style={[styles.orderId, { color: colors.text }]}>
                        {order.id}
                      </Text>
                      <Text style={[styles.orderDate, { color: colors.muted }]}>
                        {order.date}
                      </Text>
                    </View>
                    <View style={styles.statusChip}>
                      <Text style={styles.statusChipText}>{order.status}</Text>
                    </View>
                  </View>

                  <View style={styles.orderMiniItems}>
                    {order.items.slice(0, 3).map((item) => (
                      <View key={item.id} style={styles.orderMiniItem}>
                        <Image source={{ uri: item.image }} style={styles.orderMiniImage} />
                        <Text style={[styles.orderMiniText, { color: colors.text }]} numberOfLines={1}>
                          {item.name} × {item.quantity}
                        </Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.orderBottomLine}>
                    <Text style={[styles.orderTotal, { color: colors.text }]}>
                      {formatRs(order.total)}
                    </Text>
                    <TouchableOpacity
                      style={styles.orderTrackButton}
                      onPress={() => {
                        setTrackingOrderId(order.id);
                        setScreen("tracking");
                      }}
                    >
                      <Text style={styles.orderTrackButtonText}>Track</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
        <BottomNav screen={screen} setScreen={setScreen} cartCount={cartCount} theme={themeKey} />
      </SafeAreaView>
    );
  }

  if (screen === "tracking") {
    const statusIndex =
      trackingOrder?.status === "Confirmed"
        ? 0
        : trackingOrder?.status === "Preparing"
          ? 1
          : trackingOrder?.status === "Out for Delivery"
            ? 2
            : 3;

    return (
      <SafeAreaView style={[styles.appRoot, { backgroundColor: colors.background }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBottomSpace}>
          <TouchableOpacity style={styles.detailBack} onPress={() => setScreen("orders")}>
            <Text style={[styles.detailBackText, { color: colors.text }]}>←</Text>
          </TouchableOpacity>

          <View style={styles.trackingHero}>
            <Image source={{ uri: HERO_IMAGES.tracking }} style={styles.trackingHeroImage} />
            <View style={styles.trackingHeroShade} />
            <View style={styles.trackingHeroCopy}>
              <Text style={styles.trackingKicker}>ORDER TRACKING</Text>
              <Text style={styles.trackingTitle}>
                {trackingOrder?.status || "Order confirmed"}
              </Text>
              <Text style={styles.trackingSub}>
                {trackingOrder ? trackingOrder.id : "No active order"}
              </Text>
            </View>
          </View>

          {trackingOrder ? (
            <>
              <View style={styles.timelineCard}>
                {[
                  "Order confirmed",
                  "Kitchen is preparing",
                  "Courier is on the way",
                  "Delivered to you",
                ].map((label, index) => (
                  <View key={label} style={styles.timelineRow}>
                    <View
                      style={[
                        styles.timelineDot,
                        { backgroundColor: index <= statusIndex ? "#EF8354" : "#D7DCE0" },
                      ]}
                    >
                      <Text style={styles.timelineDotText}>
                        {index <= statusIndex ? "✓" : ""}
                      </Text>
                    </View>
                    <View style={styles.timelineCopy}>
                      <Text
                        style={[
                          styles.timelineLabel,
                          { color: index <= statusIndex ? colors.text : colors.muted },
                        ]}
                      >
                        {label}
                      </Text>
                      {index === 0 && (
                        <Text style={[styles.timelineTime, { color: colors.muted }]}>
                          We have your order.
                        </Text>
                      )}
                      {index === 1 && (
                        <Text style={[styles.timelineTime, { color: colors.muted }]}>
                          Fresh from the EmberFork kitchen.
                        </Text>
                      )}
                      {index === 2 && (
                        <Text style={[styles.timelineTime, { color: colors.muted }]}>
                          Almost at your door.
                        </Text>
                      )}
                      {index === 3 && (
                        <Text style={[styles.timelineTime, { color: colors.muted }]}>
                          Enjoy every bite.
                        </Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>

              <View style={[styles.trackingOrderCard, { backgroundColor: colors.surface }]}>
                <Text style={[styles.trackingOrderHeading, { color: colors.text }]}>
                  Order summary
                </Text>
                {trackingOrder.items.map((item) => (
                  <View key={item.id} style={styles.trackingOrderLine}>
                    <Text style={[styles.trackingOrderItem, { color: colors.muted }]}>
                      {item.name} × {item.quantity}
                    </Text>
                    <Text style={[styles.trackingOrderPrice, { color: colors.text }]}>
                      {formatRs(item.price * item.quantity)}
                    </Text>
                  </View>
                ))}
                <View style={styles.summaryDivider} />
                <View style={styles.summaryLine}>
                  <Text style={[styles.summaryTotalLabel, { color: colors.text }]}>Total</Text>
                  <Text style={styles.summaryTotal}>{formatRs(trackingOrder.total)}</Text>
                </View>
              </View>
            </>
          ) : (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                Nothing to track
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === "profile") {
    return (
      <SafeAreaView style={[styles.appRoot, { backgroundColor: colors.background }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBottomSpace}>
          <View style={styles.profileCover}>
            <Image source={{ uri: HERO_IMAGES.profile }} style={styles.profileCoverImage} />
            <View style={styles.profileCoverShade} />
            <View style={styles.profileCoverTop}>
              <Text style={styles.profileCoverKicker}>EMBERFORK MEMBER</Text>
              <TouchableOpacity style={styles.profileSettingsCircle} onPress={() => setScreen("editProfile")}>
                <Text style={styles.profileSettingsText}>✎</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.profileCoverBottom}>
              <Text style={styles.profileCoverName}>
                {profileName || signupName || "EmberFork Guest"}
              </Text>
              <Text style={styles.profileCoverEmail}>
                {profileEmail || signupEmail || "guest@emberfork.demo"}
              </Text>
            </View>
          </View>

          <View style={styles.profileStats}>
            <View style={styles.profileStatBox}>
              <Text style={styles.profileStatNumber}>{orders.length}</Text>
              <Text style={styles.profileStatLabel}>Orders</Text>
            </View>
            <View style={styles.profileStatBox}>
              <Text style={styles.profileStatNumber}>{favoriteFood.length}</Text>
              <Text style={styles.profileStatLabel}>Saved</Text>
            </View>
            <View style={styles.profileStatBox}>
              <Text style={styles.profileStatNumber}>{bookingConfirmed ? "1" : "0"}</Text>
              <Text style={styles.profileStatLabel}>Booking</Text>
            </View>
          </View>

          <SectionHeading title="Personalize the app" colors={colors} />
          <ThemeStrip value={themeKey} onChange={setThemeKey} />

          <View style={styles.profileMenu}>
            <TouchableOpacity
              style={[styles.profileMenuRow, { backgroundColor: colors.surface }]}
              onPress={() => setScreen("orders")}
            >
              <View style={styles.profileMenuIcon}>
                <Text style={styles.profileMenuIconText}>⌁</Text>
              </View>
              <View style={styles.profileMenuCopy}>
                <Text style={[styles.profileMenuTitle, { color: colors.text }]}>My orders</Text>
                <Text style={[styles.profileMenuSub, { color: colors.muted }]}>
                  View and track previous orders
                </Text>
              </View>
              <Text style={styles.profileMenuArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.profileMenuRow, { backgroundColor: colors.surface }]}
              onPress={() => setScreen("booking")}
            >
              <View style={styles.profileMenuIcon}>
                <Text style={styles.profileMenuIconText}>▣</Text>
              </View>
              <View style={styles.profileMenuCopy}>
                <Text style={[styles.profileMenuTitle, { color: colors.text }]}>Book a table</Text>
                <Text style={[styles.profileMenuSub, { color: colors.muted }]}>
                  Plan your next dinner
                </Text>
              </View>
              <Text style={styles.profileMenuArrow}>›</Text>
            </TouchableOpacity>

            {loginEmail.toLowerCase() === "manager@emberfork.com" && (
              <TouchableOpacity
                style={[styles.profileMenuRow, { backgroundColor: colors.surface }]}
                onPress={() => setScreen("manager")}
              >
                <View style={styles.profileMenuIcon}>
                  <Text style={styles.profileMenuIconText}>▤</Text>
                </View>
                <View style={styles.profileMenuCopy}>
                  <Text style={[styles.profileMenuTitle, { color: colors.text }]}>
                    Manager dashboard
                  </Text>
                  <Text style={[styles.profileMenuSub, { color: colors.muted }]}>
                    Orders and reservations overview
                  </Text>
                </View>
                <Text style={styles.profileMenuArrow}>›</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.profileMenuRow, { backgroundColor: colors.surface }]}
              onPress={() => setScreen("editProfile")}
            >
              <View style={styles.profileMenuIcon}>
                <Text style={styles.profileMenuIconText}>✎</Text>
              </View>
              <View style={styles.profileMenuCopy}>
                <Text style={[styles.profileMenuTitle, { color: colors.text }]}>
                  Edit profile
                </Text>
                <Text style={[styles.profileMenuSub, { color: colors.muted }]}>
                  Update your name and email
                </Text>
              </View>
              <Text style={styles.profileMenuArrow}>›</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.logoutRow}
            onPress={() => {
              Alert.alert("Log out", "Return to the welcome screen?", [
                { text: "Cancel", style: "cancel" },
                { text: "Log out", onPress: () => setScreen("welcome") },
              ]);
            }}
          >
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </ScrollView>

        {loginEmail.toLowerCase() !== "manager@emberfork.com" && (
          <BottomNav screen={screen} setScreen={setScreen} cartCount={cartCount} theme={themeKey} />
        )}
      </SafeAreaView>
    );
  }

  if (screen === "editProfile") {
    return (
      <SafeAreaView style={[styles.appRoot, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={styles.authScroll}>
          <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen("profile")}>
            <Text style={styles.authBackText}>← Back to profile</Text>
          </TouchableOpacity>

          <View style={styles.editProfileHero}>
            <Image source={{ uri: HERO_IMAGES.profile }} style={styles.editProfileImage} />
            <View>
              <Text style={[styles.editProfileTitle, { color: colors.text }]}>
                Edit your profile
              </Text>
              <Text style={[styles.editProfileSub, { color: colors.muted }]}>
                These details stay local in this frontend demo.
              </Text>
            </View>
          </View>

          <Text style={[styles.fieldLabel, { color: colors.text }]}>Name</Text>
          <TextInput
            value={profileName}
            onChangeText={setProfileName}
            placeholder="Your name"
            placeholderTextColor={colors.muted}
            style={[
              styles.authInput,
              {
                backgroundColor: colors.surface,
                borderColor: themeKey === "night" ? "#30404D" : "#E6DED5",
                color: colors.text,
              },
            ]}
          />

          <Text style={[styles.fieldLabel, { color: colors.text }]}>Email</Text>
          <TextInput
            value={profileEmail}
            onChangeText={setProfileEmail}
            placeholder="you@example.com"
            placeholderTextColor={colors.muted}
            autoCapitalize="none"
            keyboardType="email-address"
            style={[
              styles.authInput,
              {
                backgroundColor: colors.surface,
                borderColor: themeKey === "night" ? "#30404D" : "#E6DED5",
                color: colors.text,
              },
            ]}
          />

          <TouchableOpacity
            style={styles.primaryWide}
            onPress={() => {
              if (!profileName || !profileEmail) {
                Alert.alert("Missing information", "Enter your name and email.");
                return;
              }
              Alert.alert("Saved", "Your profile details have been updated.", [
                { text: "OK", onPress: () => setScreen("profile") },
              ]);
            }}
          >
            <Text style={styles.primaryWideText}>Save changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === "manager") {
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter((order) => order.status !== "Delivered").length;

    return (
      <SafeAreaView style={[styles.appRoot, { backgroundColor: colors.background }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBottomSpace}>
          <View style={styles.managerHero}>
            <View>
              <Text style={styles.managerKicker}>EMBERFORK OPS</Text>
              <Text style={styles.managerTitle}>Manager dashboard</Text>
              <Text style={styles.managerSub}>A quick look at today in the restaurant.</Text>
            </View>
            <View style={styles.managerBadge}>
              <Text style={styles.managerBadgeText}>LIVE</Text>
            </View>
          </View>

          <View style={styles.managerStatsGrid}>
            <View style={[styles.managerStat, { backgroundColor: "#173042" }]}>
              <Text style={styles.managerStatKicker}>Orders</Text>
              <Text style={styles.managerStatNumber}>{orders.length}</Text>
            </View>
            <View style={[styles.managerStat, { backgroundColor: "#EF8354" }]}>
              <Text style={styles.managerStatKicker}>Sales</Text>
              <Text style={styles.managerStatNumber}>{formatRs(totalSales)}</Text>
            </View>
            <View style={[styles.managerStat, { backgroundColor: "#7AA78D" }]}>
              <Text style={styles.managerStatKicker}>Pending</Text>
              <Text style={styles.managerStatNumber}>{pendingOrders}</Text>
            </View>
            <View style={[styles.managerStat, { backgroundColor: "#9A83B6" }]}>
              <Text style={styles.managerStatKicker}>Bookings</Text>
              <Text style={styles.managerStatNumber}>{bookingConfirmed ? 1 : 0}</Text>
            </View>
          </View>

          <SectionHeading title="Recent orders" colors={colors} />

          {!orders.length ? (
            <View style={[styles.managerEmpty, { backgroundColor: colors.surface }]}>
              <Text style={[styles.managerEmptyTitle, { color: colors.text }]}>
                No orders yet
              </Text>
              <Text style={[styles.managerEmptyText, { color: colors.muted }]}>
                New orders will appear here as soon as a customer checks out.
              </Text>
            </View>
          ) : (
            orders.map((order) => (
              <View key={order.id} style={[styles.managerOrder, { backgroundColor: colors.surface }]}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.managerOrderId, { color: colors.text }]}>
                    {order.id}
                  </Text>
                  <Text style={[styles.managerOrderMeta, { color: colors.muted }]}>
                    {order.items.length} line items · {formatRs(order.total)}
                  </Text>
                  <Text style={styles.managerStatus}>{order.status}</Text>
                </View>
                <TouchableOpacity
                  style={styles.managerAction}
                  onPress={() => {
                    const states: Order["status"][] = [
                      "Confirmed",
                      "Preparing",
                      "Out for Delivery",
                      "Delivered",
                    ];
                    const index = states.indexOf(order.status);
                    const next = states[Math.min(index + 1, states.length - 1)];

                    setOrders((old) =>
                      old.map((item) =>
                        item.id === order.id ? { ...item, status: next } : item,
                      ),
                    );
                  }}
                >
                  <Text style={styles.managerActionText}>
                    {order.status === "Delivered" ? "Done" : "Advance"}
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}

          <SectionHeading title="Reservation overview" colors={colors} />

          <View style={[styles.managerReservation, { backgroundColor: colors.surface }]}>
            {bookingConfirmed && selectedTable ? (
              <>
                <Text style={[styles.managerReservationTitle, { color: colors.text }]}>
                  {TABLES.find((table) => table.id === selectedTable)?.name}
                </Text>
                <Text style={[styles.managerReservationText, { color: colors.muted }]}>
                  {bookingDate} · {bookingTime} · {guestCount} guests
                </Text>
              </>
            ) : (
              <>
                <Text style={[styles.managerReservationTitle, { color: colors.text }]}>
                  No active reservation
                </Text>
                <Text style={[styles.managerReservationText, { color: colors.muted }]}>
                  The booking card will populate when a guest confirms a table.
                </Text>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#0C1319",
  },

  appRoot: {
    flex: 1,
  },

  scrollBottomSpace: {
    paddingBottom: 120,
  },

  welcomeRoot: {
    flex: 1,
    backgroundColor: "#0C1319",
  },

  welcomeImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: undefined,
    height: undefined,
  },

  welcomeShade: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(5,12,18,0.54)",
  },

  welcomeTop: {
    paddingHorizontal: 24,
    paddingTop: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  brandMark: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "#EF8354",
    justifyContent: "center",
    alignItems: "center",
  },

  brandMarkText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },

  brandName: {
    color: "#FFFFFF",
    fontSize: 14,
    letterSpacing: 3,
    fontWeight: "900",
  },

  welcomeCopy: {
    marginTop: "auto",
    paddingHorizontal: 24,
    paddingBottom: 36,
  },

  welcomeKicker: {
    color: "#F8BE8E",
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: "900",
    marginBottom: 13,
  },

  welcomeTitle: {
    color: "#FFFFFF",
    fontSize: 44,
    lineHeight: 46,
    fontWeight: "900",
  },

  welcomeDescription: {
    color: "#E0E6EA",
    fontSize: 15,
    lineHeight: 23,
    marginTop: 16,
    maxWidth: 340,
  },

  welcomePrimary: {
    marginTop: 25,
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: "#EF8354",
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  welcomePrimaryText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },

  welcomeArrow: {
    color: "#FFFFFF",
    fontSize: 25,
  },

  welcomeSecondary: {
    alignItems: "center",
    marginTop: 15,
  },

  welcomeSecondaryText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },

  authScroll: {
    padding: 22,
    paddingBottom: 50,
  },

  authBackButton: {
    alignSelf: "flex-start",
    paddingVertical: 10,
  },

  authBackText: {
    color: "#EF8354",
    fontWeight: "800",
  },

  authBrandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 34,
    gap: 11,
  },

  brandMini: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  brandMiniText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },

  authBrand: {
    fontWeight: "900",
    letterSpacing: 2.2,
    fontSize: 13,
  },

  authTagline: {
    fontSize: 11,
    marginTop: 2,
  },

  authTitle: {
    fontSize: 33,
    fontWeight: "900",
  },

  authSubtitle: {
    fontSize: 14,
    lineHeight: 21,
    marginTop: 9,
    marginBottom: 28,
  },

  authFieldGroup: {
    gap: 0,
  },

  fieldLabel: {
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 7,
    marginTop: 8,
  },

  authInput: {
    minHeight: 54,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 14,
  },

  primaryWide: {
    height: 56,
    backgroundColor: "#173042",
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },

  primaryWideText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },

  authHintBox: {
    marginTop: 18,
    padding: 15,
    borderRadius: 16,
    backgroundColor: "#FCE9E2",
  },

  authHintTitle: {
    fontSize: 12,
    fontWeight: "900",
  },

  authHintText: {
    fontSize: 12,
    marginTop: 3,
  },

  switchText: {
    textAlign: "center",
    fontSize: 13,
    marginTop: 20,
  },

  switchHighlight: {
    color: "#EF8354",
    fontWeight: "900",
  },

  signupHero: {
    height: 185,
    borderRadius: 24,
    overflow: "hidden",
    marginTop: 24,
    marginBottom: 24,
  },

  signupHeroImage: {
    width: "100%",
    height: "100%",
  },

  signupHeroShade: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(14,28,38,0.38)",
  },

  signupHeroCopy: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 18,
  },

  signupHeroKicker: {
    color: "#F8BE8E",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.4,
  },

  signupHeroTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
    marginTop: 4,
  },

  bottomBar: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    minHeight: 70,
    borderRadius: 23,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 6,
    shadowColor: "#000000",
    shadowOpacity: 0.09,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 9,
  },

  bottomItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 52,
  },

  bottomIcon: {
    fontSize: 21,
  },

  bottomText: {
    fontSize: 9,
    marginTop: 3,
    fontWeight: "800",
  },

  cartBadge: {
    position: "absolute",
    right: -7,
    top: -7,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: "#EF8354",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },

  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "900",
  },

  homeTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  locationSmall: {
    fontSize: 9,
    letterSpacing: 1.4,
    fontWeight: "900",
  },

  locationMain: {
    fontSize: 15,
    fontWeight: "900",
    marginTop: 4,
  },

  headerAvatarWrap: {
    width: 48,
    height: 48,
    borderRadius: 17,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "#DDE7EA",
  },

  headerAvatar: {
    width: "100%",
    height: "100%",
  },

  homeIntro: {
    paddingHorizontal: 20,
    paddingTop: 26,
  },

  homeIntroKicker: {
    fontSize: 10,
    letterSpacing: 1.6,
    fontWeight: "900",
  },

  homeIntroTitle: {
    fontSize: 31,
    lineHeight: 36,
    fontWeight: "900",
    marginTop: 5,
    maxWidth: 330,
  },

  searchPill: {
    marginHorizontal: 20,
    marginTop: 20,
    minHeight: 55,
    borderRadius: 18,
    paddingLeft: 15,
    paddingRight: 7,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  searchPillIcon: {
    fontSize: 24,
    color: "#7A7F87",
    marginRight: 6,
  },

  searchPillInput: {
    flex: 1,
    fontSize: 13,
  },

  searchAction: {
    backgroundColor: "#173042",
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },

  searchActionText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
  },

  heroCard: {
    height: 250,
    marginHorizontal: 20,
    marginTop: 18,
    borderRadius: 26,
    overflow: "hidden",
  },

  heroImage: {
    width: "100%",
    height: "100%",
  },

  heroShade: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(8,19,27,0.48)",
  },

  heroContent: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 18,
  },

  heroPill: {
    alignSelf: "flex-start",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
  },

  heroPillText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    lineHeight: 31,
    fontWeight: "900",
    marginTop: 9,
    maxWidth: 280,
  },

  heroText: {
    color: "#DCE4E8",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 7,
    maxWidth: 300,
  },

  heroButton: {
    marginTop: 14,
    alignSelf: "flex-start",
    backgroundColor: "#EF8354",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
  },

  heroButtonText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
  },

  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 26,
    marginBottom: 11,
  },

  sectionHeadingTitle: {
    fontSize: 19,
    fontWeight: "900",
  },

  sectionAction: {
    color: "#EF8354",
    fontSize: 12,
    fontWeight: "900",
  },

  categoryScroll: {
    paddingHorizontal: 20,
    paddingRight: 8,
  },

  categoryTile: {
    width: 92,
    minHeight: 95,
    borderRadius: 20,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },

  categoryTileActive: {
    borderWidth: 1.5,
    borderColor: "#F2C3B0",
  },

  categoryIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FCE9E2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  categoryIcon: {
    color: "#B95731",
    fontSize: 18,
    fontWeight: "900",
  },

  categoryTileText: {
    fontSize: 11,
    fontWeight: "900",
  },

  popularStack: {
    paddingHorizontal: 20,
  },

  popularRow: {
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  popularImage: {
    width: 76,
    height: 76,
    borderRadius: 17,
  },

  popularCopy: {
    flex: 1,
    marginHorizontal: 12,
  },

  popularName: {
    fontSize: 14,
    fontWeight: "900",
  },

  popularCategory: {
    fontSize: 10,
    marginTop: 4,
  },

  popularDescription: {
    fontSize: 10,
    lineHeight: 15,
    marginTop: 5,
  },

  popularArrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FCE9E2",
    alignItems: "center",
    justifyContent: "center",
  },

  popularArrowText: {
    color: "#B95731",
    fontSize: 15,
    fontWeight: "900",
  },

  dualActionRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 8,
  },

  dualActionCard: {
    flex: 1,
    minHeight: 152,
    borderRadius: 22,
    padding: 16,
    justifyContent: "space-between",
  },

  dualActionKicker: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  dualActionTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    lineHeight: 22,
    fontWeight: "900",
    maxWidth: 140,
  },

  dualActionArrow: {
    color: "#FFFFFF",
    fontSize: 20,
    alignSelf: "flex-end",
  },

  menuHeader: {
    paddingHorizontal: 20,
    paddingTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  menuHeaderTitle: {
    fontSize: 27,
    lineHeight: 31,
    fontWeight: "900",
    maxWidth: 300,
    marginTop: 5,
  },

  menuCartTop: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#173042",
    alignItems: "center",
    justifyContent: "center",
  },

  menuCartTopText: {
    fontSize: 20,
  },

  menuCartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: "#EF8354",
    alignItems: "center",
    justifyContent: "center",
  },

  menuCartBadgeText: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "900",
  },

  filterScroll: {
    paddingHorizontal: 20,
    marginTop: 14,
    paddingRight: 8,
  },

  filterChip: {
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 8,
  },

  filterChipText: {
    fontSize: 11,
    fontWeight: "900",
  },

  menuSummaryRow: {
    paddingHorizontal: 20,
    marginTop: 17,
    marginBottom: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  menuSummaryCount: {
    fontSize: 15,
    fontWeight: "900",
  },

  menuSummaryText: {
    fontSize: 10,
  },

  twoColumnGrid: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  productCard: {
    width: "48%",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 14,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  productImageWrap: {
    height: 142,
    position: "relative",
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  productHeart: {
    position: "absolute",
    top: 9,
    right: 9,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.94)",
    alignItems: "center",
    justifyContent: "center",
  },

  productHeartText: {
    color: "#B95731",
    fontSize: 18,
    fontWeight: "900",
  },

  productTag: {
    position: "absolute",
    left: 9,
    bottom: 9,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },

  productTagText: {
    color: "#173042",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  productBody: {
    padding: 11,
  },

  productName: {
    fontSize: 13,
    fontWeight: "900",
  },

  productCategory: {
    fontSize: 9,
    marginTop: 3,
  },

  productBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },

  productPrice: {
    color: "#EF8354",
    fontSize: 13,
    fontWeight: "900",
  },

  quickAdd: {
    width: 31,
    height: 31,
    borderRadius: 12,
    backgroundColor: "#173042",
    alignItems: "center",
    justifyContent: "center",
  },

  quickAddText: {
    color: "#FFFFFF",
    fontSize: 19,
    lineHeight: 19,
  },

  bottomCallout: {
    margin: 20,
    padding: 18,
    borderRadius: 22,
    backgroundColor: "#FCE9E2",
  },

  bottomCalloutSmall: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.3,
  },

  bottomCalloutTitle: {
    fontSize: 22,
    lineHeight: 25,
    fontWeight: "900",
    marginTop: 5,
  },

  bottomCalloutText: {
    fontSize: 11,
    lineHeight: 17,
    marginTop: 6,
  },

  detailScroll: {
    padding: 20,
    paddingBottom: 45,
  },

  detailBack: {
    marginBottom: 10,
    alignSelf: "flex-start",
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.88)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },

  detailBackText: {
    fontSize: 25,
    fontWeight: "700",
  },

  detailImageWrap: {
    height: 300,
    borderRadius: 25,
    overflow: "hidden",
    marginTop: -6,
  },

  detailImage: {
    width: "100%",
    height: "100%",
  },

  detailHeart: {
    position: "absolute",
    right: 14,
    top: 14,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.94)",
    alignItems: "center",
    justifyContent: "center",
  },

  detailHeartText: {
    color: "#B95731",
    fontSize: 21,
  },

  detailMetaRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 13,
  },

  detailTag: {
    backgroundColor: "#173042",
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },

  detailTagText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
  },

  detailTitle: {
    fontSize: 31,
    lineHeight: 35,
    fontWeight: "900",
    marginTop: 12,
  },

  detailPrice: {
    fontSize: 18,
    fontWeight: "900",
    marginTop: 7,
  },

  detailDescription: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
  },

  detailInfoBox: {
    borderRadius: 18,
    marginTop: 18,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  detailInfoSmall: {
    fontSize: 9,
  },

  detailInfoStrong: {
    fontSize: 12,
    fontWeight: "900",
    marginTop: 4,
  },

  detailSectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    marginTop: 20,
  },

  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 11,
  },

  qtyCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FCE9E2",
    alignItems: "center",
    justifyContent: "center",
  },

  qtyCircleText: {
    color: "#B95731",
    fontSize: 22,
    fontWeight: "800",
  },

  qtyNumber: {
    fontSize: 18,
    fontWeight: "900",
  },

  detailAddButton: {
    marginTop: 20,
    height: 57,
    borderRadius: 18,
    backgroundColor: "#173042",
    alignItems: "center",
    justifyContent: "center",
  },

  detailAddButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },

  detailSecondaryButton: {
    marginTop: 10,
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E6DED5",
    alignItems: "center",
    justifyContent: "center",
  },

  detailSecondaryText: {
    fontSize: 12,
    fontWeight: "900",
  },

  pageHeader: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  pageTitle: {
    fontSize: 30,
    fontWeight: "900",
    marginTop: 4,
  },

  countPill: {
    minWidth: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#173042",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  countPillText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 12,
  },

  savedBanner: {
    height: 175,
    marginHorizontal: 20,
    borderRadius: 24,
    overflow: "hidden",
  },

  savedBannerImage: {
    width: "100%",
    height: "100%",
  },

  savedBannerShade: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(18,30,37,0.48)",
  },

  savedBannerText: {
    position: "absolute",
    left: 17,
    right: 17,
    bottom: 17,
  },

  savedBannerKicker: {
    color: "#F8BE8E",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.4,
  },

  savedBannerTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "900",
    marginTop: 5,
  },

  favoriteList: {
    paddingHorizontal: 20,
    marginTop: 18,
  },

  favoriteRow: {
    minHeight: 135,
    borderRadius: 20,
    padding: 10,
    marginBottom: 12,
    flexDirection: "row",
    position: "relative",
  },

  favoriteImage: {
    width: 122,
    height: 115,
    borderRadius: 17,
  },

  favoriteInfo: {
    flex: 1,
    paddingHorizontal: 11,
    paddingTop: 2,
  },

  favoriteName: {
    fontSize: 15,
    fontWeight: "900",
    maxWidth: 155,
  },

  favoriteCategory: {
    fontSize: 10,
    marginTop: 4,
  },

  favoritePrice: {
    color: "#EF8354",
    fontSize: 13,
    fontWeight: "900",
    marginTop: 8,
  },

  favoriteAdd: {
    alignSelf: "flex-start",
    marginTop: 8,
    backgroundColor: "#173042",
    borderRadius: 11,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  favoriteAddText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
  },

  favoriteRemove: {
    width: 33,
    height: 33,
    borderRadius: 16,
    backgroundColor: "#FCE9E2",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 10,
    top: 10,
  },

  favoriteRemoveText: {
    color: "#B95731",
    fontSize: 16,
  },

  emptyState: {
    padding: 35,
    alignItems: "center",
  },

  emptyIconBubble: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FCE9E2",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyIcon: {
    fontSize: 28,
    color: "#B95731",
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: "900",
    marginTop: 13,
  },

  emptyText: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
    textAlign: "center",
    maxWidth: 280,
  },

  primarySmall: {
    marginTop: 17,
    backgroundColor: "#173042",
    paddingHorizontal: 17,
    paddingVertical: 11,
    borderRadius: 13,
  },

  primarySmallText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
  },

  cartScroll: {
    paddingBottom: 125,
  },

  cartBanner: {
    height: 150,
    marginHorizontal: 20,
    borderRadius: 22,
    overflow: "hidden",
  },

  cartBannerImage: {
    width: "100%",
    height: "100%",
  },

  cartBannerShade: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(16,28,36,0.46)",
  },

  cartBannerTitle: {
    position: "absolute",
    left: 17,
    right: 17,
    bottom: 16,
    color: "#FFFFFF",
    fontSize: 23,
    lineHeight: 26,
    fontWeight: "900",
    maxWidth: 260,
  },

  cartList: {
    paddingHorizontal: 20,
    marginTop: 17,
  },

  cartRow: {
    borderRadius: 19,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
  },

  cartImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },

  cartRowMain: {
    flex: 1,
    paddingLeft: 11,
  },

  cartRowTitle: {
    fontSize: 14,
    fontWeight: "900",
  },

  cartRowCategory: {
    fontSize: 9,
    marginTop: 3,
  },

  cartRowPrice: {
    fontSize: 12,
    fontWeight: "900",
    color: "#EF8354",
    marginTop: 7,
  },

  cartQtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
    gap: 10,
  },

  cartQtyButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#FCE9E2",
    alignItems: "center",
    justifyContent: "center",
  },

  cartQtyText: {
    color: "#B95731",
    fontSize: 18,
    fontWeight: "800",
  },

  cartQtyNumber: {
    fontSize: 13,
    fontWeight: "900",
  },

  promoCard: {
    marginHorizontal: 20,
    marginTop: 8,
    padding: 15,
    borderRadius: 20,
  },

  promoTitle: {
    fontSize: 13,
    fontWeight: "900",
  },

  promoRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  promoInput: {
    flex: 1,
    minHeight: 45,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 12,
  },

  promoApply: {
    marginLeft: 8,
    minWidth: 80,
    minHeight: 45,
    borderRadius: 12,
    backgroundColor: "#EF8354",
    alignItems: "center",
    justifyContent: "center",
  },

  promoApplyText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
  },

  summaryCard: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 17,
    borderRadius: 20,
  },

  summaryLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  summaryLabel: {
    fontSize: 12,
  },

  summaryValue: {
    fontSize: 12,
    fontWeight: "800",
  },

  summaryGreen: {
    color: "#5B8C6B",
    fontSize: 12,
    fontWeight: "900",
  },

  summaryDivider: {
    height: 1,
    backgroundColor: "#E8E0D9",
    marginVertical: 7,
  },

  summaryTotalLabel: {
    fontSize: 15,
    fontWeight: "900",
  },

  summaryTotal: {
    color: "#EF8354",
    fontSize: 18,
    fontWeight: "900",
  },

  checkoutButton: {
    height: 54,
    backgroundColor: "#173042",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 9,
  },

  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },

  bookingHero: {
    height: 190,
    marginHorizontal: 20,
    borderRadius: 24,
    overflow: "hidden",
  },

  bookingHeroImage: {
    width: "100%",
    height: "100%",
  },

  bookingHeroShade: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(10,24,31,0.42)",
  },

  bookingHeroCopy: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 18,
  },

  bookingHeroKicker: {
    color: "#F8BE8E",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.4,
  },

  bookingHeroTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    lineHeight: 29,
    fontWeight: "900",
    marginTop: 5,
    maxWidth: 280,
  },

  bookingLabel: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "900",
  },

  dateScroll: {
    paddingHorizontal: 20,
    paddingRight: 8,
  },

  dateChip: {
    minWidth: 82,
    paddingVertical: 12,
    borderRadius: 15,
    marginRight: 8,
    alignItems: "center",
  },

  dateChipText: {
    fontSize: 11,
    fontWeight: "900",
  },

  timeGrid: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  timeChip: {
    width: "31.5%",
    borderRadius: 14,
    paddingVertical: 12,
    borderWidth: 1,
    marginBottom: 9,
    alignItems: "center",
  },

  timeChipText: {
    fontSize: 10,
    fontWeight: "900",
  },

  guestStepperRow: {
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  guestHint: {
    fontSize: 11,
    flex: 1,
    paddingRight: 10,
  },

  guestStepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  guestButton: {
    width: 31,
    height: 31,
    borderRadius: 10,
    backgroundColor: "#FCE9E2",
    alignItems: "center",
    justifyContent: "center",
  },

  guestButtonText: {
    color: "#B95731",
    fontSize: 18,
    fontWeight: "900",
  },

  guestNumber: {
    fontSize: 14,
    fontWeight: "900",
  },

  tableList: {
    paddingHorizontal: 20,
  },

  tableChoice: {
    borderRadius: 20,
    padding: 9,
    marginBottom: 10,
    flexDirection: "row",
  },

  tableChoiceImage: {
    width: 100,
    height: 95,
    borderRadius: 15,
  },

  tableChoiceCopy: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: "center",
  },

  tableChoiceName: {
    fontSize: 14,
    fontWeight: "900",
  },

  tableChoiceMeta: {
    fontSize: 10,
    marginTop: 5,
  },

  tableChoiceSelect: {
    color: "#EF8354",
    fontSize: 9,
    fontWeight: "900",
    marginTop: 10,
  },

  roundOutline: {
    width: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: "#173042",
    alignItems: "center",
    justifyContent: "center",
  },

  roundOutlineText: {
    color: "#FFFFFF",
    fontSize: 18,
  },

  bookingConfirm: {
    marginHorizontal: 20,
    height: 55,
    borderRadius: 17,
    backgroundColor: "#EF8354",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 7,
  },

  bookingConfirmText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },

  bookingReceipt: {
    marginHorizontal: 20,
    borderRadius: 19,
    padding: 16,
    marginTop: 12,
  },

  bookingReceiptKicker: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.3,
  },

  bookingReceiptTitle: {
    fontSize: 19,
    fontWeight: "900",
    marginTop: 3,
  },

  bookingReceiptText: {
    fontSize: 11,
    marginTop: 4,
  },

  orderHistoryCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 15,
    marginBottom: 12,
  },

  orderTopLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  orderId: {
    fontSize: 13,
    fontWeight: "900",
  },

  orderDate: {
    fontSize: 10,
    marginTop: 3,
  },

  statusChip: {
    borderRadius: 10,
    backgroundColor: "#E7F0EA",
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  statusChipText: {
    color: "#557360",
    fontSize: 9,
    fontWeight: "900",
  },

  orderMiniItems: {
    marginTop: 13,
    gap: 8,
  },

  orderMiniItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  orderMiniImage: {
    width: 34,
    height: 34,
    borderRadius: 10,
  },

  orderMiniText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 10,
  },

  orderBottomLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 13,
  },

  orderTotal: {
    fontSize: 14,
    fontWeight: "900",
  },

  orderTrackButton: {
    backgroundColor: "#173042",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 11,
  },

  orderTrackButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
  },

  trackingHero: {
    height: 220,
    marginHorizontal: 20,
    borderRadius: 24,
    overflow: "hidden",
  },

  trackingHeroImage: {
    width: "100%",
    height: "100%",
  },

  trackingHeroShade: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(11,22,29,0.48)",
  },

  trackingHeroCopy: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 18,
  },

  trackingKicker: {
    color: "#F8BE8E",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.3,
  },

  trackingTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
    marginTop: 5,
  },

  trackingSub: {
    color: "#DCE4E8",
    fontSize: 11,
    marginTop: 5,
  },

  timelineCard: {
    marginHorizontal: 20,
    marginTop: 14,
    padding: 17,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },

  timelineRow: {
    flexDirection: "row",
    marginBottom: 17,
  },

  timelineDot: {
    width: 29,
    height: 29,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  timelineDotText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
  },

  timelineCopy: {
    flex: 1,
    marginLeft: 10,
    paddingTop: 1,
  },

  timelineLabel: {
    fontSize: 12,
    fontWeight: "900",
  },

  timelineTime: {
    fontSize: 10,
    marginTop: 4,
  },

  trackingOrderCard: {
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 20,
    padding: 17,
  },

  trackingOrderHeading: {
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 10,
  },

  trackingOrderLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  trackingOrderItem: {
    fontSize: 11,
    flex: 1,
    paddingRight: 8,
  },

  trackingOrderPrice: {
    fontSize: 11,
    fontWeight: "800",
  },

  profileCover: {
    height: 270,
    overflow: "hidden",
    position: "relative",
  },

  profileCoverImage: {
    width: "100%",
    height: "100%",
  },

  profileCoverShade: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(9,18,24,0.45)",
  },

  profileCoverTop: {
    position: "absolute",
    top: 18,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  profileCoverKicker: {
    color: "#F8BE8E",
    fontSize: 9,
    letterSpacing: 1.4,
    fontWeight: "900",
  },

  profileSettingsCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)",
    alignItems: "center",
    justifyContent: "center",
  },

  profileSettingsText: {
    color: "#FFFFFF",
    fontSize: 15,
  },

  profileCoverBottom: {
    position: "absolute",
    left: 20,
    bottom: 19,
    right: 20,
  },

  profileCoverName: {
    color: "#FFFFFF",
    fontSize: 31,
    fontWeight: "900",
  },

  profileCoverEmail: {
    color: "#DDE5E8",
    fontSize: 11,
    marginTop: 4,
  },

  profileStats: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: -22,
    position: "relative",
    zIndex: 3,
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    padding: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  profileStatBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },

  profileStatNumber: {
    color: "#173042",
    fontSize: 17,
    fontWeight: "900",
  },

  profileStatLabel: {
    color: "#7A7F87",
    fontSize: 9,
    marginTop: 2,
    fontWeight: "800",
  },

  themeStrip: {
    paddingHorizontal: 20,
  },

  themeTitle: {
    color: "#7A7F87",
    fontSize: 10,
    fontWeight: "900",
    marginBottom: 9,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },

  themeChip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 8,
  },

  themeChipActive: {
    borderWidth: 1.5,
    borderColor: "#EF8354",
  },

  themeDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 6,
  },

  themeChipText: {
    color: "#2A3340",
    fontSize: 10,
    fontWeight: "800",
  },

  themeChipTextActive: {
    color: "#B95731",
  },

  profileMenu: {
    paddingHorizontal: 20,
    marginTop: 16,
    gap: 9,
  },

  profileMenuRow: {
    minHeight: 64,
    borderRadius: 17,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
  },

  profileMenuIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: "#FCE9E2",
    alignItems: "center",
    justifyContent: "center",
  },

  profileMenuIconText: {
    color: "#B95731",
    fontSize: 16,
    fontWeight: "900",
  },

  profileMenuCopy: {
    flex: 1,
    marginLeft: 11,
  },

  profileMenuTitle: {
    fontSize: 12,
    fontWeight: "900",
  },

  profileMenuSub: {
    fontSize: 9,
    marginTop: 3,
  },

  profileMenuArrow: {
    color: "#9AA2A9",
    fontSize: 23,
    marginRight: 5,
  },

  logoutRow: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F0B59D",
    borderRadius: 16,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  logoutText: {
    color: "#B95731",
    fontSize: 12,
    fontWeight: "900",
  },

  editProfileHero: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 28,
    gap: 14,
  },

  editProfileImage: {
    width: 74,
    height: 74,
    borderRadius: 25,
  },

  editProfileTitle: {
    fontSize: 24,
    fontWeight: "900",
  },

  editProfileSub: {
    maxWidth: 235,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },

  managerHero: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    backgroundColor: "#173042",
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  managerKicker: {
    color: "#F8BE8E",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.4,
  },

  managerTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    lineHeight: 31,
    fontWeight: "900",
    marginTop: 4,
  },

  managerSub: {
    color: "#D3DDE1",
    fontSize: 11,
    marginTop: 4,
    maxWidth: 230,
  },

  managerBadge: {
    backgroundColor: "#E7F0EA",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  managerBadgeText: {
    color: "#557360",
    fontSize: 8,
    fontWeight: "900",
  },

  managerStatsGrid: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 12,
  },

  managerStat: {
    width: "48.5%",
    borderRadius: 20,
    padding: 16,
    marginBottom: 10,
    minHeight: 105,
  },

  managerStatKicker: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 9,
    fontWeight: "900",
  },

  managerStatNumber: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 12,
  },

  managerEmpty: {
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 17,
  },

  managerEmptyTitle: {
    fontSize: 14,
    fontWeight: "900",
  },

  managerEmptyText: {
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
  },

  managerOrder: {
    marginHorizontal: 20,
    marginBottom: 9,
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  managerOrderId: {
    fontSize: 12,
    fontWeight: "900",
  },

  managerOrderMeta: {
    fontSize: 9,
    marginTop: 4,
  },

  managerStatus: {
    color: "#EF8354",
    fontSize: 9,
    fontWeight: "900",
    marginTop: 6,
  },

  managerAction: {
    backgroundColor: "#173042",
    borderRadius: 11,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginLeft: 10,
  },

  managerActionText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
  },

  managerReservation: {
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 16,
  },

  managerReservationTitle: {
    fontSize: 14,
    fontWeight: "900",
  },

  managerReservationText: {
    fontSize: 10,
    lineHeight: 16,
    marginTop: 5,
  },
});
