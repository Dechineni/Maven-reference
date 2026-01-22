import trustedByImage from "../imgs/trustedby-clients-selected.png";
import favicon from "../imgs/favicon.png";

document.addEventListener("DOMContentLoaded", () => {
  // Hide preloader with a fade effect
  const preloader = document.getElementById("preloader");
  if (preloader) {
    // Add fade-out class
    preloader.classList.add("opacity-0");
    // Remove preloader after transition
    setTimeout(() => {
      preloader.style.display = "none";
    }, 400); // match this with your transition duration
  }
  isSafari();
  updateOmegaScale();
  initNavigation();
  initLearnMoreButton();
  initLegalModals();
  initTestimonialSlider();
  initTrustedByCarousel();
  initMobileNavToggle();
  initNavBlur();

  document.querySelector('link[rel="icon"]').href = favicon;
  console.log("Application loaded!");
});

function initNavBlur() {
  const nav = document.querySelector(".nav");
  if (!nav) return;

  // Remove backdrop-blur initially if at top
  if (window.scrollY === 0) {
    nav.classList.remove("backdrop-blur-lg");
  }

  // Add scroll event listener
  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      nav.classList.add("backdrop-blur-lg");
    } else {
      nav.classList.remove("backdrop-blur-lg");
    }
  });
}

function isSafari() {
  if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    document.documentElement.classList.add("safari");
  }
}

function initMobileNavToggle() {
  const nav = document.querySelector(".nav");
  const toggleButton = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".navMenu");

  if (!toggleButton || !navMenu || !nav) return;

  // Set initial state
  nav.classList.add("h-auto");

  // Function to close the mobile menu
  const closeMenu = () => {
    navMenu.classList.remove("flex");
    navMenu.classList.add("hidden");
    toggleButton.classList.add("rotate-0");
    toggleButton.classList.remove("rotate-90");
    navMenu.classList.remove("flex-col");
    navMenu.classList.remove("justify-center");
    navMenu.classList.add("gap-y-4");
    nav.classList.remove("h-full");
    nav.classList.add("h-auto");
    // Remove backdrop blur
    nav.classList.remove("backdrop-blur-lg");
  };

  // Toggle button click handler
  toggleButton.addEventListener("click", (e) => {
    e.stopPropagation();

    if (navMenu.classList.contains("hidden")) {
      // Change from hidden to flex
      navMenu.classList.remove("hidden");
      nav.classList.toggle("open");
      navMenu.classList.add("flex");
      toggleButton.classList.remove("rotate-0");
      toggleButton.classList.add("rotate-90");
      // Add flex-col
      navMenu.classList.add("flex-col");
      navMenu.classList.add("justify-center");
      navMenu.classList.add("gap-y-4");

      // Toggle nav height
      nav.classList.remove("h-auto");
      nav.classList.add("h-full");
      // Add backdrop blur
      nav.classList.add("backdrop-blur-lg");
    } else {
      closeMenu();
    }
  });

  // Add click handlers to all hash links
  const hashLinks = navMenu.querySelectorAll('a[href*="#"]');
  hashLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        closeMenu();
        // Small delay to ensure smooth transition
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "auto" });
        }, 300);
      }
    });
  });
}

// First, let's store our testimonials data
const testimonials = [
  {
    content: [
      "I've been in the insights industry for over 25 years, and in recent years, securing high-quality sample has become increasingly challenging. The rise of aggregator panels, professional survey takers, bots, and even the use of tools like ChatGPT by respondents has led to a decline in data quality, compromising the integrity of our research. While various technologies aim to detect fraud, they don't address the root issue: the need for genuinely engaged, real panelistsand a positive experience for them.",
      "Thankfully, Adam and his team at QuantifyAI are bringing meaning back to insights. After years of discarding 30-50% of our sample due to quality issues, we recently completed a strategic study with QuantifyAI and found only 5% of the responses to be problematic. The panelists provided thoughtful, high-quality responses that will guide our organization for years to come.",
      "In addition to the outstanding sample quality, Adam's project management team delivered a seamless experience from start to finish, managing everything from redirect links to quality assurance with precision. Moving forward, QuantifyAI will be our go-to partner for panel sourcing.",
    ],
    role: "Senior Director",
    company: "Consumer Insights",
  },
  {
    content: [
      "We just went through the most intensive period of polling we have ever conducted and included a national sample and several states. QuantifyAI was a true partner in this effort to deliver Sample quickly and efficiently. They were very responsive to any concerns we had. Communication with the team was quick and respectful, which is not always the case with other Sample providers.",
      "The samples we obtained were some of the most representative we’ve ever produced in our 20+ years of doing survey research.  Nearly all of the samples had maximum weights that were less than 5, with care paid to obtaining young, people of color, or low income respondents, who are typically harder to obtain. I highly recommend QuantifyAI for your next in-depth survey project.",
    ],
    role: "Research Director",
    company: "Political Polling",
  },
  {
    content: [
      "Working with QuantifyAI has been an incredibly smooth process as each member of the team goes above and beyond to help make our projects successful. They have been instrumental in helping us reach tricky demographics that others would struggle to obtain and are proactive in taking steps to limit the number of fraudulent survey takers in their panels!",
    ],
    role: "Senior Analyst",
    company: "Research Services",
  },
];

