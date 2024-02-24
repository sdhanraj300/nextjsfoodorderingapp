import Link from "next/link";
import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";
export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-8">
        <SectionHeaders mainHeader={"About Us"} subHeader={"Our Story"} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Do velit culpa occaecat nostrud labore laboris occaecat occaecat
            aute eiusmod cupidatat reprehenderit occaecat. Cupidatat ullamco
            mollit ad ea do. Ex Lorem exercitation pariatur fugiat elit eiusmod
          </p>
          <p>
            Ex elit fugiat deserunt laboris ut occaecat labore. Dolore aliqua
            nulla aliquip incididunt excepteur incididunt id do id quis nostrud
            nulla. Laborum incididunt aliquip ullamco ad eu quis irure. Tempor
            magna
          </p>
          <p>
            cillum aliquip. Est nisi nostrud consequat exercitation culpa minim
            eu. Adipisicing exercitation ullamco minim dolor quis aute.
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders
          subHeader={"Don't Hesistate"}
          mainHeader={"Contact Us"}
        />
        <div className="mt-8">
          <Link
            className="text-4xl underline text-gray-500"
            href="tel:+91 0135 2552"
          >
            +91 0135 2552
          </Link>
        </div>
      </section>
     
    </>
  );
}
