import InfoCard from "../webinfo/InfoCard";

import "./InfoSection.css";

export default function InfoSection() {
  return (
    <div className="info-section">
      <InfoCard number="10M+" text="Quizzes Created"></InfoCard>
      <InfoCard number="500K+" text="Active Users"></InfoCard>
      <InfoCard number="99.9%" text="Uptime SLA"></InfoCard>
    </div>
  );
}
