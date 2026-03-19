import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="education">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Developer (Remote)</h4>
                <h5>AI Naeco Blue</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Completed an 8-week training program covering React JS, Next JS, and Firebase,
              followed by Node JS for backend development. Built an internship portal for
              managing interns and their real-time notifications about tasks and deadlines.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor's in Computer and Information Science</h4>
                <h5>Pakistan Institute of Engineering and Applied Sciences</h5>
              </div>
              <h3>2024 - Present</h3>
            </div>
            <p>
              Pursuing a degree in Computer Science with a CGPA of 3.53 / 4.0.
              Top 50 Nationwide Qualifier for the 20th National Science Talent Contest (2023)
              under the STEM career program (HEC and PIEAS).
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>FSc (Pre-Engineering)</h4>
                <h5>PAEC Model College for Boys Chashma</h5>
              </div>
              <h3>2022 - 2024</h3>
            </div>
            <p>
              Completed high school with Grade: A.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