function initTrustedByCarousel() {
  const totalSlides = document.querySelectorAll(
    ".clientsSlider .swiper-slide"
  ).length;
  let autoplayInterval = null;
  let userHasInteracted = false;

  function startAutoplay() {
    console.log("Starting autoplay..."); // Debug log
    if (!userHasInteracted && !autoplayInterval) {
      autoplayInterval = setInterval(() => {
        console.log("Sliding next..."); // Debug log
        if (swiper && swiper.slideNext) {
          swiper.slideNext();
        }
      }, 2000); // Changed to 2 seconds to make it more noticeable
    }
  }

  function stopAutoplay() {
    console.log("Stopping autoplay..."); // Debug log
    userHasInteracted = true;
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  const swiper = new Swiper(".clientsSlider", {
    slidesPerView: 3,
    centeredSlides: true,
    loop: true,
    spaceBetween: 16,
    grabCursor: true,
    speed: 300,
    initialSlide: 4,

    breakpoints: {
      641: {
        slidesPerView: 5,
      },
      1024: {
        slidesPerView: 7,
      },
    },

    touchRatio: 0.5,
    momentumRatio: 0.2,
    momentumVelocityRatio: 0.2,
    touchAngle: 45,
    longSwipes: true,
    shortSwipes: true,
    longSwipesRatio: 0.3,
    shortSwipesMs: 300,
    maxBackfaceHiddenSlides: 7,

    loopedSlides: totalSlides,
    slidesPerGroup: 1,
    preventInteractionOnTransition: true,
    followFinger: true,

    updateOnWindowResize: true,
    observer: true,
    observeParents: true,

    resistance: false,
    resistanceRatio: 0,

    on: {
      init: function () {
        updateActiveSlide(this);
      },
      imagesReady: function () {
        startAutoplay(); // Start after images are loaded
      },
      slideChange: function () {
        updateActiveSlide(this);
      },
      touchStart: function () {
        stopAutoplay();
      },
      click: function () {
        stopAutoplay();
      },
    },
  });

  // Backup autoplay start in case imagesReady doesn't fire
  setTimeout(startAutoplay, 500);

  function updateActiveSlide(swiper) {
    swiper.slides.forEach((slide) => {
      const box = slide.querySelector(".clientBox, .company");
      if (!box) return;

      box.className =
        "clientBox flex items-center justify-center w-full h-[216px] relative rounded-[1.5rem] bg-gradient-to-b from-[rgb(13,49,126,0.25)] to-[rgb(9,32,76,0.25)] shadow-md";

      const svg = box.querySelector("svg");
      if (svg) svg.classList.add("inactive-logo");

      const selectedBg = box.querySelector(`img[src*="${trustedByImage}"]`);
      if (selectedBg) selectedBg.remove();
    });

    const activeSlide = swiper.slides[swiper.activeIndex];
    if (activeSlide) {
      const box = activeSlide.querySelector(".clientBox, .company");
      if (box) {
        box.className =
          "company flex items-center justify-center activeSlide w-[337px] h-[246px] relative";

        const svg = box.querySelector("svg");
        if (svg) svg.classList.remove("inactive-logo");

        if (!box.querySelector(`img[src*="${trustedByImage}"]`)) {
          const bgImg = document.createElement("img");
          bgImg.src = trustedByImage;
          bgImg.className = "absolute inset-0 z-[-1] w-full h-full";
          box.insertBefore(bgImg, box.firstChild);
        }
      }
    }
  }

  // Stop autoplay on any user interaction with the page
  /* document.addEventListener('touchstart', () => stopAutoplay(), { once: true });
  document.addEventListener('mousedown', () => stopAutoplay(), { once: true });
  document.addEventListener('keydown', () => stopAutoplay(), { once: true }); */

  return swiper;
}

// Now let's create the slider functionality
function initTestimonialSlider() {
  let currentIndex = 0;
  let autoplayInterval = null;
  let userHasInteracted = false;

  const prevButton = document.querySelector(".controlsCore button:first-child");
  const nextButton = document.querySelector(".controlsCore button:last-child");
  const indicators = document.querySelectorAll(".buttons .bg");
  const contentDiv = document.querySelector(".content");
  const roleElement = document.querySelector(".author h3");
  const companyElement = document.querySelector(".author h4");

  function startAutoplay() {
    if (!userHasInteracted && !autoplayInterval) {
      autoplayInterval = setInterval(() => {
        if (!userHasInteracted) {
          goToNext();
        }
      }, 5000); // Change slides every 5 seconds
    }
  }

  function stopAutoplay() {
    userHasInteracted = true;
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function updateTestimonial(index) {
    // Update content
    contentDiv.innerHTML = testimonials[index].content
      .map(
        (paragraph) =>
          `<p class="text-[#CCD4FF] text-[16px] lg:text-[22px] font-semibold mb-6">${paragraph}</p>`
      )
      .join("");

    // Update author info
    roleElement.textContent = testimonials[index].role;
    companyElement.textContent = testimonials[index].company;

    // Update indicators - first reset all to default state
    indicators.forEach((indicator) => {
      indicator.className =
        "bg rounded-full bg-white bg-opacity-25 backdrop-blur-lg block w-full h-full overflow-hidden";
    });

    // Then set active indicator to green
    indicators[index].className =
      "bg rounded-full bg-[#C9F261] backdrop-blur-lg block w-full h-full overflow-hidden";
  }

  function goToPrev() {
    currentIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(currentIndex);
  }

  function goToNext() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateTestimonial(currentIndex);
  }

  // Event listeners for controls - stop autoplay on interaction
  prevButton.addEventListener("click", () => {
    stopAutoplay();
    goToPrev();
  });

  nextButton.addEventListener("click", () => {
    stopAutoplay();
    goToNext();
  });

  // Allow clicking on indicators directly - stop autoplay on interaction
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      stopAutoplay();
      currentIndex = index;
      updateTestimonial(currentIndex);
    });
  });

  // Initialize with first testimonial
  updateTestimonial(0);

  // Start autoplay after a short delay
  setTimeout(startAutoplay, 500);

  // Handle visibility and focus changes
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    } else if (!userHasInteracted) {
      startAutoplay();
    }
  });
}

