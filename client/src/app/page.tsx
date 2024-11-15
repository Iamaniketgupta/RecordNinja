import Hero from "@/_components/HomePage/Hero";
import Header from "@/_components/common/Header";

export default function Home() {
  return (
    <div className="relative">
      <header>
        <Header />
      </header>
      <main>
        <Hero />
      </main>

      <footer className="bg-gray-50 lg:fixed mt-20 w-full bottom-0 ">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center  text-stone-500 sm:justify-start">
             Record Ninja
            </div>

            <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
              Copyright &copy; 2025. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>

  );
}
