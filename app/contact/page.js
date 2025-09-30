export const metadata = {
  title: 'Contact Us | Grap Deal'
};

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-24 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-sm text-gray-600 dark:text-gray-400">
            We&apos;d love to hear from you. Drop a line and we&apos;ll get back as we keep the marketplace experience evolving.
          </p>
        </div>
        <section className="grid gap-6 sm:grid-cols-2">
          <article className="rounded-2xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05]">
            <h2 className="text-lg font-semibold">Partnerships</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">partner@grapdeal.dev</p>
          </article>
          <article className="rounded-2xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05]">
            <h2 className="text-lg font-semibold">Support</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">support@grapdeal.dev</p>
          </article>
        </section>
      </div>
    </main>
  );
};

export default ContactPage;
