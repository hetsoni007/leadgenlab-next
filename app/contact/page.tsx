import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Request an AI workflow audit",
  description: "Tell us about your team and the task you want to improve. You will get a short, practical read on where AI helps.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Audit request</p>
          <h1>Tell us where your team loses time.</h1>
          <p className="lede">A few details are enough. You&apos;ll get a short, honest read on where Claude or ChatGPT can help, and where they can&apos;t.</p>
        </div>
      </section>
      <div className="wrap" style={{ paddingBottom: 64 }}>
        <ContactForm endpoint={SITE.formEndpoint} />
        <p className="muted" style={{ marginTop: 20 }}>
          Prefer to talk first?{" "}
          {SITE.bookingUrl ? <a href={SITE.bookingUrl}>Book a call</a> : <a href={`mailto:${SITE.email}?subject=Book%20a%20call`}>Email to book a call</a>}.
          Your details are used only to reply to this enquiry.
        </p>
      </div>
    </>
  );
}
