import FloatingLabelForm from "./FloatingLabelForm";

export default function Login() {
  const backgroundLines = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundImage:
      "linear-gradient(135deg, rgba(50, 120, 80, 0.1) 25%, transparent 25%, transparent 10%, rgba(40, 100, 60, 0.1) 50%, rgba(5, 10, 60, 0.1) 75%, transparent 5%, transparent)",
    backgroundSize: "40px 40px",
    zIndex: "-1",
  };
  return (
    <main className="main-container">
      <div style={backgroundLines}></div>

      <FloatingLabelForm />
    </main>
  );
}
