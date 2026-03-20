/*
 * ULKATCHO FIRST NATION — Travellers & Entrepreneurs Page
 * Design: Steel Blue / Navy / Gold — Hero + breadcrumb + long-form text with pull-quotes
 */

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SimplePageHeader from "@/components/SimplePageHeader";
import { Link } from "wouter";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/ulkatcho-mountain-hero_b310447d.jpg";

export default function Travellers() {
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
        heading="Travellers & Entrepreneurs"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Travellers & Entrepreneurs" },
        ]}
      />

      {/* Content */}
      <div className="container py-14">
        <div className="max-w-3xl mx-auto" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem", lineHeight: "1.8" }}>

          <div className="scroll-reveal">
            <p className="mb-5">
              Ulkatcho people have a long history of entrepreneurship. There are generations of astute and independent, business-minded Ulkatchot'en, capable of striking a hard bargain.
            </p>

            <p className="mb-5">
              Besides trapping for a livelihood and harvesting the bounty of the land and turning it into currency to obtain other things they needed, a number of Ulkatchot'en ran their own stores where items could be purchased or traded for fur.
            </p>

            <p className="mb-5">
              Antone Capoose, Thomas Sill, Baptiste Stillas, George Cahoose and Old Cahoose all had stores. They would take their strings of packhorses to Bella Coola and bring food and staples back home to Ulkatcho. Their stores were located at Anahim Lake, Abuntlet Lake, Salmon River and Ulkatcho Village, and supplied people in the community who preferred to stay closer to home.
            </p>

            <p className="mb-5">
              Clayton Mack described Capoose as a real business man.
            </p>
          </div>

          {/* Pull quote */}
          <div className="scroll-reveal my-8 p-6" style={{ backgroundColor: "#c8d5e0", borderLeft: "4px solid #c9a227" }}>
            <p className="italic leading-relaxed" style={{ fontFamily: "Playfair Display, serif", color: "#1a2e5a", fontSize: "1.05rem" }}>
              "He was always selling something. He had a little sack on his saddlehorse full of stuff to sell. Cowboy handkerchiefs, pocketknives and canned goods. He'd say, 'You want to buy a handkerchief...one dollar... one dollar for a cheap knife, one dollar for a can of plums or raspberries. One dollar for a can of strawberries.' Capoose had a store in old Bella Coola townsite. More like a warehouse, and a store at Abuntlet Lake."
            </p>
            <p className="mt-3 text-sm" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420", fontWeight: 600 }}>
              — Clayton Mack
            </p>
          </div>

          <div className="scroll-reveal">
            <p className="mb-5">
              Clayton Mack said Capoose used to buy furs from people all over the country and take them down to Vancouver and buy lots of stuff real cheap. "Old clothes, shoes, blankets, and he'd get them for almost nothing. Then he'd bring all that stuff up the coast in a boat and unload it at Bella Coola. He piled it up in his warehouse and when he wanted some of it, he would go down to Bella Coola with his string of horses and pack it up to Abuntlet Lake.
            </p>

            <p className="mb-5">
              "He had forty head of packhorses and went all the way to T'letinqox (Anaham Reserve) on the other side of Alexis Creek trading for fur. He'd go all the way down the Dean River to Ulkatcho Village. That's where he'd turn around and come back again. He bought furs from people all over the country and sold them stuff from his store."
            </p>
          </div>

          {/* Pull quote */}
          <div className="scroll-reveal my-8 p-6" style={{ backgroundColor: "#c8d5e0", borderLeft: "4px solid #c9a227" }}>
            <p className="italic leading-relaxed" style={{ fontFamily: "Playfair Display, serif", color: "#1a2e5a", fontSize: "1.05rem" }}>
              "He just used 'one' all the time. Muskrats cost about five bucks. So for one muskrat you get one pair of boots."
            </p>
            <p className="mt-3 text-sm" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420", fontWeight: 600 }}>
              — Henry Jack, on Old Cahoose's store
            </p>
          </div>

          <div className="scroll-reveal">
            <p className="mb-5">
              Mac Squinas said the old people used to stay at Ulkatcho Village all year round. "Young people would come and go but the old people stayed right there."
            </p>

            <p className="mb-5">
              Mac remembered when Anton Capoose came down to Ulkatcho Village with twenty-one packhorses loaded with groceries. "Everybody had been trapping all winter and we bought all his groceries and sold him our fur. His packhorses went back empty."
            </p>
          </div>

          <div className="ufn-divider my-10" />

          {/* Ulkatcho People Were Always on the Move */}
          <section className="scroll-reveal">
            <h2 className="mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem", color: "#1a2e5a" }}>
              Ulkatcho People Were Always on the Move
            </h2>

            <p className="mb-5">
              In order to survive in the high country of the interior plateau Ulkatcho people were constantly on the move. They were able to pack up quickly on short notice and move to a new location when berries were ripe or fish were running or a herd of caribou had been slaughtered and the meat had to be cut up.
            </p>

            <p className="mb-5">
              Families covered a lot of territory throughout the year. They travelled from the Fraser River to Kimsquit and Bella Coola, and from Chezlatta to Potato Mountain in Tsilhqot'in territory.
            </p>

            <p className="mb-5">
              In the mid-1960s a program was initiated by farmers and fruit growers in the Okanagan to hire indigenous people to work for them. Ulkatcho families joined those from Nazko, Lhooskus and the Chilcotin to work in the orchards and fields. As a result many Ulkatcho families put roots down in the Okanagan.
            </p>

            <p className="mb-5">
              In modern times Ulkatcho people are still very mobile. When the pine mushroom harvest became popular in the late 1980s, Ulkatcho families effortlessly followed the matsutake mushroom harvest across the province from Anahim Lake and Bella Coola to the Nass River, the Kootenays, Boston Bar and even into the United States.
            </p>

            <p className="mb-5">
              A number of Ulkatcho workers have traveled to the Peace River to work in the oil patch.
            </p>
          </section>

          <div className="ufn-divider my-10" />

          {/* Henry Jack */}
          <section className="scroll-reveal">
            <h2 className="mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem", color: "#1a2e5a", textWrap: "balance" as any }}>
              Henry Jack – Ulkatcho Families Occupied the Whole Landscape
            </h2>

            <p className="mb-5">
              Henry Jack said when he was growing up people lived all over.
            </p>

            {/* Pull quote */}
            <div className="my-8 p-6" style={{ backgroundColor: "#c8d5e0", borderLeft: "4px solid #c9a227" }}>
              <p className="italic leading-relaxed" style={{ fontFamily: "Playfair Display, serif", color: "#1a2e5a", fontSize: "1.05rem" }}>
                "Every five or six miles there would be another lake and a family would live there. Every pothole lake had muskrat houses, and we used to shoot them in the head. We'd get lots of muskrats. About a hundred or a hundred and fifty in a season. Now there's hardly any muskrats around."
              </p>
              <p className="mt-3 text-sm" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420", fontWeight: 600 }}>
                — Henry Jack
              </p>
            </div>

            <p className="mb-5">
              By the time Henry was born in 1929, each Ulkatcho family also had a house at Ulkatcho Village.
            </p>

            <p className="mb-5">
              "When we lived at Squinas Lake we went to Ulkatcho every Sunday. We had to go to the store. Sunday was the only time the storekeeper was home. Our family had a house at Ulkatcho Village, up on the hill overlooking the village. The tongue and groove lumber all came from Ootsa Lake."
            </p>

            <p className="mb-5">
              Henry said his mom, Emma Stillas Jack had a trail she always walked on to go and visit Captain Harry's wife Ochristine. "The trail went behind the hill through the trees. We always called that her trail."
            </p>

            <p className="mb-5">
              He said Charlie West's mother Salhkus lived at Ulkatcho Village. So did Old Alexis and Captain Harry's mother, Cama.
            </p>
          </section>

          {/* Explore More */}
          <div className="text-center pt-10 pb-4 scroll-reveal">
            <div className="ufn-divider mb-10" />
            <h2 className="mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2e5a" }}>
              Explore More
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/history">
                <button className="ufn-btn-primary">
                  History of UFN
                </button>
              </Link>
              <Link href="/ancestral-origins">
                <button className="ufn-btn-outline">
                  Ancestral Origins
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
