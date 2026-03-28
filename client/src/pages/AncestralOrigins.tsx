/*
 * ULKATCHO FIRST NATION — Ancestral Origins Page
 * Palette: White bg | Navy #1a2e5a | Steel blue #c9a227
 * Layout: Simple header → long-form text with float-right photos
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SimplePageHeader from "@/components/SimplePageHeader";
import { Link } from "wouter";

const PORTRAIT_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/46917-1605x2048_b789a29d.jpg";
const PORTRAIT_2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/55694-edited-683x1024_2499b117.jpg";

export default function AncestralOrigins() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#c8d5e0" }}>
      <Navbar />

      <SimplePageHeader
        heading="Ancestral Origins"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Ancestral Origins" },
        ]}
      />

      {/* Content */}
      <div className="container py-14">
        <div className="max-w-3xl mx-auto">

          {/* Ulkatcho and Tsilhqot'in People in Bella Coola Valley */}
          <section className="mb-14">
            <h2 className="mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem", color: "#1a2e5a" }}>
              Ulkatcho and Tŝilhqot'in People in Bella Coola Valley
            </h2>

            {/* Float-right portrait */}
            <img
              src={PORTRAIT_1}
              alt="Historical portrait"
              className="hidden md:block"
              style={{
                float: "right",
                width: "240px",
                marginLeft: "1.5rem",
                marginBottom: "1rem",
                borderRadius: "6px",
                border: "1px solid #e0e8f0",
              }}
            />

            <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              Nuxalk Elders Clayton Mack and Mabel Hall both recorded stories describing how Ulkatcho and Tsilhqot'in families have ancestral family ties with the Nuxalk of Bella Coola Valley at Stuie (Stwic) and Noosgulch (Nus'qulst).
            </p>
            <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              Ulkatcho Elder Benny Jack told a story about Chief ʔAnahim leaving Bella Coola and taking his people to the Chilcotin Plateau.
            </p>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid #e0e8f0", marginBottom: "3rem", clear: "both" }} />

          {/* Mabel's Hall */}
          <section className="mb-14">
            <h2 className="mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem", color: "#1a2e5a" }}>
              Mabel's Hall
            </h2>
            <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              The Clellamin family has its ancestral origins in Stwic, which is one of our former Nuxalk villages. We owe our name Clellamin which came from our grandfather Chief Tl'alamn who was buried at Stwic. The Clellamin House once stood in Nus'qulst and later in Q'umk'uts near the mouth of the Bella Coola River.
            </p>
            <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              The Clellamin House was very rich in history. It told us what happened before the white man ever came to our land. It also told of what happened many years ago when this world was first created. It told of the great flood that happened a long time ago.
            </p>
            <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              Clellamin House was a gathering place for many potlatches and other traditional gatherings that Chief Clellamin had. Chief Clellamin was married to "Qap" – Rosie Clallamin, and he died in 1893 at the age of fifty. He had a total of eight potlatches.
            </p>
            <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              Qap died in 1926 at the estimated age of 85 years. She was known all that time as an Indian doctor, because she had known all our traditional medicines.
            </p>
            <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              Our family relations extend to the Central Interior. They include the Squinas family, the Alphonse (ʔAnahim) family, the Alexis family, the Stillas (St'ls) family and the Stwic family whose history is unknown. The members of these five families are very closely related to Chief Clellamin.
            </p>
            <p className="leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              Chief ʔAnahim was married to a woman who was from the Interior. While she lived here she was not used to our country. She persuaded ʔAnahim to move from our country and ʔAnahim agreed to move back to where she had come from. When they moved, many of our people moved with them.
            </p>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid #e0e8f0", marginBottom: "3rem" }} />

          {/* Clallamin (Tl'alamn) House */}
          <section className="mb-14">
            <h2 className="mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem", color: "#1a2e5a" }}>
              Clallamin (Tl'alamn) House
            </h2>

            {/* Float-right portrait */}
            <img
              src={PORTRAIT_2}
              alt="Historical portrait"
              className="hidden md:block"
              style={{
                float: "right",
                width: "200px",
                marginLeft: "1.5rem",
                marginBottom: "1rem",
                borderRadius: "6px",
                border: "1px solid #e0e8f0",
              }}
            />

            <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              The House of Chief Clallamin once stood in the village of Nus'qulst. It later rebuilt at Q'umk'uts (the Nuxalk village at the mouth of the Bella Coola River). This occurred between 1870 and the early 1890s after Nus'qulst village was deserted around 1880. Clayton Mack said his mother was the last Nuxalk baby born at Nus'qulst.
            </p>
            <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              Nus'qulst means the place of jadeite (sq'alstutlh), the green stone used for axes. Nus'qulst also refers to the mountain at the mouth of Nus'qulst (Noosgulch) River known as Mount Nusatsum. This mountain dominates the valley and has many peaks covered with snow year round.
            </p>
            <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              As a supernatural being, Nus'qulst descended to earth as a person wearing a hat with a flat top and two snakes running around its brim. He landed first at Bute Inlet and moved to Bella Coola Valley before he turned to stone. As a mountain Nus'qulst became a landing place for other ancestors, and became the crest of their descendants.
            </p>
            <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              Like the ancestral Clelliman House at Nus'qulst, the House of Clellamin at Q'umk'uts had five peaks representing the peaks of Mount Nusatsum. At the top of each peak on Clellamin House was a knob representing the rock to which each ancestral canoe was tied when it came to rest during an early flood.
            </p>
            <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              From within the central gable of Clelliman House two mountain goats, one male and one female, looked out on the village. The other peaks were populated by carved deer and wolves. Above the door was the carving of a man with a hammer. His arms could move up and down and bring the hammer down on a maple board making a sound that could be heard throughout the village. Fixed to the front wall on each side of the door were two coppers and a carved figure in wood. On the inside wall was a painting of a grizzly bear, a crest of the Clellamin ancestral family.
            </p>
            <p className="leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              Like all Nuxalk houses, the House of Clellamin was not only a dwelling place but a ceremonial place where guests were invited to witness weddings, funeral ceremonies, the taking of names, and the enactment of winter dances. The carved figure above the door represented a speak (alxw), who was sent by the host to invite guests to the potlatch. The loud hammering of the speak on the maple board signified that the potlatch would begin.
            </p>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid #e0e8f0", marginBottom: "3rem", clear: "both" }} />

          {/* Benny Jack */}
          <section className="mb-14">
            <h2 className="mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem", color: "#1a2e5a" }}>
              Benny Jack – The Story of Chief ʔAnahim
            </h2>
            <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              This is the story of Chief ʔAnahim as my grandfather told it to me many years ago. As a little boy I heard about the people who lived in this country before us. There are many long and difficult names white men gave our people who lived in this country and spoke different languages. They would probably say Chief ʔAnahim was a Kwakiutl or a Nootka Indian. They drew maps to show where the villages were, and where the people hunted and fished. They drew maps that were supposed to show where the people lived who spoke the same language, and those who spoke a different tongue. According to those who studied the languages, the Bella Coola Indians spoke Wakashan and Chinook. We would say they spoke Salish and Chinook.
            </p>
            <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              Chief ʔAnahim was a Bella Coola Indian and lived on the coast where his forefathers fished in the waters at the foot of the mountains. His people the Kwakiutl, lived to the north in the valleys that drain into the waters of the Pacific. Several times each year there were occasions to celebrate. A potlatch would bring together Chief ʔAnahim's people and the Bella Coola tribe. They came from the north and from the south to Bella Coola villages to mourn the dead, to honour the great, to hold council, to dance and to carry on their ancient and traditional rituals. Indeed, Bella Coola was a good place in which to live between the sea that yielded its fish and the mountains that gave their protection. The trees stood tall and proud, and so did the long houses and totems in the villages by the seaside and along the Bella Coola River. The winters were long and wet, and the mist hung heavy in the valleys.
            </p>
            <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              Chief ʔAnahim had eyes for a woman who did not belong to his people. She had been raised in the rugged Chilcotin country. Chief ʔAnahim married her and brought her to Bella Coola, but this country was not like Chezacut where she had been brought up. The land along the coast was misty and moist. She disliked the endless days of rain and gloomy darkness among the tall trees. She was unhappy and with her strong mind she persuaded her husband to move out of this part of the country.
            </p>
            <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              The whole band followed them. They crossed the mountains and came to live at Anahim Lake. There the sky was high and wide. The air was crisp and the frosty ground did not allow much to grow. Even Chief ʔAnahim had not found the land without blemish. His catches were not as great as the wealth of fish he had hoped for. The lake would not always give its riches. One day Chief ʔAnahim's wife heard about a better and richer land. The Secwepemc Indians used to make their homes there. There, the grass would grow thicker and taller for their horses. They would reap what they had sown, a good harvest from a good land.
            </p>
            <p className="leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              Again Chief ʔAnahim agreed to move. The whole band came to live near Alexis Creek. There, at last, ʔAnahim's wife found the country she liked. She called her new home The Anaham Rancheree. Today her grandchildren still live at Alexis Creek.
            </p>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid #e0e8f0", marginBottom: "3rem" }} />

          {/* Clayton Mack */}
          <section className="mb-14">
            <h2 className="mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem", color: "#1a2e5a" }}>
              Clayton Mack – Ulkatcho Family Ties in Bella Coola
            </h2>
            <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              Quite a few of the old Ulkatcho people came from Bella Coola. Charlie West, Antone Capoose, Old Cahoose, Domas Squinas, Baptiste Stillas, Captain Harry, Old Alexie (Alexis) and Old Chantyman. They all spoke the Bella Coola language.
            </p>
            <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              Their families all came from Noosgulch (Nus'qulst) Village. That's where the Canoe Crossing Bridge goes across the Bella Coola River.
            </p>
            <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              Their names came from Bella Coola as well. From Nus'qulst Mountain. That's the one they call Mount Nusatsum.
            </p>
            <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              Charlie West's Bella Coola name was Mucklehoose. Mucklehoose means "One side of the mountain red", like the first light of day. Cahoose means "Frost on the mountain"; Capoose means "Bald part of the mountain where no trees grow"; Squinas means "Biggest mountain"; Stillas means "bottom of the mountain on one side where berries grow".
            </p>
            <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              Nus'qulst was a good place for a village. There's good sunshine there and it was just a short way to walk to Tanya Lakes. Sometimes years ago when no fish came up the Bella Coola River and the people were starving, they went up to Tanya Lakes to catch lots of salmon.
            </p>
            <p className="leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              That's why so many Nus'qulst people are in Anahim Lake. They get mixed up with the people there and get married.
            </p>
          </section>

          {/* Explore More */}
          <div className="text-center pt-8 pb-4">
            <h2 className="mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2e5a" }}>
              Explore More
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/history-of-ulkatcho-first-nation">
                <button className="ufn-btn-primary">
                  History of UFN
                </button>
              </Link>
              <Link href="/travellers-entrepreneurs">
                <button className="ufn-btn-outline">
                  Travellers & Entrepreneurs
                </button>
              </Link>
              <Link href="/vision-future">
                <button className="ufn-btn-outline">
                  Vision & Future
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
