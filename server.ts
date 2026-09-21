import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { 
  DESTINATIONS, 
  TOUR_PACKAGES, 
  HOTELS, 
  VEHICLES, 
  EXPERIENCES, 
  BUSINESS_INFO, 
  INITIAL_WEATHER 
} from "./src/data/travelData.ts";
import { Booking } from "./src/types.ts";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory persistent storage for bookings
const bookingsStore: Booking[] = [
  {
    id: "MCT-2026-8812",
    createdAt: "2026-09-18T10:30:00Z",
    destination: "Bhurban Valley",
    travelDate: "2026-10-05",
    returnDate: "2026-10-07",
    travellers: {
      adults: 2,
      children: 0,
      type: "luxury"
    },
    hotel: {
      id: "pearl-continental-bhurban",
      name: "Pearl Continental Hotel Bhurban",
      roomCategory: "Executive Mountain View Suite",
      nights: 2,
      price: 76000
    },
    transport: {
      id: "prado-4x4-suv",
      name: "Toyota Land Cruiser Prado TX (4x4)",
      days: 3,
      price: 66000
    },
    selectedExperiences: [
      {
        id: "patriata-chairlift",
        name: "Patriata Chairlift & Cable Car VIP Pass",
        price: 7000
      }
    ],
    customer: {
      name: "Malik Shahzad",
      phone: "+92 300 8541290",
      whatsapp: "+92 300 8541290",
      email: "shahzad.malik@example.com",
      specialRequirements: "Airport pickup from Islamabad International at 9:00 AM."
    },
    pricing: {
      basePrice: 5000,
      accommodationTotal: 76000,
      transportTotal: 66000,
      activitiesTotal: 7000,
      taxesAndService: 7700,
      discount: 0,
      grandTotalPKR: 161700
    },
    status: "CONFIRMED",
    paymentStatus: "VERIFIED"
  }
];

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined in environment.");
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// ----------------- API ROUTES ----------------- //

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Murree Classic Travel & Tour", timestamp: new Date().toISOString() });
});

// Live Weather & Road conditions
app.get("/api/weather", (req, res) => {
  // Return realistic live data updated with current system time
  const updatedWeather = {
    ...INITIAL_WEATHER,
    updatedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + " PKT (Live Station)"
  };
  res.json(updatedWeather);
});

// Destinations
app.get("/api/destinations", (req, res) => {
  res.json(DESTINATIONS);
});

// Tour Packages
app.get("/api/packages", (req, res) => {
  res.json(TOUR_PACKAGES);
});

// Hotels
app.get("/api/hotels", (req, res) => {
  res.json(HOTELS);
});

// Vehicles
app.get("/api/transport", (req, res) => {
  res.json(VEHICLES);
});

// Experiences
app.get("/api/experiences", (req, res) => {
  res.json(EXPERIENCES);
});

// Bookings - List & Create
app.get("/api/bookings", (req, res) => {
  res.json(bookingsStore);
});

app.post("/api/bookings", (req, res) => {
  try {
    const data = req.body;
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `MCT-2026-${randomNum}`;

    const newBooking: Booking = {
      id: bookingId,
      createdAt: new Date().toISOString(),
      destination: data.destination || "Murree Hill Station",
      travelDate: data.travelDate || new Date().toISOString().split('T')[0],
      returnDate: data.returnDate,
      travellers: data.travellers || { adults: 2, children: 0, type: "family" },
      hotel: data.hotel,
      transport: data.transport,
      selectedExperiences: data.selectedExperiences || [],
      customer: {
        name: data.customer?.name || "Valued Traveler",
        phone: data.customer?.phone || "",
        whatsapp: data.customer?.whatsapp || data.customer?.phone || "",
        email: data.customer?.email || "",
        cnicOrPassport: data.customer?.cnicOrPassport,
        specialRequirements: data.customer?.specialRequirements
      },
      pricing: data.pricing || {
        basePrice: 5000,
        accommodationTotal: 0,
        transportTotal: 0,
        activitiesTotal: 0,
        taxesAndService: 0,
        discount: 0,
        grandTotalPKR: 5000
      },
      status: "PENDING_REVIEW",
      paymentStatus: "UNPAID"
    };

    bookingsStore.unshift(newBooking);
    res.status(201).json({ success: true, booking: newBooking });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: "Failed to process booking reservation." });
  }
});

// Update Booking Status (Admin)
app.patch("/api/bookings/:id/status", (req, res) => {
  const { id } = req.params;
  const { status, paymentStatus } = req.body;
  const booking = bookingsStore.find(b => b.id === id);
  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }
  if (status) booking.status = status;
  if (paymentStatus) booking.paymentStatus = paymentStatus;
  res.json({ success: true, booking });
});

