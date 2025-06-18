import { ColorRoles } from "../types";
import AnimatedSection from "../components/AnimatedSection";

export function DemoPageRenderer({
  route,
  projectName,
  colors,
}: {
  route: string;
  projectName: string;
  colors: ColorRoles;
}) {
  const headerStyle = {
    color: colors.accent,
  };

  const sectionStyle = {
    backgroundColor: colors.background,
    color: colors.text,
    transition: "background 0.3s, color 0.3s",
  };

  if (route === "/about") {
    return (
      <section
        className="w-full flex-1 p-10 shadow-xl flex flex-col"
        style={sectionStyle}
      >
        <h1 className="text-3xl font-bold mb-4" style={headerStyle}>
          About
        </h1>
        <p className="text-center pb-4">
          This project was scaffolded using BauerVision CodeMode.
          <br />
          Easily preview and build modern, mobile-responsive React apps.
        </p>

        <AnimatedSection
          title="Centered About"
          body="This particular section is just centered 100%"
          alignment="center"
          width="half"
          backgroundColor={colors.primary}
          textColor={colors.text}
          padding="p-10 py-16"
          margin="m-20"
        />
      </section>
    );
  }

  if (route === "/contact") {
    return (
      <section
        className="w-full flex-1 p-10 shadow-xl flex flex-col"
        style={sectionStyle}
      >
        <h1 className="text-3xl font-bold mb-4" style={headerStyle}>
          Contact
        </h1>
        <p className="text-center pb-4">
          Have questions or feedback?
          <br />
          Contact us here, someone will be in touch within 24 hours.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message sent, thank you!");
          }}
          className="space-y-4 max-w-md mx-auto p-6 rounded-xl shadow-md"
          style={{
            background: colors.primary,
            color: colors.text,
          }}
        >
          <input
            required
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded-md border focus:outline-none"
            style={{
              background: "#ffffff",
              color: "#111827", // dark gray
            }}
          />
          <input
            required
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md border focus:outline-none"
            style={{
              background: "#ffffff",
              color: "#111827", // dark gray
            }}
          />
          <textarea
            required
            placeholder="Your Message"
            className="w-full px-4 py-2 rounded-md border min-h-[120px] focus:outline-none"
            style={{
              background: "#ffffff",
              color: "#111827", // dark gray
            }}
          />
          <button
            type="submit"
            className="w-full py-2 rounded-md font-semibold transition"
            style={{
              background: colors.accent,
              color: "#111827", // dark gray
            }}
          >
            Send
          </button>
        </form>
      </section>
    );
  }

  // Home/default
  return (
    <section
      className="w-full flex-1 p-10 shadow-xl flex flex-col"
      style={sectionStyle}
    >
      <h1 className="text-4xl font-bold mb-4" style={headerStyle}>
        Welcome to {projectName}!
      </h1>
      <p className="text-center pb-4">
        Mobile ready, web application scaffolded and ready for development!
      </p>

      <AnimatedSection
        title="Animated Sections with Alignment"
        body="This section has everything aligned to the left, passed via a prop"
        alignment="left"
        width="full"
        backgroundColor={colors.primary}
        textColor={colors.accent}
        padding="px-10 py-16"
        margin="mb-20"
      />
      <AnimatedSection
        title="Centered Section"
        body="This particular section is just centered 100%"
        alignment="center"
        width="content"
        backgroundColor={colors.primary}
        textColor={colors.accent}
        padding="px-10 py-16"
        margin="mb-20"
        rounded
      />
      <AnimatedSection
        title="Right Aligned"
        body="Here we pushed everything to the right"
        alignment="right"
        width="half"
        backgroundColor={colors.primary}
        textColor={colors.accent}
        padding="px-10 py-16"
        margin="mb-20"
        rounded
      />
      <AnimatedSection
        title="Animated on Scroll"
        body="Responds to its position in the view and animates accordingly"
        alignment="left"
        width="full"
        backgroundColor={colors.primary}
        textColor={colors.accent}
        padding="px-10 py-16"
        margin="mb-20"
      />
    </section>
  );
}
