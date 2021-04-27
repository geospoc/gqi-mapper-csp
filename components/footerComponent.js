export default function footerComponent() {
  return (
    <footer className="masthead pt-3 mt-3">
      <p style={{textAlign: "center"}}>
        <a href="/legal#terms-of-use">Terms of Use</a>
        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <a href="/legal#privacy-policy">Privacy Policy</a>
        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <a
          href="https://github.com/unicef/projectconnect-game"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source Code
        </a>
        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <a href="mailto:projectconnect@unicef.org">Contact us</a>
      </p>
    </footer>
  );
}