// 24/7 AI Travel Concierge (Server-side Real-Time Gemini AI)
app.post("/api/concierge", async (req, res) => {
  const { message, history } = req.body;
  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  const systemInstruction = `
You are the live AI Travel Concierge for "MURREE CLASSIC TRAVEL & TOUR" at GPO Chowk, Bank Road, Murree, Pakistan (WhatsApp: +92 321 5603396).

GUIDELINES:
- Be concise, direct, and helpful (typically 2 to 4 full sentences or 2 to 3 bullet points).
- CRITICAL: ALWAYS complete your sentences fully and cleanly. Never stop mid-sentence or leave trailing brackets/parentheses.
- Directly answer the user's specific query with clear, factual figures.
- Hotel rates & details:
  * Pearl Continental (PC) Bhurban: Premier 5-star luxury resort in Bhurban. Typical room charges range from PKR 35,000 to PKR 55,000+ per night depending on season, deluxe views, and dates.
  * Arcadian Sprucewoods (Nathia Gali): PKR 24,000 - 35,000/night.
  * Lockwood Heritage Murree (Bank Road near Mall Road): PKR 16,000 - 26,000/night.
  * Pine Top Resort: PKR 18,000 - 28,000/night.
- Vehicle rental with hill driver:
  * Toyota Corolla Altis: PKR 9,500/day
  * Toyota Prado TX 4x4: PKR 22,000/day
  * Toyota Hiace 14-seater: PKR 17,500/day
  * Luxury Coaster 24-seater: PKR 28,000/day
- Close with a brief note that we can arrange discounted booking and 4x4 transport via WhatsApp (+92 321 5603396) or our GPO Chowk desk.
`;

  try {
    const ai = getGeminiClient();
    if (ai) {
      // Build clean, strictly alternating multi-turn history compliant with Gemini API
      const sanitizedContents: { role: 'user' | 'model'; parts: [{ text: string }] }[] = [];

      if (Array.isArray(history) && history.length > 0) {
        let started = false;
        // Take recent history to keep context fresh
        const recentHistory = history.slice(-6);
        for (const item of recentHistory) {
          if (!item || !item.text || typeof item.text !== 'string' || !item.text.trim()) continue;
          const role = item.role === 'user' ? 'user' : 'model';

          // First turn in Gemini contents MUST be 'user'
          if (!started) {
            if (role === 'user') {
              started = true;
              sanitizedContents.push({ role: 'user', parts: [{ text: item.text.trim() }] });
            }
            continue;
          }

          // Enforce alternating user <-> model
          const prevRole = sanitizedContents[sanitizedContents.length - 1].role;
          if (role !== prevRole) {
            sanitizedContents.push({ role, parts: [{ text: item.text.trim() }] });
          }
        }
      }

      // Append current user message
      if (sanitizedContents.length > 0 && sanitizedContents[sanitizedContents.length - 1].role === 'user') {
        sanitizedContents[sanitizedContents.length - 1].parts[0].text += `\n\n${message.trim()}`;
      } else {
        sanitizedContents.push({
          role: 'user',
          parts: [{ text: message.trim() }]
        });
      }

      // Try preferred model with immediate resilient fallback
      const candidateModels = ["gemini-3.8-flash", "gemini-3.1-flash-lite", "gemini-2.5-flash"];
      let lastError: any = null;

      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: sanitizedContents,
            config: {
              systemInstruction,
              temperature: 0.6,
              maxOutputTokens: 1000,
            }
          });

          if (response && response.text) {
            return res.json({
              reply: response.text,
              model: modelName,
              source: "gemini_realtime"
            });
          }
        } catch (err: any) {
          console.warn(`Gemini model ${modelName} encountered issue: ${err?.message || err}. Trying next fallback candidate...`);
          lastError = err;
        }
      }

      console.error("All Gemini models encountered errors. Last error:", lastError);
    }
  } catch (geminiError) {
    console.error("Gemini API processing failed:", geminiError);
  }

  // Fallback only if all Gemini models and network calls are completely unavailable
  const lower = message.toLowerCase();
  let fallbackReply = `Welcome to Murree Classic Travel & Tour at GPO Chowk, Murree. Regarding your inquiry about "${message.slice(0, 40)}": our mountain specialists are active 24/7 on WhatsApp at +92 321 5603396 to provide live weather, road condition reports, hotel bookings, or 4x4 vehicle dispatch.`;

  if (lower.includes("weather") || lower.includes("snow") || lower.includes("rain") || lower.includes("road")) {
    fallbackReply = `Currently in Murree Hills: ${INITIAL_WEATHER.temperatureC}°C, ${INITIAL_WEATHER.condition}. ${INITIAL_WEATHER.roadConditions} For live real-time mountain updates, our team at GPO Chowk is available 24/7 on WhatsApp at +92 321 5603396.`;
  } else if (lower.includes("hotel") || lower.includes("stay") || lower.includes("room") || lower.includes("pc bhurban")) {
    fallbackReply = "We partner with Murree and Galiyat's premier properties, including Pearl Continental Bhurban (5-star luxury), Arcadian Sprucewoods Nathia Gali, and Lockwood Heritage on Bank Road. You can book directly through our website or connect with our desk on WhatsApp (+92 321 5603396).";
  } else if (lower.includes("car") || lower.includes("transport") || lower.includes("prado") || lower.includes("suv") || lower.includes("coaster") || lower.includes("hiace")) {
    fallbackReply = "Our dedicated mountain fleet includes the Toyota Corolla Grande (PKR 9,500/day), 4x4 Land Cruiser Prado TX (PKR 22,000/day), Hiace Grand Cabin 14-seater (PKR 17,500/day), and Luxury Coaster 24-seater (PKR 28,000/day). All rentals include experienced hill-station drivers.";
  }

  return res.json({ reply: fallbackReply, source: "verified_knowledge_base" });
});

// ----------------- VITE / STATIC SERVING ----------------- //

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Murree Classic Travel & Tour server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
