import Head from "next/head";
import Layout from "../components/layout";
import HeaderComponent from "../components/headerComponent";
import FooterComponent from "../components/footerComponent";

export default function Tips() {
  return (
    <Layout myClass="intro">
      <Head>
        <title>Project Connect</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin&display=swap"
          rel="stylesheet"
        />
      </Head>

      <HeaderComponent inverse={false} />

      <div className="tips">
        <a name="top" />
        <h2>Legal information</h2>

        <p>
          Find legal information and policies related to Project Connect&apos; digital
          communications
        </p>

        <ul>
          <li>
            <a href="#terms-of-use">Terms of Use</a>
          </li>
          <li>
            <a href="#privacy-policy">Privacy Policy</a>
          </li>
          <li>
            <a href="#cookies-policy">Cookies policy</a>
          </li>
          <li>
            <a href="#note-on-maps">Note on maps</a>
          </li>
        </ul>

        <p>&nbsp;</p>

        <hr />

        <p>&nbsp;</p>

        <a name="terms-of-use" />
        <h3 className="text-align-center">Terms of Use</h3>

        <p>&nbsp;</p>

        <p>
          Use of this web application, <a href="/">game.projectconnect.world</a> (the
          &quot;Project Connect Web Application&quot;), constitutes acceptance of the
          following terms and conditions. Project Connect reserves the right to seek all
          remedies available by law for any violation of these terms of use, including any
          violation of Project Connect&apos;s rights in the Project Connect name and
          emblem and its rights in connection with the information, artwork, text, video,
          audio, or pictures (together, the &quot;Content&quot;) of the Project Connect
          Web Site.
        </p>

        <p>&nbsp;</p>

        <h4>The Project Connect Name</h4>

        <p>
          The Project Connect name and emblem are the exclusive property of UNICEF. They
          are protected under international law. Unauthorized use is prohibited. They may
          not be copied or reproduced in any way without the prior written permission of
          UNICEF. Requests for permission should be{" "}
          <a href="mailto:projectconnect@unicef.org">sent to us</a>.
        </p>

        <p>&nbsp;</p>

        <p>
          <strong>The Project Connect Web Application</strong>
        </p>

        <p>
          The Project Connect Web Application is provided by UNICEF for personal use and
          educational purposes only. Any other use, including reproduction or translation
          of anything more than a de minimis portion of the Content of the Project Connect
          Web Site, or any use other than for personal or educational purposes, requires
          the express prior written permission of UNICEF. Requests for permission should
          be <a href="mailto:projectconnect@unicef.org">sent to us</a>, specifying full
          details of the proposed use. All Content of the Project Connect Web Application
          is protected by law including, as applicable, copyright laws.
        </p>

        <p>
          The Content of the Project Connect Web Application is selected on the basis of
          UNICEF&apos;s own criteria and in its own sole discretion. UNICEF reserves the
          right at any time to change or discontinue any aspect or feature of the Project
          Connect Web Application, including but not limited to these terms of use, hours
          of availability and equipment needed for use.
        </p>

        <p>
          The use of particular designations of countries or territories does not imply
          any judgment by UNICEF as to the legal status of such countries or territories,
          of their authorities and institutions or of the delimitation of their
          boundaries. The mention of names of specific companies or products (whether or
          not indicated as registered) does not imply any intention to infringe
          proprietary rights, nor should it be construed as an endorsement or
          recommendation on the part of UNICEF.
        </p>

        <p>
          The United Nations and UNICEF disclaim any liability or responsibility arising
          from the use of the Project Connect Web Application or the Content of the
          Project Connect Web Application. The United Nations, UNICEF, members of their
          staff, and their contractors, shall not be liable for any financial or other
          consequences whatsoever arising from the use of the Content of the Project
          Connect Web Application, including the inappropriate, improper, or fraudulent
          use of such Content.
        </p>

        <p>
          No representations or warranties of any kind concerning the Project Connect Web
          Application are given, including responsibility for any infection by virus or
          any other contamination or by anything which has destructive properties.
        </p>

        <p>&nbsp;</p>

        <h5>Other Web Sites</h5>

        <p>
          The Project Connect Web Application may be linked to other web sites that are
          not under Project Connect&apos;s control. Project Connect provides these links
          merely as a convenience and the inclusion of such links does not imply an
          endorsement or approval by UNICEF of any web site, product or service. UNICEF
          does not assume any responsibility or liability in respect of such web sites,
          including, for example, responsibility or liability for the accuracy or
          reliability of any information, data, opinions, advice or statements made on
          those web sites.
        </p>

        <p>&nbsp;</p>

        <p>
          If you have any questions about this please{" "}
          <a href="mailto:projectconnect@unicef.org">contact us</a>. Thank you.
        </p>

        <p>
          <br />
          <a href="#top">&gt; Back to top</a>
        </p>

        <p>&nbsp;</p>

        <hr />

        <p>&nbsp;</p>

        <a name="privacy-policy" />
        <h3 className="text-align-center">Privacy policy</h3>

        <p>&nbsp;</p>

        <p>
          This privacy statement describes Project Connect’s policy concerning the
          gathering and sharing of visitors’ information through the Project Connect Web
          Application (webapp), located at{" "}
          <a href="https://game.projectconnect.world" target="_blank" rel="noreferrer">
            https://game.projectconnect.world
          </a>
          .&nbsp; By using the Project Connect webapp you are accepting the practices
          described in this policy.
        </p>

        <p>&nbsp;</p>

        <h4>What information does Project Connect collect?</h4>

        <h5>Normal website usage</h5>

        <p>
          In general, you can browse the Project Connect webapp without telling us who you
          are or revealing any personal information about yourself.&nbsp; The only
          information we gather during general browsing is from standard server
          logs.&nbsp; These include your IP (Internet Protocol) address, domain name,
          browser type, operating system, and information such as the web site that
          referred you to us, the pages you visit, and the dates/times of those visits.
        </p>

        <h5>Collection of personally identifiable information</h5>

        <p>
          If you log on, you will be asked to provide personal information such as your
          name, e-mail address and profile picture.&nbsp; This information is collected
          only with your knowledge and permission, and is kept in a Project Connect
          database. This information is collected through one of the authentication
          providers offered: Facebook, Google, Twitter and GitHub.
        </p>

        <h4>What does Project Connect do with the information it collects?</h4>

        <h5>Normal web usage</h5>

        <p>
          The information gathered during general browsing of the “projectconnect.world”
          domain is used to analyse trends and usage of the Project Connect site and to
          improve the usefulness of the site.&nbsp; It is not connected with any personal
          information. However, if you have registered with Project Connect&apos;s webapp,
          the information we collect about your normal web usage will be identifiable to
          you.
        </p>

        <p>
          <strong>Personally identifiable information</strong>
        </p>

        <p>Project Connect may use the personal information you provide to:</p>

        <ul>
          <li>“Remember” your online profile;</li>
          <li>Record your mapping activity on the Project Connect webapp;</li>
          <li>
            Contact you – either in response to a query or suggestion, or to mail
            newsletters, documents, publications, etc. to you;
          </li>
          <li>Undertake statistical analysis.</li>
        </ul>

        <p>
          <strong>What if I don’t want to provide personal information?</strong>
        </p>

        <p>
          Providing personal information on the Project Connect webapp is optional.&nbsp;
          If you choose not to provide personal information, you can still browse and use
          the Project Connect webapp, but you will not be able to carry out certain
          actions such as accessing your profile with statistics about your activity on
          the webapp.
        </p>

        <h5>Opting out and changing your information</h5>

        <p>
          At any time, you can cancel or modify your information by &nbsp;
          <a href="mailto:projectconnect@unicef.org">contacting us</a>.
        </p>

        <h5>Security</h5>

        <p>
          We do not sell or share any personally identifiable information volunteered on
          the Project Connect site to any third party without prior consent.&nbsp; Any
          information provided to Project Connect by users of the Project Connect&apos;s
          webapp is held with the utmost care and security, and will not be used in ways
          other than as set forth in this privacy policy, or in ways to which you have
          explicitly consented.&nbsp; Project Connect employs a range of techniques and
          security measures to protect the information maintained on our system from loss,
          misuse, unauthorised access or disclosure, alteration, or destruction.
        </p>

        <p>
          However, Project Connect assumes no responsibility for the security of
          information.
        </p>

        <p>
          The Project Connect&apos;s webapp contains links to sites external to the
          projectconnect.world domain. Project Connect is not responsible for the privacy
          practices or the content of such sites.
        </p>

        <h5>Notification of changes</h5>

        <p>Changes to this privacy policy will be posted here.</p>

        <p>&nbsp;</p>

        <h4>Contact</h4>

        <p>
          For questions or queries regarding this privacy policy, please&nbsp;
          <a href="mailto:projectconnect@unicef.org">contact us</a>.
        </p>

        <p>
          * Project Connect’s webapp uses cookies to provide statistics that help us to
          give you the best experience of our sites. You can find out more&nbsp;
          <a href="#cookies-policy">here</a>&nbsp;or switch them off if you prefer.
          However, by continuing to use our sites without changing settings, you are
          agreeing to our use of <a href="#cookies-policy">cookies</a>.
        </p>

        <p>&nbsp;</p>

        <hr />

        <p>&nbsp;</p>

        <a name="cookies-policy" />
        <h3 className="text-align-center">Cookies policy</h3>

        <p>&nbsp;</p>

        <p>
          By visiting or using this web application (webapp), a cookie will be created
          which Project Connect may use to provide statistics that help us to give you the
          best experience of our sites. The statement below describes our policy on
          cookies.
        </p>

        <p>
          If you do not agree with any of the following, you can switch off the cookies.
          However, by continuing to use our sites without changing settings, you are
          agreeing to our use of cookies.
        </p>

        <p>&nbsp;</p>

        <h4>What is a cookie?</h4>

        <p>
          During the course of any visit to our websites, the pages which you see, along
          with something called a cookie, are downloaded to your computer. Most, if not
          all, websites do this, and that’s because cookies allow the website publisher to
          do useful things like find out whether the computer (and probably its user) has
          visited the site before. This is done on a repeat visit by checking to see, and
          finding, the cookie left there on the last visit.
        </p>

        <p>
          So – what is a cookie? When you enter a site your computer will automatically be
          issued with a cookie. Cookies are text files which identify your computer to our
          server. Cookies in themselves do not identify the individual user, just the
          computer used. Many sites do this whenever a user visits their site, in order to
          track traffic flows. Cookies themselves only record which areas of the site have
          been visited by the computer in question, and for how long. Users have the
          opportunity to set their computers to accept all cookies, to notify them when a
          cookie is issued, or not to receive cookies at any time, although this of course
          means that certain personalised services cannot then be provided to that user.
          You should read the information that came with your browser software to see how
          you can do this. Even assuming you have not set your computer to reject cookies,
          you can browse our sites anonymously until such time as you register your
          information with Project Connect.
        </p>

        <p>&nbsp;</p>

        <h5>What do cookies tell us?</h5>

        <p>
          We use cookies to collect data for analytics, such as demographic and interest
          data, based on your browsing patterns. This data allows us to estimate your age
          range, your gender and things that might interest you.
        </p>

        <p>&nbsp;</p>

        <h5>What do we use cookies for?</h5>

        <p>
          We use cookies so that we can give you a better experience when you return to
          our websites. In particular, we use cookies to:
        </p>

        <ul>
          <li>
            better understand our audience and supporters, for example by estimating our
            audience size and patterns and tracking the level of interest in our
            campaigns;
          </li>
          <li>
            track your preferences and personalise the sites to your requirements and
            interests;
          </li>
          <li>avoid lengthy registration/personalisation on each visit;</li>
          <li>improve and update our websites.</li>
        </ul>

        <p>&nbsp;</p>

        <h5>How do we collect and analyze cookies?</h5>

        <p>
          Project Connect does not collect and analyze the data to create cookies
          directly; we use a specialist service provider which both collects information
          on your preferences from your visits to our websites and analyzes your
          preferences from cookies already stored in your browser.
        </p>

        <p>
          We obtain this information by enabling Google Analytics to analyze the traffic
          on our websites via &quot;Google Advertising Cookies&quot;. Google Advertising
          Cookies are a series of cookies already stored in your browser that compile data
          from your browsing preferences. You can see the types of cookies used by Google
          and learn more about the different categories in the&nbsp;
          <a href="https://policies.google.com/technologies/types">
            Google privacy &amp; terms
          </a>
          .
        </p>

        <p>
          We may change our specialist service provider at any time without notice to you
          and will update this Policy as necessary at that time.
        </p>

        <p>&nbsp;</p>

        <h5>What can you do if you do not want us to use your cookies?</h5>

        <ul>
          <li>
            Configure how we use your&nbsp;
            <a href="http://www.google.com/settings/ads">Google Analytics information</a>.
          </li>
          <li>
            If you would like to opt out of all Google Analytics tracking services then
            you can install an Add-on.&nbsp;
            <a href="https://tools.google.com/dlpage/gaoptout/">
              Find out about more about Google Analytics Opt-out Browser Add-on
            </a>
            .
          </li>
          <li>
            Alternatively, you can use your browsers’ private browsing mode. Common
            browsers like Google Chrome, Brave, Safari and Internet Explorer have this
            functionality.
          </li>
        </ul>

        <p>&nbsp;</p>

        <h5>
          How do I opt-out of the collection and use of information for promotional
          purposes generally?
        </h5>

        <p>
          There are many websites that provide guidance on how to opt out of the
          collection and use of your information for promotional purposes that are not
          limited to Project Connect web properties. For example:
        </p>

        <ul>
          <li>
            <a href="http://www.google.com/settings/ads">Google Ads settings</a>
          </li>
          <li>
            <a href="http://www.networkadvertising.org/managing/opt_out.asp">
              Network Advertising Initiative opt-out page
            </a>
          </li>
          <li>
            <a href="http://optout.aboutads.info/#!/">
              Digital Advertising Alliance’s Consumer Choice Tool
            </a>
          </li>
        </ul>
        <p>&nbsp;</p>

        <h5>Do you share data from cookies with other organizations?</h5>

        <p>
          We do not sell or share any data from your cookies to any third party without
          prior consent.
        </p>

        <p>
          <br />
          <a href="#top">&gt; Back to top</a>
        </p>

        <p>&nbsp;</p>

        <hr />

        <p>&nbsp;</p>

        <a name="note-on-maps" />
        <h3 className="text-align-center">Note on maps</h3>

        <p>&nbsp;</p>

        <p>
          Maps on this site do not reflect a position by Project Connect on the legal
          status of any country or territory or the delimitation of any frontiers.
        </p>

        <p>
          <br />
          <a href="#top">&gt; Back to top</a>
        </p>
      </div>

      <FooterComponent />
    </Layout>
  );
}