function initLegalModals() {
  const modal = document.getElementById("legal-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalContent = document.getElementById("modal-content");
  const closeButton = document.getElementById("close-modal");

  // Modal content
  const modalContents = {
    privacy: {
      title: "Privacy Policy",
      content: `<p class="mb-4">Last updated: December 2024</p>
                <p class="mb-4">This Privacy Policy describes how QuantifyAI ("we," "us," or "our") collects, uses, and discloses your personal information when you use our services.</p>
                <p class="mb-4">1. Introduction</p>

<p class="mb-4">This "Privacy Policy" is for residents and persons located within the United States and Canada. For all other visitors, please visit the international version of our Privacy Policy here.</p>

<p class="mb-4">We want you to be familiar with how we collect, use, and share your Personally Identifiable Information (defined below). This Privacy Policy outlines the type of information that we collect and receive from and about you via the QuantifyAI Sites and Features and our Services (both as defined below), and our data practices related thereto, with additional disclosures for California, Colorado, Connecticut, Nevada, Utah and Virginia residents in the U.S. State Privacy Notice section below.</p>

<p class="mb-4">To the extent that there is a conflict between this Privacy Policy and the U.S. State Privacy Notice section, the U.S. State Privacy Notice section will control as to residents of those states.</p>

<p class="mb-4">Please review this Privacy Policy carefully, especially before providing any Personally Identifiable Information through the QuantifyAI Sites and Features or our Services. The QuantifyAI Sites and Features and our Services are generally operated in and controlled from the United States of America unless otherwise stated.</p>

<p class="mb-4">QuantifyAI Sites and Features and our Services may collect and use location-aware and cross-device data for advertising and other purposes.</p>

<p class="mb-4">IF YOU DO NOT WISH TO HAVE US COLLECT, USE, AND SHARE INFORMATION AS DESCRIBED IN THIS PRIVACY POLICY, PLEASE DO NOT USE ANY OF THE QuantifyAI SITES AND FEATURES OR OUR SERVICES.</p>

<p class="mb-4">Notice of Terms of Use, Including Arbitration: Your use of the QuantifyAI Sites and Features and our Services is subject to our Terms of Use, which includes binding individual arbitration of any disputes which may arise in connection with such use. Please note that your use of the QuantifyAI Sites and Features or our Services constitutes your express agreement to our Terms of Use, including its arbitration provisions and class action waiver. Please read the Terms of Use—including the arbitration provisions—carefully, and do not use any of the QuantifyAI Sites and Features or our Services if you do not agree.</p>

<p class="mb-4">2. Information We Collect</p>

<p class="mb-4">When you visit any QuantifyAI Sites and Features or use any of our Services, you may share and/or we may automatically collect information that identifies you personally. In this Privacy Policy, "Personally Identifiable Information" (or "PII") refers to any information that can reasonably be used to identify, contact or locate you.</p>

<p class="mb-4">Examples of PII may include, without limitation:</p>
<ul class="list-disc pl-8 mb-4">
  <li>Your name</li>
  <li>Your precise geo-location</li>
  <li>Your credit card number</li>
  <li>Your email address</li>
  <li>Your mailing address</li>
  <li>Your phone number</li>
</ul>

<p class="mb-4">We also collect, and may create from PII, information about you that is not PII ("Non-PII"). If we combine PII collected via QuantifyAI Sites and Features or our Services with other of your PII or with Non-PII, that combined data will be treated as PII subject to this Privacy Policy.</p>

<p class="mb-4">3. How We Use Your Information</p>

<p class="mb-4">We use your PII and non-PII to:</p>
<ul class="list-disc pl-8 mb-4">
  <li>Provide you with our Services</li>
  <li>Operate and improve the QuantifyAI Sites and Features</li>
  <li>Provide advertising, content, surveys, location-based deals, special offers, promotions, and other rewards opportunities</li>
  <li>Marketing, administrative, operational, business, and commercial purposes subject to applicable law</li>
</ul>

<p class="mb-4">4. Information Security</p>

<p class="mb-4">We maintain security measures to help protect against the loss, misuse and alteration of the PII and other information under our control. Please be advised, however, that the Internet and other technologies are, by their nature, not entirely secure, and your PII and non-PII may therefore be subject to interception or loss which is beyond our reasonable control.</p>

<p class="mb-4">5. Contact Us</p>

<p class="mb-4">If you have any questions about this Privacy Policy or our privacy practices, please contact us at our Help Center or through the contact options located in the applicable QuantifyAI Sites and Features footer.</p><p class="mb-4">
QuantifyAI, LLC<br>
3200 Paseo Village Way #2337<br>
San Diego, CA 92130<br>
USA
</p>`,
    },
    terms: {
      title: "Terms of Use",
      content: `<p class="mb-4">Last updated: December 2024</p>
                <p class="mb-4 text-xl font-bold">Terms of Use</p>

<p class="mb-4 text-lg font-bold">NOTICE OF ARBITRATION PROVISIONS</p>

<p class="mb-4">Your use of the QuantifyAI Sites and Features and our Services (both as defined below) is subject to binding individual arbitration of any disputes which may arise, including a class action waiver, as provided in Section 11 of these Terms of Use. Please read the arbitration provisions carefully and do not use any of the QuantifyAI Sites and Features or our Services if you are unwilling to arbitrate any disputes you may have with us (including without limitation any disputes relating to these Terms of Use and our Privacy Policy) as provided herein.</p>

<p class="mb-4 text-lg font-bold">INTRODUCTION</p>

<p class="mb-4">QuantifyAI, LLC (together with any affiliates, the "Company") owns and operates a number of different websites, mobile applications, and interactive services, including without limitation Opinion Elite, QuantifyAI.co, and others (collectively, the "QuantifyAI Sites").</p>

<p class="mb-4">These Terms of Use ("Terms") apply to the QuantifyAI Sites and to all of the features, Internet browser extensions, emails, text (SMS) messages, online services and other functionalities (collectively, the "Features") available via or related to the QuantifyAI Sites, whether accessed via a computer, mobile device or other devices you use (each a "Device" and collectively, "Devices"), or otherwise (collectively, the "QuantifyAI Sites and Features"), and all services available on or through the QuantifyAI Sites and Features ("our Services").</p>

<p class="mb-4">These Terms are a legal agreement between you and the Company. By using any of the QuantifyAI Sites and Features or our Services, or clicking to "Accept" or otherwise agreeing to these Terms where that option is made available to you, you agree to be bound by these Terms. If you do not agree to these Terms, please do not register with or use any QuantifyAI Sites and Features or our Services.</p>

<p class="mb-8 text-lg font-bold">1. USE OF QuantifyAI SITES AND FEATURES</p>

<p class="mb-4">You agree to use the QuantifyAI Sites and Features and our Services only for purposes that are permitted by these Terms and any applicable law, regulation, or generally accepted practices in the relevant jurisdictions.</p>

<p class="mb-4">Subject to all of the provisions of these Terms, the Company hereby grants you a limited, terminable, non-transferable, personal, non-exclusive license to access and use the QuantifyAI Sites and Features and our Services solely as provided herein.</p>

<p class="mb-4">You may download material displayed on the QuantifyAI Sites and Features for non-commercial, personal use only, provided you do not remove any copyright and other proprietary notices contained on the materials. You may not, however, distribute, modify, broadcast, publicly perform, transmit, reuse, re-post, or use the content of the QuantifyAI Sites and Features, including any text, images, audio, or video, for public or commercial purposes without the Company's prior written permission.</p>

<p class="mb-8 text-lg font-bold">2. USER REPRESENTATIONS AND WARRANTIES</p>

<p class="mb-4">We prohibit anyone from using the QuantifyAI Sites and Features or Services who is under thirteen (13) years of age (or, if greater than 13, the minimum age applicable in your jurisdiction).</p>

<p class="mb-4">If you are under the age of eighteen (18) (or the legal age of majority in your jurisdiction), you represent by accessing the QuantifyAI Sites and Features or our Services that you have your parent's or legal guardian's approval to access them.</p>

<p class="mb-4">By using the QuantifyAI Sites and Features or Services, you confirm, represent, and warrant that:</p>

<ul class="list-disc pl-8 mb-4">
  <li class="mb-2">You are able to form a binding contract with QuantifyAI</li>
  <li class="mb-2">You are not subject to the prohibitions described in Excluded Users and Territories (Section 13) of these Terms</li>
  <li class="mb-2">You will comply with these Terms (including any Additional Terms) and all relevant local, state, national, and international laws, rules, and regulations</li>
</ul>

<p class="mb-8 text-lg font-bold">3. REWARDS PROGRAMS</p>

<p class="mb-4 font-bold">A. Overview</p>

<p class="mb-4">The Company may offer one or more rewards programs ("Rewards Programs") under which you may have the opportunity to receive points or other credits (collectively, "Rewards") related to your participation in or interaction with various advertising, content, shopping opportunities, special offers, surveys, coupons, location-based deals, and other Rewards opportunities (collectively, "Offers").</p>

<p class="mb-4 font-bold">B. Suspension or Termination</p>

<p class="mb-4">The Company may limit, suspend, or terminate your ability to participate in a Rewards Program, and may suspend or void any Rewards or potential Rewards you may have received or accumulated in a Rewards Program but not yet successfully redeemed, if we determine in our sole and absolute discretion that you have not complied with these Terms.</p>

<p class="mb-4 font-bold">C. Receiving Rewards</p>

<p class="mb-4">You may receive Rewards in a Rewards Program by participating in various Offers. Subject to the other provisions of these Terms, the Company will deposit any Rewards for Offers that you choose to participate in and successfully complete into your Account. Rewards are deemed successfully completed once you have fully and properly satisfied all of the requirements of the Offer in the manner specified.</p><p class="mb-8 text-lg font-bold">4. SWEEPSTAKES, CONTESTS AND PROMOTIONS</p>

<p class="mb-4">Any sweepstakes, contests, or promotions (collectively, "Promotions") that may be offered via any of the QuantifyAI Sites and Features or our Services may be governed by Additional Terms, including but not limited to official rules, which may set out eligibility requirements, such as certain age or geographic area restrictions.</p>

<p class="mb-8 text-lg font-bold">5. INTELLECTUAL PROPERTY</p>

<p class="mb-4">You acknowledge that the QuantifyAI Sites and Features have been developed, compiled, prepared, revised, selected, and arranged by the Company and others through the expenditure of substantial time, effort and money and constitute valuable intellectual property and trade secrets of the Company and others.</p>

<p class="mb-4">The trademarks, logos, and service marks ("Marks") displayed on the QuantifyAI Sites and Features are the property of the Company or third parties and cannot be used without the written permission of the Company or the third party that owns the Marks.</p>

<p class="mb-8 text-lg font-bold">6. REPORTING COPYRIGHT INFRINGEMENT - DMCA POLICY</p>

<p class="mb-4">If you believe that any content found on or through the QuantifyAI Sites and Features infringes your copyright, you should notify us. To be effective, the notification must be in writing and contain the following:</p>

<ul class="list-disc pl-8 mb-4">
  <li class="mb-2">An electronic or physical signature of the person authorized to act on behalf of the copyright owner</li>
  <li class="mb-2">Description of the copyrighted work claimed to have been infringed</li>
  <li class="mb-2">Description of where the material that you claim is infringing is located</li>
  <li class="mb-2">Your physical mailing address, telephone number and email address</li>
  <li class="mb-2">A statement that you have a good faith belief that the disputed use is not authorized</li>
  <li class="mb-2">A statement, under penalty of perjury, that the information in your notice is accurate</li>
</ul>

<p class="mb-8 text-lg font-bold">7. USER CONDUCT</p>

<p class="mb-4">You agree that you will not engage in any activity that interferes with or disrupts the QuantifyAI Sites and Features or our Services. You further agree that your use of the QuantifyAI Sites and Features and our Services shall not be fraudulent, deceptive, or unlawful.</p>

<p class="mb-8 text-lg font-bold">8. COMMUNICATIONS CHANNELS</p>

<p class="mb-4">The QuantifyAI Sites and Features may include communication channels such as forums, communities, or chat areas. The Company has no obligation to monitor these Communication Channels but reserves the right to review and remove materials at any time.</p>

<p class="mb-8 text-lg font-bold">9. DISCLAIMER OF WARRANTIES AND LIMITATIONS OF LIABILITY</p>

<p class="mb-4">To the maximum extent permitted by applicable law, the Company disclaims any and all guarantees, warranties and representations, express or implied, in connection with the QuantifyAI Sites and Features, or our Services.</p>

<p class="mb-8 text-lg font-bold">10. COMPLIANCE WITH FTC GUIDES</p>

<p class="mb-4">If you choose to promote our services to the public, you agree to comply with the FTC Guides Concerning the Use of Endorsements and Testimonials in Advertising.</p>

<p class="mb-8 text-lg font-bold">11. BINDING ARBITRATION</p>

<p class="mb-4">All disputes and claims between parties shall be resolved through binding arbitration rather than in court, except that you may assert claims in small claims court if your claims qualify.</p>

<p class="mb-8 text-lg font-bold">12. TAX MATTERS</p>

<p class="mb-4">You are responsible for any and all tax liability arising from or associated with your use of the QuantifyAI Sites and Features or our Services, including liability arising from your accrual or redemption of Rewards.</p>

<p class="mb-8 text-lg font-bold">13. EXCLUDED USERS AND TERRITORIES</p>

<p class="mb-4">You are not permitted to use the QuantifyAI Sites and Features or our Services if you are:</p>

<ul class="list-disc pl-8 mb-4">
  <li class="mb-2">Located in, under the control of, or a national or resident of any embargoed country</li>
  <li class="mb-2">Identified as a "Specially Designated National"</li>
  <li class="mb-2">Placed on any U.S. export control list</li>
</ul>

<p class="mb-8 text-lg font-bold">14. INTERNATIONAL USERS</p>

<p class="mb-4">The QuantifyAI Sites and Features and our Services are controlled, operated, and administered from our offices within the United States of America. Access from territories where the contents are illegal is prohibited.</p>

<p class="mb-8 text-lg font-bold">15. NOTIFICATION OF CHANGES</p>

<p class="mb-4">We reserve the right to make changes to these Terms from time to time. We will provide notice of such changes by sending you an administrative email and/or posting those changes on the QuantifyAI Sites and Features.</p>

<p class="mb-8 text-lg font-bold">16. RESIDENTS OF QUEBEC, CANADA</p>

<p class="mb-4">Special provisions apply to residents of Quebec, Canada under the Quebec Consumer Protection Act (QCPA).</p>

<p class="mb-8 text-lg font-bold">17. MISCELLANEOUS</p>

<p class="mb-4">The Company's failure to exercise or enforce any right or provision of these Terms will not be deemed to be a waiver of such right or provision. If any provision is found invalid, the parties agree that such provision should be modified to be valid and enforceable.</p>

<p class="mb-8 text-lg font-bold">18. CONTACT US</p>

<p class="mb-4">If you have any questions or concerns regarding these Terms or your use of any QuantifyAI Sites and Features or our Services, please contact us through our Help Center or contact options located in the applicable QuantifyAI Sites and Features footer.</p>

<p class="mb-4">To contact us by mail, send your correspondence to:</p>

<p class="mb-4">
QuantifyAI, LLC<br>
3200 Paseo Village Way #2337<br>
San Diego, CA 92130<br>
USA
</p>`,
    },
  };

  // Open modal function
  function openModal(type) {
    modalTitle.textContent = modalContents[type].title;
    modalContent.innerHTML = modalContents[type].content;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  }

  // Close modal function
  function closeModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = ""; // Restore scrolling
  }

  // Event listeners for opening modal
  document.querySelectorAll('a[href=""]').forEach((link) => {
    if (link.textContent.toLowerCase().includes("privacy")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        openModal("privacy");
      });
    } else if (link.textContent.toLowerCase().includes("terms")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        openModal("terms");
      });
    }
  });

  // Close modal when clicking close button
  closeButton.addEventListener("click", closeModal);

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
}

