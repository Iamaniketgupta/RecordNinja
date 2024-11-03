import Hero from "@/_components/HomePage/Hero";
import Header from "../_components/common/Header";
import ScreenRecorder from "@/_components/screenRecorder/ScreenRecorder";
export default function Home() {
  return (
    <div className="">
      <header>
      <Header/>
      </header>
      <main>
        <Hero/>
    </main>
    </div>

  );
}
