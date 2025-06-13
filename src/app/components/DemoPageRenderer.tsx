import { ColorRoles } from "../types";

export function DemoPageRenderer({
  route,
  projectName,
  colors,
}: {
  route: string;
  projectName: string;
  colors: ColorRoles;
}) {
  if (route === "/about") {
    return (
      <section
        style={{
          backgroundColor: colors.background,
          color: colors.text,
          transition: "background 0.3s, color 0.3s",
        }}
        className="w-full flex-1 p-10 shadow-xl flex flex-col"
      >
        <h1 style={{ color: colors.text }} className="text-3xl font-bold mb-4">
          About
        </h1>
        <p className="mb-8 " style={{ color: colors.text }}>
          This project was scaffolded using BauerVision CodeMode.
          <br />
          Easily preview and build modern, mobile-responsive React apps.
        </p>
      </section>
    );
  }
  if (route === "/contact") {
    return (
      <section
        style={{
          backgroundColor: colors.background,
          color: colors.text,
          transition: "background 0.3s, color 0.3s",
        }}
        className="w-full  flex-1 p-10 shadow-xl flex flex-col"
      >
        <h1 style={{ color: colors.text }} className="text-3xl font-bold mb-4">
          Contact
        </h1>
        <p className="mb-8 " style={{ color: colors.text }}>
          Have questions or feedback?
          <br />
          Contact the developer at mike@bauervision.com.
        </p>
      </section>
    );
  }
  // Home/default
  return (
    <section
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        transition: "background 0.3s, color 0.3s",
      }}
      className="w-full flex-1 p-10 shadow-xl flex flex-col"
    >
      <h1 style={{ color: colors.text }} className="text-4xl font-bold mb-4">
        Welcome to {projectName}!
      </h1>
      <p className="mb-8 " style={{ color: colors.text }}>
        Instantly scaffold beautiful, production-ready apps.
        <br />
        Use the prompt bar below to ask CodeMode to update the UI!
      </p>
    </section>
  );
}
