import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Main Content */}
      <div className="main-content">
        {/* Header Section */}
        <header className="company-header">
          <h1>Welcome to Textile Manager</h1>
          <p>Your trusted partner in textile production and inventory management</p>
        </header>

        {/* About Section */}
        <section className="about-section">
          <h2>About Us</h2>
          <p>
            Textile Manager is a leading solution for textile manufacturers, specializing in the production of high-quality dhotis and other traditional garments. Established in 2010, we have grown to become a trusted name in the industry, known for our commitment to quality, efficiency, and innovation.
          </p>
          <p>
            Our platform helps businesses manage their entire production process—from yarn inventory and dhoti production to employee management and sales tracking. With Textile Manager, you can streamline operations, reduce costs, and improve productivity.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower textile manufacturers with cutting-edge technology, enabling them to produce world-class products while maintaining sustainable practices. We aim to simplify complex workflows and provide actionable insights to drive growth.
          </p>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <h2>Contact Us</h2>
          <p>Email: support@textilemanager.com</p>
          <p>Phone: +91 987-654-3210</p>
          <p>Address: 123 Textile Lane, Mumbai, Maharashtra, India</p>
        </section>

        {/* Footer */}
        <footer className="company-footer">
          <p>&copy; 2025 Textile Manager. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;