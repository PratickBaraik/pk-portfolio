import styles from "./CanvasSection.module.css";

interface CanvasSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export const CanvasSection = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
}: CanvasSectionProps) => {
  return (
    <section className={styles.heroContainer}>
      {/* Background image */}
      <div className={styles.backgroundImage} />

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <h1 className={styles.name}>{title}</h1>
        </div>
        {/* NEW: Bottom section container */}
        <div className={styles.bottomSection}>
          {/* Subtitle - left/bottom edge aligned */}
          <div className={styles.textContainer}>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>

          {/* CTA Button - below with perfect spacing */}
          <div className={styles.buttonMain}>
            <a href={ctaLink} className={styles.ctaButton}>
              {ctaText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
