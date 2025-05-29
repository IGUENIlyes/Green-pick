import "./ProgressDots.css";

const ProgressDots = ({ currentStep, totalSteps }) => {
  return (
    <div className="commercant-progress-dots">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`commercant-progress-dot ${
            index === currentStep ? "active" : ""
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressDots;
