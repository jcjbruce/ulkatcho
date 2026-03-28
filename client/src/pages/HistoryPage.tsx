/*
 * ULKATCHO FIRST NATION — History of UFN Page
 * Design: Steel Blue / Navy / Gold — Hero + breadcrumb + long-form text
 */

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SimplePageHeader from "@/components/SimplePageHeader";
import { Link } from "wouter";
import { useSiteContent } from "@/hooks/useSiteContent";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/ulkatcho-sunset-enhanced_6d1d73f6.jpg";
const VILLAGE_1927 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/swannell_ulkatcho_village_1927-2048x1483_7d1b0ae5.jpg";
const ANAHIM_LAKE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/anahim-lake-hq_1d67aa2e.webp";

const paras = (text: string) =>
  text.split("\n\n").filter(Boolean).map((p, i) => (
    <p key={i} className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
      {p}
    </p>
  ));

export default function HistoryPage() {
  const { get } = useSiteContent("history", {
    "hero.heading": "History of Ulkatcho First Nation",
    "section_1.label": "MAP OF OUR TRADITIONAL TERRITORY",
    "section_1.heading": "Ulkatcho First Nation",
    "section_1.body": "The Ulkatcho First Nation is one of four communities making up the Dakelh or Southern Carrier tribal nation in central British Columbia. The other Dakelh communities are Lhoosk'us Dene, Nazko, and Lhtalo Dene (formerly Red Bluff). The Ulkatcho community and offices are located in Anahim Lake.\n\nIn earlier times before British Columbia became colonized by Euro-Canadians, Ulkatcho Village was an important potlatching and trading centre at the junction of many trading trails heading north to Chezlatta, east to the Fraser River, west to the Central Coast, and north to the Chilcotin Plateau. The village consisted of a potlatch house and several temporary brush shelters on the shore of Gatcho Lake about 80 kilometres north of Anahim Lake.\n\nThere were similar potlatch houses in other parts of Ulkatcho territory. Mac Squinas said his grandfather Captain Harry Alexie told him about a potlatch house at Qualcho Lake, west of Ulkatcho Village.\n\nTheresa Holte said her Elders told her about the potlatch at Nagwuntl'oo in Anahim Lake. These potlatch houses were important gathering sites for Ulkatcho people to come together to celebrate and trade.",
    "section_2.heading": "Our People",
    "section_2.body": "Most of the year Ulkatcho people lived in extended family groups isolated from each other as they moved about the country hunting and fishing and gathering the food and materials they needed for survival. Each family had its own fishing, hunting and trapping areas and winter quarters, usually near a lake abundant with fish.\n\nThere were also a number of gathering sites throughout the territory where people came from of their remote family homes to work together to hunt, fish and preserve food for the winter.\n\nUlkatcho families were extremely mobile and had the ability to pick up and move hundreds of kilometres across the country on very short notice when it was time to harvest the resources at a particular location. Throughout the year a family might travel from the Fraser River to the Central Coast, and from Chezlatta to the Potato Mountains in Tŝilhqot'in territory.",
    "section_3.heading": "Fat of the Land",
    "section_3.body": "In the Dakelh language, Ulkatcho means \"fat of the land\". This name came about because Gatcho Lake and nearby lakes were full of fish and the surrounding area was rich in game and fur bearing animals.\n\nThe Elders say one of the important reasons people came together at Ulkatcho Village was to hunt caribou. A large group of people was needed for the success of the hunt. They worked together to build drift fences and herd the animals into a place where they could be killed and the meat cut up. The late Chief Jimmy Stillas said all the animals in a small herd would be killed and the meat shared among the whole community.",
    "section_4.heading": "Tanya Lakes (Taintezli or Tanyez Tezdli)",
    "section_4.body": "Tanya Lakes, known as Taintezli or Tanyez Tezdli in the Ulkatcho dialect, was another important gathering site along the Nuxalk-Dakelh Grease Trail west of Ulkatcho Village. The large camping grounds west of Tanya Lakes known as Taintezli (where the slow water of the lake becomes the fast water of the creek) was at the fork of the grease trails to Kimsquit and Bella Coola Valley. One fork followed Takia Creek to the Dean River, Salmon House Falls and Kimsquit, and the other trail went over the Rainbow Mountains to Bella Coola. Tanya Lakes and Salmon House Falls were important salmon fishing sites in Ulkatcho territory.\n\nWhen the spring salmon and steelhead arrived in Takia Creek to spawn at Taintezli in August, many Ulkatcho families along with their Dakelh, Nuxalk and Tsilhqot'in neighbours camped there to catch and dry the fish. Several families had smokehouses at Taintesli. There were other smokehouses further down Takia Creek closer to where the big spring salmon were caught in the river, and smokehouses at Salmon House Falls on the Dean River.\n\nThese gatherings like the one at Taintesli were important social times. Traditional games like lahal and other competitions like running races, horseback races, wrestling matches, spear-throwing and shooting contests were held. Lahal was a serious gambling game and Chief Jimmy Stillas said sometimes a person lost their horse in a lahal game and had to walk home.",
    "section_5.heading": "Family Ties",
    "section_5.body": "Ulkatcho people have family ties with neighbouring Dakelh communities of Chezlatta, Lhoosk'us Dene, Lhtalo Dene (Red Bluff) and Nazko. Also a significant number of Ulkatcho families are related to the Tŝilhqot'in and Nuxalk as well.\n\nOne of the names given to the Ulkatchot'en by their Dakelh neighbours was Nechowt'en which means \"Dakelh people mixed with Tŝilhqot'in\".\n\nFamous Nuxalk game guide and grizzly bear hunter Clayton Mack, whose first wife, Cecelia \"Doll\" Capoose, was an Ulkatcho woman from Abuntlet, once described Anahim Lake as the place where Indigenous people from different backgrounds \"mixed and lived\". This diversity can be seen as one of the strengths of the Ulkatcho community. Ulkatchot'en people embrace many traditions and points of view and develop their own unique cultural perspective from these choices.",
    "section_6.heading": "Nagwuntl'oo",
    "section_6.body": "At the time of first contact with Euro-Canadian society, the village of Nagwuntl'oo stood on the south shore of Little Anahim Lake. Chief ʔAnahim was the leader of this community. Like many Ulkatcho families, ʔAnahim was related to the Nuxalk at Nus'qulst (Noosgulch). During the smallpox epidemic of 1862, many people at Nagwuntl'oo died from the disease. After the Chilcotin War of 1864, Chief ʔAnahim moved east to Alexis Creek for better growing conditions, while other members of the Tsilhgot'in community remained in the West Chilcotin. These Tŝilhqot'in families, including the Sulin, Guichon and Hunlins, remained at Nimpo Lake, Morrison Meadow, Towdystan, Bluff and One Eye Lake.\n\nTheresa Holte said her grandmother told her stories about the potlatch house at Nagwuntl'oo. \"Way before my grampa (Domas Squinas), they used to have feather dances at Nagwuntl'oo potlatch house. They would play the drum and sing. Feathers used to fly up. It was way before the war broke out between the Tŝilhqot'in and the Waddington survey men. They used to set fish traps in the lake at Anahim Point.\"",
    "section_7.heading": "Anahim Lake",
    "section_7.body": "After Chief ʔAnahim moved east, Chief Domas Squinas established his home at Anahim Lake. He built a ranch there with his wife Christine from Chezlatta, and they raised their family of three boys, Louie, Donald and Thomas, and daughter Belonic (Veronica). Their closest neighbours were Antone Capoose at Abuntlet Lake and the Tsilhqot'in families to the East.\n\nAs the West Chilcotin became settled by non-indigenous homesteaders and ranchers in the early 1900s, other Ulkatcho families moved to Anahim Lake to take advantage of job opportunities and schooling for their children. When the Canadian government established the reserve system to set land aside for Indigenous people in the Chilcotin, the Squinas ranch at Anahim Lake became a reserve for the whole Ulkatcho community.",
    "section_8.heading": "Ulkatcho Settlement in Anahim Lake",
    "section_8.intro": "There are several reasons why Ulkatcho families moved from Ulkatcho Village to Anahim Lake.",
    "section_9.heading": "Ulkatcho Village – A Brief History",
    "section_9.body": "Long before first contact with White Euro-Canadian society in 1793, Ulkatcho Village was an important trading and gathering site in the heart of Ulkatcho territory. The Culla Culla House was a large potlatch house at Ulkatcho Village. In 1793 Alexander Mackenzie passed through the Central Coast, and he described the Culla Culla House in his journal.\n\nEighty-three years later the Culla Culla house was still standing when surveyor George Dawson took the very first known photograph of it in 1876. He wrote of Kultshe designs cut deep to be seen in the bark of trees along the trail, and described the Culla Culla house in detail. When people gathered there they would stay in temporary brush shelters.\n\nIn 1897 Oblate priest Father Francois Marie Thomas started travelling throughout the Chilcotin and Blackwater country catechizing the Tŝilhqot'in and Dakelh people in the Roman Catholic faith. He got permission from the Ulkatcho people to build a church at Ulkatcho Village.\n\nUnder Father Thomas's direction a church was built at Ulkatcho Village. Mac Squinas says it was the women and one man who built the church. \"They cut all the boards using a whipsaw.\"",
    "section_10.heading": "Besbut'a (Anahim Peak)",
    "section_10.body": "One of the dominant features around Anahim Lake is Besbut'a or Anahim Peak. In the Ulkatcho Dakelh dialect it means \"obsidian mountain\".\n\nObsidian (Dene'el in volcanic glass is a rare substance that was highly prized by old-time Indigenous societies. Anahim Peak is one of only two locations in British Columbia where obsidian can be found. The other source is in northwestern British Columbia at Mount Edziza Provincial Park.\n\nObsidian from Besbut'a was traded as far away as Alberta. There are many stories about disputes over this valuable resource and the coming wars between different groups of tribes to get their hands on it. Perhaps more than anything, the obsidian from Besbut'a put Anahim Lake and Nagwuntl'oo on the map.",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("revealed"); }); },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#c8d5e0" }}>
      <Navbar />

      <SimplePageHeader
        heading={get("hero.heading")}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "History" },
        ]}
      />

      {/* Content */}
      <div className="container py-14">
        <div className="max-w-3xl mx-auto">

          {/* MAP OF OUR TRADITIONAL TERRITORY */}
          <section className="mb-14 scroll-reveal">
            <h2 className="mb-1" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a227" }}>
              {get("section_1.label")}
            </h2>
            <h3 className="mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem", color: "#1a2e5a" }}>
              {get("section_1.heading")}
            </h3>
            {paras(get("section_1.body"))}
          </section>

          <div className="ufn-divider mb-12" />

          {/* Our People */}
          <section className="mb-14 scroll-reveal">
            <h3 className="mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem", color: "#1a2e5a" }}>
              {get("section_2.heading")}
            </h3>
            {paras(get("section_2.body"))}
          </section>

          <div className="ufn-divider mb-12" />

          {/* Fat of the Land */}
          <section className="mb-14 scroll-reveal">
            <h3 className="mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem", color: "#1a2e5a" }}>
              {get("section_3.heading")}
            </h3>
            {paras(get("section_3.body"))}
          </section>

          <div className="ufn-divider mb-12" />

          {/* Tanya Lakes */}
          <section className="mb-14 scroll-reveal">
            <h3 className="mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem", color: "#1a2e5a" }}>
              {get("section_4.heading")}
            </h3>
            {paras(get("section_4.body"))}
          </section>

          <div className="ufn-divider mb-12" />

          {/* Family Ties */}
          <section className="mb-14 scroll-reveal">
            <h3 className="mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem", color: "#1a2e5a" }}>
              {get("section_5.heading")}
            </h3>
            {paras(get("section_5.body"))}
          </section>

          <div className="ufn-divider mb-12" />

          {/* Nagwuntl'oo */}
          <section className="mb-14 scroll-reveal">
            <h3 className="mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem", color: "#1a2e5a" }}>
              {get("section_6.heading")}
            </h3>
            {paras(get("section_6.body"))}
          </section>

          <div className="ufn-divider mb-12" />

          {/* Anahim Lake — with inline photo */}
          <section className="mb-14 scroll-reveal">
            <h3 className="mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem", color: "#1a2e5a" }}>
              {get("section_7.heading")}
            </h3>
            <div className="mb-6 overflow-hidden" style={{ borderRadius: "4px", boxShadow: "0 4px 20px rgba(26,46,90,0.08)" }}>
              <img
                src={ANAHIM_LAKE}
                alt="Anahim Lake, British Columbia"
                className="w-full"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
              <p className="px-4 py-2 text-xs italic" style={{ fontFamily: "Lora, serif", color: "#888", backgroundColor: "#c8d5e0" }}>
                Anahim Lake, British Columbia
              </p>
            </div>
            {paras(get("section_7.body"))}
          </section>

          <div className="ufn-divider mb-12" />

          {/* Ulkatcho Settlement */}
          <section className="mb-14 scroll-reveal">
            <h3 className="mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem", color: "#1a2e5a" }}>
              {get("section_8.heading")}
            </h3>
            <p className="mb-6 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem" }}>
              {get("section_8.intro")}
            </p>
            <div className="space-y-5 mb-6">
              {[
                { label: "FLOODING THE NECHAKO", text: "In 1952 the BC government built the Kenny Dam on the Nechako River and this flooded the traditional hunting and trapping grounds of some Ulkatcho families. More significantly the high water of the Ootsa Lake reservoir also blocked off ancient travel routes between Ulkatcho and Chezlatta where many Ulkatcho people had family ties." },
                { label: "THE BELLA COOLA ROAD", text: "In 1953 a road was built through the Coast Mountains linking Anahim Lake to the Bella Coola Valley. Before the road was built, the main route to Bella Coola Valley from Ulkatcho Village and the people living Down River north of Anahim Lake, was the Nuxalk-Dakelh Grease Trail. Once the road was established, this mountain trail was used less and less." },
                { label: "MANDATORY SCHOOLING", text: "The Canadian government passed a law in the 1800s that all Indigenous children must attend residential school. The residential school for the Ulkatcho people was St. Joseph's Mission near Williams Lake. In the 1950s and 1960s, Ulkatcho families began moving to Anahim Lake so their children could attend school there instead of being sent away to residential school." },
                { label: "RANGE IMPROVEMENTS", text: "In the 1950s and 1960s, the Department of Indian Affairs provided funding to improve the range for cattle ranching in the Anahim Lake area. This encouraged more Ulkatcho families to move to Anahim Lake to take advantage of the improved range." },
                { label: "COMMUNITY FACILITIES", text: "In the 1960s and 1970s, the Department of Indian Affairs built community facilities in Anahim Lake including a band office, health clinic, and housing. This encouraged more Ulkatcho families to move to Anahim Lake." },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 p-4" style={{ backgroundColor: "#c8d5e0", borderLeft: "3px solid #c9a227" }}>
                  <div>
                    <p className="font-semibold mb-1 text-xs tracking-widest uppercase" style={{ fontFamily: "Raleway, sans-serif", color: "#1a2e5a" }}>
                      {item.label}
                    </p>
                    <p className="leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "0.95rem" }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="ufn-divider mb-12" />

          {/* Ulkatcho Village — with swannell photo */}
          <section className="mb-14 scroll-reveal">
            <h3 className="mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem", color: "#1a2e5a" }}>
              {get("section_9.heading")}
            </h3>
            <div className="mb-6 overflow-hidden" style={{ borderRadius: "4px", boxShadow: "0 4px 20px rgba(26,46,90,0.08)" }}>
              <img
                src={VILLAGE_1927}
                alt="Ulkatcho Village, photographed by Frank Swannell in 1927"
                className="w-full"
                style={{ maxHeight: "420px", objectFit: "cover" }}
              />
              <p className="px-4 py-2 text-xs italic" style={{ fontFamily: "Lora, serif", color: "#888", backgroundColor: "#c8d5e0" }}>
                Ulkatcho Village, photographed by Frank Swannell in 1927
              </p>
            </div>
            {paras(get("section_9.body"))}
          </section>

          <div className="ufn-divider mb-12" />

          {/* Besbut'a */}
          <section className="mb-14 scroll-reveal">
            <h3 className="mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem", color: "#1a2e5a" }}>
              {get("section_10.heading")}
            </h3>
            {paras(get("section_10.body"))}
          </section>

          {/* Explore More */}
          <div className="text-center pt-8 pb-4 scroll-reveal">
            <h2 className="mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2e5a" }}>
              Explore More
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/ancestral-origins">
                <button className="ufn-btn-primary">
                  Ancestral Origins
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