function initLearnMoreButton() {
  const learnMoreBtn = document.querySelector(".introButton");
  if (!learnMoreBtn) return;

  learnMoreBtn.addEventListener("click", () => {
    const nextSlide = learnMoreBtn.closest(".slide").nextElementSibling;
    if (!nextSlide) return;

    const isDesktop = window.innerWidth > 1024;
    const scale = isDesktop
      ? window.innerWidth <= 1920
        ? window.innerWidth / 1920
        : 1
      : 1;
    const navHeight = document.querySelector(".nav").offsetHeight;

    let totalOffset = 0;
    let element = nextSlide;

    while (element) {
      totalOffset += element.offsetTop;
      element = element.offsetParent;
    }

    const finalOffset = isDesktop ? totalOffset * scale : totalOffset;
    const offsetAdjustment = isDesktop ? 50 : 20;

    window.scrollTo({
      top: finalOffset - navHeight - offsetAdjustment,
      behavior: "smooth",
    });
  });
}

function initNavigation() {
  const nav = document.querySelector(".nav");
  const navLinks = nav.querySelectorAll("a");
  const isDesktop = () => window.innerWidth > 1024;
  const getScale = () =>
    isDesktop()
      ? window.innerWidth <= 1920
        ? window.innerWidth / 1920
        : 1
      : 1;

  // Section visibility tracking
  function updateActiveSection() {
    const scrollPosition = window.scrollY;
    const navHeight = nav.offsetHeight;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    navLinks.forEach((link) => link.classList.remove("text-primary"));

    let sectionVisibility = [];
    const isNearBottom = scrollPosition + windowHeight >= documentHeight - 100;

    navLinks.forEach((link) => {
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        let totalOffset = 0;
        let element = targetElement;

        while (element) {
          totalOffset += element.offsetTop;
          element = element.offsetParent;
        }

        const scale = getScale();
        const scaledOffset = isDesktop() ? totalOffset * scale : totalOffset;
        const sectionTop = scaledOffset - navHeight - 100;
        const sectionHeight = isDesktop()
          ? targetElement.offsetHeight * scale
          : targetElement.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;
        const buffer = 100;

        const isLastSection = targetId === "contact-us";

        if (isLastSection && isNearBottom) {
          sectionVisibility.push({
            link,
            visibility: 1,
            distance: 0,
            isLast: true,
          });
        } else if (
          scrollPosition >= sectionTop - buffer &&
          scrollPosition < sectionBottom + buffer
        ) {
          let visibleAmount;
          let visibilityPercentage;

          if (isLastSection) {
            const distanceToSection = Math.max(0, sectionTop - scrollPosition);
            visibilityPercentage = 1 - distanceToSection / windowHeight;
          } else {
            visibleAmount = Math.min(
              sectionBottom - scrollPosition,
              sectionHeight
            );
            visibilityPercentage = visibleAmount / sectionHeight;
          }

          if (sectionHeight < windowHeight * 0.5) {
            visibilityPercentage *= 1.5;
          }

          sectionVisibility.push({
            link,
            visibility: Math.min(1, visibilityPercentage),
            distance: Math.abs(scrollPosition - sectionTop),
            isLast: isLastSection,
          });
        }
      }
    });

    if (isNearBottom) {
      const lastLink = Array.from(navLinks).find(
        (link) => link.getAttribute("href") === "#contact-us"
      );
      if (lastLink) {
        lastLink.classList.add("text-primary");
        return;
      }
    }

    if (sectionVisibility.length > 0) {
      const maxVisibility = Math.max(
        ...sectionVisibility.map((s) => s.visibility)
      );
      const mostVisibleSections = sectionVisibility.filter(
        (s) => Math.abs(s.visibility - maxVisibility) < 0.1
      );

      const lastSection = mostVisibleSections.find((s) => s.isLast);
      if (lastSection && scrollPosition > documentHeight - windowHeight * 1.5) {
        lastSection.link.classList.add("text-primary");
        return;
      }

      const activeSection = mostVisibleSections.reduce((prev, curr) =>
        prev.distance < curr.distance ? prev : curr
      );

      activeSection.link.classList.add("text-primary");
    }
  }

  // Click handling with correct order
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // 1. Calculate scroll target
        const scale = getScale();
        const rect = targetElement.getBoundingClientRect();
        const scrollTarget =
          window.pageYOffset + rect.top - nav.offsetHeight - 50;

        // 2. Perform the scroll first
        window.scrollTo(0, scrollTarget);

        // 3. Update nav after scroll
        navLinks.forEach((l) => l.classList.remove("text-primary"));
        link.classList.add("text-primary");
      }
    });
  });

  // Regular scroll handling for backdrop and section updates
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      nav.classList.add("backdrop-blur-lg");
    } else {
      nav.classList.remove("backdrop-blur-lg");
    }

    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveSection, 50);
  });

  // Initial state
  updateActiveSection();
}

