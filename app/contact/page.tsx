import { ContactForm } from '@/components/contact-form';

const ContactPage = () => {
  return (
    <div className="md:my-8">
      <h1 className="section-title text-xl border-b-4 !mb-6">Контакт</h1>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-6">
          <p className="text-slate-700">
            Имате прашање, сакате понуда или закажување на монтажа? Пополнете ја
            формата и ќе ве контактираме наскоро.
          </p>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Телефон</p>
              <a
                href="tel:+38970264159"
                className="block font-semibold text-sky-700 hover:text-sky-800"
              >
                070/264-159
              </a>
              <a
                href="tel:+38978264668"
                className="block font-semibold text-sky-700 hover:text-sky-800 mt-1"
              >
                078/264-668
              </a>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Email</p>
              <a
                href="mailto:contact@bsekompani.mk"
                className="font-semibold text-sky-700 hover:text-sky-800"
              >
                contact@bsekompani.mk
              </a>
            </div>
          </div>
        </div>

        <section className="rounded-xl border border-slate-200 bg-slate-50 p-5 md:p-8">
          <h2 className="desc-title text-lg mb-1">Испратете порака</h2>
          <p className="text-slate-600 text-sm mb-6">
            Ќе добиете одговор на вашиот email или телефон.
          </p>
          <ContactForm />
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
