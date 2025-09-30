export const metadata = {
  title: 'About Us | Grap Deal'
};

const AboutPage = () => {
  return (
    <main className="min-h-screen py-24 text-gray-100 relative z-10">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl text-white">About Grap Deal</h1>
          <p className="mt-4 max-w-2xl text-sm text-gray-300">
            Grap Deal is shaping the next generation of marketplace storytelling. We&apos;re crafting immersive storefront experiences that blend compelling design with plug-and-play commerce infrastructure.
          </p>
        </div>
        <section className="rounded-2xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05] dark:text-gray-200">
          <h2 className="text-xl font-semibold">Our Focus</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-600 dark:text-gray-400">
            <li>Composable hero, product, and trend surfaces ready for real data.</li>
            <li>Responsive themes tuned for launch-day polish across devices.</li>
            <li>Motion-rich interactions that feel smooth without overwhelming browsing.</li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