function updateOmegaScale() {
  const wrapper = document.querySelector(".omegaWrapper");
  const nav = document.querySelector(".nav");
  if (!wrapper || !nav) return;

  const windowWidth = window.innerWidth;
  console.log("Window width:", windowWidth);
  console.log("innerWidth:", window.innerWidth);
  console.log("clientWidth:", document.documentElement.clientWidth);
  const baseWidth = 1920;
  const mobileBreakpoint = 1024; // Tailwind's lg breakpoint

  // Reset styles
  wrapper.style.cssText = "";
  nav.style.cssText = "";
  document.body.style.height = "";

  // Below mobile breakpoint, let the site respond naturally
  if (windowWidth < mobileBreakpoint) {
    return;
  }

  // Between mobile breakpoint and base width
  if (windowWidth <= baseWidth) {
    const scale = windowWidth / baseWidth;

    const commonStyles = `
      width: ${baseWidth}px;
      position: absolute;
      left: 50%;
      transform-origin: top center;
      transform: translateX(-50%) scale(${scale});
    `;

    wrapper.style.cssText = commonStyles;

    nav.style.cssText = `
      ${commonStyles}
      position: fixed;
      top: 0;
      z-index: 99;
    `;

    const scaledHeight = wrapper.scrollHeight * scale;
    document.body.style.height = `${scaledHeight}px`;
  } else {
    // Above base width styles
    const commonStyles = `
      transform: translateX(-50%);
      left: 50%;
    `;

    wrapper.style.cssText = `
      ${commonStyles}
      position: relative;
    `;

    nav.style.cssText = `
      ${commonStyles}
      position: fixed;
      top: 0;
      z-index: 99;
    `;

    document.body.style.height = `${wrapper.offsetHeight}px`;
  }

  // Add resize observer to handle dynamic content changes
  if (!window.omegaResizeObserver) {
    window.omegaResizeObserver = new ResizeObserver((entries) => {
      // Only apply scaling if we're above the mobile breakpoint
      if (windowWidth >= mobileBreakpoint) {
        const currentScale =
          windowWidth <= baseWidth ? windowWidth / baseWidth : 1;
        const scaledHeight = entries[0].target.scrollHeight * currentScale;
        document.body.style.height = `${scaledHeight}px`;
      }
    });

    window.omegaResizeObserver.observe(wrapper);
  }
}

// Event listeners
window.addEventListener("resize", () => {
  requestAnimationFrame(updateOmegaScale);
});

window.addEventListener("orientationchange", () => {
  // Wait for orientation change to complete
  setTimeout(() => {
    updateOmegaScale();
  }, 100);
});

// Initial calls
document.addEventListener("DOMContentLoaded", () => {
  updateOmegaScale();
  // Additional call after images load to handle dynamic content
  window.addEventListener("load", updateOmegaScale);
});

// Call on important events
window.addEventListener("resize", () => {
  requestAnimationFrame(updateOmegaScale);
});

window.addEventListener("orientationchange", () => {
  // Wait for orientation change to complete
  setTimeout(() => {
    updateOmegaScale();
  }, 100);
});

// Initial call
document.addEventListener("DOMContentLoaded", () => {
  updateOmegaScale();

  // Additional call after images load to handle dynamic content
  window.addEventListener("load", updateOmegaScale);
});

window.addEventListener("resize", updateOmegaScale);
window.addEventListener("orientationchange", updateOmegaScale);
window.addEventListener("load", updateOmegaScale);

export {};
