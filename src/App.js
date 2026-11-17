

import React, { useState, useEffect } from 'react';
import emailjs from "@emailjs/browser";
import './App.css';
emailjs.init("9rq094AsqGtTC12se");


export default function App() {
  
  
  const currentPage = 'real-site';
  const [activeNav, setActiveNav] = useState('home');
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    project_type: '',
    message: ''
  });
  
  const [msgStatus, setMsgStatus] = useState("");
const [msgColor, setMsgColor] = useState("#73e0bd");

  
  
  useEffect(() => {
    const initScrollAnimations = () => {
      const elements = document.querySelectorAll(
        ".slide-in-left, .slide-in-right, .slide-in-up, .reveal"
      );
      
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translate(0)";
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      
      elements.forEach(el => observer.observe(el));
    };

    initScrollAnimations();
  }, []);

  // ===== SCROLL NAVBAR DETECTION =====
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute("id");
        }
      });

      if (current) {
        setActiveNav(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ===== SMOOTH SCROLL ANCHOR LINKS =====
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute("href");
      const element = document.querySelector(href);
      
      if (element) {
        e.preventDefault();
        window.scrollTo({
          top: element.offsetTop - 120,
          behavior: "smooth"
        });
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  // Handle navigation
  const handleNavClick = (section) => {
    setActiveNav(section);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleFormSubmit = (e) => {
  e.preventDefault();

  // Validation des champs
  if (!formData.user_name || !formData.user_email || !formData.project_type || !formData.message) {
    setMsgStatus("Veuillez remplir tous les champs.");
    setMsgColor("#ff8a8a");
    return;
  }

  // Envoyer l'email avec EmailJS
  emailjs
    .send(
      "service_fm48ryq",      // TON Service ID
      "template_23g7mrw",     // TON Template ID
      {
        user_name: formData.user_name,
        user_email: formData.user_email,
        project_type: formData.project_type,
        message: `${formData.message}\n\nType de projet : ${formData.project_type}`,
      }
    )
    .then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        setMsgStatus("Votre message a bien été envoyé. Je vous répondrai bientôt.");
        setMsgColor("#73e0bd");
        // Reset the form after a successful send.
        setFormData({
          user_name: '',
          user_email: '',
          project_type: '',
          message: ''
        });
        // Clear the confirmation after three seconds.
        setTimeout(() => setMsgStatus(""), 3000);
      },
      (error) => {
        console.log("FAILED...", error);
        setMsgStatus("L’envoi du message a échoué. Veuillez réessayer.");
        setMsgColor("#ff8a8a");
      }
    );
};

  const handleProjectAction = (project, action) => {
    const message = action === 'view'
      ? `Bonjour, pourriez-vous m'envoyer le lien pour découvrir le projet « ${project.title} » ?`
      : `Bonjour, je souhaite créer un site comme « ${project.title} ». Pouvez-vous me recontacter pour en discuter ?`;
    setFormData(prev => ({ ...prev, message }));
  };

  const handleServiceAction = (service) => {
    setFormData(prev => ({
      ...prev,
      project_type: service.projectType,
      message: `Bonjour, je souhaite demander le service « ${service.title} ».`
    }));
  };

  return (
    <>
      {/* INTRO SCREEN */}
      {currentPage === 'intro' && (
        <div id="intro">
          <div className="main">
            <div className="card">
              {/* TOP TAGS */}
              <div className="top-tags">
                <span className="dot">SYSTÈME PRÊT</span>
                <span>PORTFOLIO 2026</span>
                <span>INTERFACE EN CHARGEMENT</span>
              </div>

              <div className="content">
                {/* LEFT */}
                <div className="left">
                  <h1>
                    Bienvenue sur <br />
                    mon portfolio <br />
                    en ligne
                  </h1>

                  <p className="desc">
                    Je crée des expériences numériques modernes, rapides et fiables,
                    avec des interfaces claires et un développement soigné.
                  </p>

                  <div className="live-line">
                    <span>EN LIGNE</span>
                  </div>

                  <div className="buttons">
                    <div className="btn"><i className="fa-solid fa-code"></i> CODE</div>
                    <div className="btn"><i className="fa-solid fa-user"></i> PROFIL</div>
                    <div className="btn"><i className="fa-brands fa-github"></i> CODE SOURCE</div>
                  </div>

                  {/* LIEN DU SITE */}
                  <div className="site-link">
                    <i className="fa-solid fa-globe"></i>
                    <span>www.zineddinedsb.dev</span>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="right">
                  <div className="right-head">
                    <span>INTERFACE</span>
                    <span className="online">EN LIGNE</span>
                  </div>

                  <div className="orbit-box">
                    <div className="orbit">
                      <i className="fa-solid fa-layer-group i1"></i>
                      <i className="fa-solid fa-bolt i2"></i>
                      <i className="fa-solid fa-code i3"></i>
                      <i className="fa-solid fa-wifi i4"></i>
                    </div>

                    <div className="core">
                      <span>BIENVENUE</span>
                    </div>
                  </div>

                  <div className="stats">
                    <div>
                      <h4>04</h4>
                      <p>Chargé</p>
                    </div>
                    <div>
                      <h4>22ms</h4>
                      <p>Stable</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REAL SITE */}
      {currentPage === 'real-site' && (
        <div id="real-site">
          <Header activeNav={activeNav} onNavClick={handleNavClick} />
          
          <Home />
          <About />
          <Project onProjectAction={handleProjectAction} />
          <Services onServiceAction={handleServiceAction} />
          <Contact 
  formData={formData} 
  onFormChange={handleFormChange} 
  onFormSubmit={handleFormSubmit}
  msgStatus={msgStatus}
  msgColor={msgColor}
/>
        </div>
      )}
    </>
  );
}

// ============================================
// HEADER / NAVIGATION COMPONENT
// ============================================
function Header({ activeNav, onNavClick }) {
  
  return (
    <header>
      <nav className="div-list" aria-label="Navigation principale">
        <ul className="ul-list">
          <li className={activeNav === 'home' ? 'active' : ''}>
            <i className="fa-solid fa-circle-user" aria-hidden="true"></i>
            <a href="#home" onClick={() => onNavClick('home')}>Accueil</a>
          </li>
          <li className={activeNav === 'about' ? 'active' : ''}>
            <i className="fa-regular fa-address-card" aria-hidden="true"></i>
            <a href="#about" onClick={() => onNavClick('about')}>À propos</a>
          </li>
          <li className={activeNav === 'project' ? 'active' : ''}>
            <i className="fa-regular fa-folder-open" aria-hidden="true"></i>
            <a href="#project" onClick={() => onNavClick('project')}>Projets</a>
          </li>
          <li className={activeNav === 'service' ? 'active' : ''}>
            <i className="fa-solid fa-code" aria-hidden="true"></i>
            <a href="#service" onClick={() => onNavClick('service')}>Services</a>
          </li>
          <li className={activeNav === 'contact' ? 'active' : ''}>
            <i className="fa-regular fa-envelope" aria-hidden="true"></i>
            <a href="#contact" onClick={() => onNavClick('contact')}>Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

// ============================================
// HOME SECTION
// ============================================
function Home() {
  return (
    <section className="home" id="home">
      <p className="home-p">
        <span className="home-s">. </span>Disponible pour de nouveaux projets
      </p>
      <div className="home-container">
        <div className="home-section">
          <div className="info-home">
            <p className="eyebrow">DÉVELOPPEUR WEB - POUR LES ENTREPRISES</p>
            <h1>Je crée des sites qui attirent des clients.</h1>
            <h3 className="home-subtitle">Développeur Web. Je crée des sites vitrines, boutiques en ligne et sites sur-mesure pour les entreprises. WordPress et sur-mesure, rapides et pensés pour ramener des clients.</h3>
            <div className="home-proofs" aria-label="Repères de réalisation">
              <span className="home-proof"><strong>10+</strong> Projets réalisés</span>
              <span className="home-proof"><strong>Livraison</strong> en 5 jours</span>
              <span className="home-proof"><strong>À partir de</strong> 490 €</span>
            </div>
            <div className="btnn">
      <a href="#contact" className="btn-home1"><i className="fa-solid fa-arrow-right"></i> Parlons de votre projet</a>
              <a href="#contact" className="btn-home2"><i className="fa-solid fa-file-signature"></i> Demander un devis gratuit</a>
            </div>
            <div className="hhr">
              <hr />
            </div>
            <div className="follow">
              <p className="followw">Retrouvez-moi :</p>
              <ul>
               <li><a href="https://github.com/zineddinedsb" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i></a></li>
                <li><a href="https://www.linkedin.com/in/zineddine-dsb-1234b1234/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a></li>
                <li><a href="https://wa.me/213555464970?text=Bonjour%2C%20je%20souhaite%20d%C3%A9velopper%20un%20site%20web%20sur%20mesure%20pour%20mon%20activit%C3%A9.%0AMerci%20de%20me%20contacter%20pour%20un%20devis." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// ABOUT SECTION
// ============================================
function About() {
  return (
    <section className="about reveal" id="about">
      <h3>À PROPOS</h3>
      <div className="about-info2">
        <div className="about-text">
          <p>Je suis Zineddine, développeur web.

J'aide les entreprises et les indépendants à avoir un site internet qui travaille vraiment pour eux.

Que ce soit pour présenter une activité, vendre en ligne, prendre des réservations ou générer des demandes de devis, je construis des sites rapides, clairs sur mobile et optimisés pour Google.

Mon approche est simple : un site doit être beau, mais surtout utile. Il doit donner envie à vos visiteurs de vous contacter, de réserver ou d'acheter.

Chaque projet est livré clé en main : conception, développement, mise en ligne et accompagnement.</p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROJECTS SECTION
// ============================================
function Project({ onProjectAction }) {
  const projects = [
    {
      id: 'eclat-agency',
      icon: 'fa-bullhorn',
      type: 'Site vitrine d’agence publicitaire',
      title: 'ÉCLAT AGENCY',
      subtitle: 'Site Web - Agence Publicitaire',
      description: 'Site vitrine moderne pour une agence publicitaire. Présentation des services, réalisations, demande de devis en ligne et contact rapide. Un site rapide, clair sur mobile et pensé pour ramener des clients.',
      visualBackground: 'linear-gradient(135deg, #46208e 0%, #5756d8 52%, #137eae 100%)',
      tools: ['Site Vitrine', 'Demande de Devis en ligne', 'Responsive Mobile', 'Optimisé SEO'],
      viewLabel: 'Voir le site en direct',
      viewUrl: 'https://roaring-mandazi-070d8c.netlify.app/'
    },
    {
      id: 'evalphp',
      icon: 'fa-graduation-cap',
      type: 'Éducation en ligne',
      title: 'Plateforme d’apprentissage en ligne - Académie EvalPHP',
      description: 'Site complet pour une école : inscription des élèves, cours, quiz en ligne, correction automatique et résultats des examens. L’école gère 100 % de ses élèves en ligne, sans papier.',
      tools: ['PHP', 'MySQL', 'JavaScript'],
      viewLabel: 'Voir le site en direct'
    },
    {
      id: 'cosmetiques',
      icon: 'fa-bag-shopping',
      type: 'Boutique en ligne',
      title: 'Boutique en ligne - Cosmétiques',
      description: 'Boutique complète pour une marque de cosmétiques : catalogue de produits, panier, paiement et suivi des commandes. Le client peut acheter facilement depuis son téléphone.',
      tools: ['Boutique en ligne', 'Paiement', 'Mobile'],
      viewLabel: 'Voir la boutique'
    },
    {
      id: 'restaurant-lyon',
      icon: 'fa-utensils',
      type: 'Site vitrine',
      title: 'Site Vitrine - Restaurant à Lyon',
      description: 'Site pour un restaurant : menu en ligne, photos, bouton de réservation, Google Maps et avis clients. Livré en cinq jours, à partir de 490 €.',
      image: 'https://images.unsplash.com/photo-1758537697448-dbfc1cb83e49?auto=format&fit=crop&w=1200&q=85',
      imageAlt: 'Salle de restaurant chaleureuse avec tables dressées',
      tools: ['Site vitrine', 'Réservation', 'Mobile'],
      viewLabel: 'Voir le site'
    },
    {
      id: 'atelier-lumiere',
      icon: 'fa-scissors',
      type: 'Site vitrine',
      title: 'Site Vitrine - Salon de Coiffure à Paris',
      subtitle: 'Atelier Lumière',
      description: 'Site vitrine pour un salon de coiffure à Paris 2ème : présentation des services,  galerie avant / après, avis clients, bouton Réserver en ligne et WhatsApp. Site 100 % responsive, optimisé pour le téléphone.',
      image: 'https://images.unsplash.com/photo-1675034743339-0b0747047727?auto=format&fit=crop&w=1200&q=85',
      imageAlt: 'Une femme se fait coiffer dans un salon de coiffure lumineux',
      tools: ['Site vitrine', 'Réservation', 'Mobile'],
      priceLabel: 'À partir de 490 € · Livré en 5 jours',
      viewLabel: 'Voir le site en direct',
      viewUrl: 'https://glittering-bombolone-0eb7f0.netlify.app/',
      requestLabel: 'Demander un site comme celui-ci'
    }
  ];

  return (
    <section className="project reveal" id="project">
      <p>PROJETS</p>
      <h1>Projets sélectionnés</h1>
      <hr />
      <div className="info-pro">
        <p>Des sites qui aident les entreprises à vendre plus.</p>
      </div>
      <div className="projects-container">
        {projects.map(project => <ProjectCard key={project.id} project={project} onProjectAction={onProjectAction} />)}
      </div>
      <a className="projects-contact-cta" href="#contact">Vous voulez un site comme ça ? Contactez-moi</a>
    </section>
  );
}

function ProjectCard({ project, onProjectAction }) {
  return (
    <article className="project-card">
      <div
        className={`project-card-visual${project.image ? '' : ' project-card-visual-placeholder'}`}
        style={project.visualBackground ? { background: project.visualBackground } : undefined}
        aria-hidden={project.visualBackground ? 'true' : undefined}
      >
        {project.image ? (
          <img src={project.image.startsWith('http') ? project.image : `${process.env.PUBLIC_URL}${project.image}`} alt={project.imageAlt} loading="lazy" />
        ) : project.visualBackground ? null : (
          <i className={`fa-solid ${project.icon}`} aria-hidden="true"></i>
        )}
      </div>
      <div className="repo-card-top">
        <i className={`fa-solid ${project.icon}`} aria-hidden="true"></i>
        <span>{project.type}</span>
      </div>
      <h3>{project.title}</h3>
      {project.subtitle && <h4 className="project-card-subtitle">{project.subtitle}</h4>}
      <p>{project.description}</p>
      {project.priceLabel && (
        <div className="project-card-price">
          <i className="fa-solid fa-tag" aria-hidden="true"></i>
          <span>{project.priceLabel}</span>
        </div>
      )}
      <div className="skills">
        {project.tools.map(tool => <span key={tool}>{tool}</span>)}
      </div>
      <div className="project-card-actions">
        <a
          href={project.viewUrl || '#contact'}
          className="project-action project-action-primary"
          onClick={project.viewUrl ? undefined : () => onProjectAction(project, 'view')}
          target={project.viewUrl ? '_blank' : undefined}
          rel={project.viewUrl ? 'noopener noreferrer' : undefined}
        >
          {project.viewLabel}
        </a>
        <a href="#contact" className="project-action project-action-secondary" onClick={() => onProjectAction(project, 'request')}>
          {project.requestLabel || (project.id === 'cosmetiques' ? 'Demander une boutique comme celle-ci' : 'Demander un site comme celui-ci')}
        </a>
      </div>
    </article>
  );
}

// ============================================
// SERVICES SECTION
// ============================================
function Services({ onServiceAction }) {
  const services = [
    {
      id: 'site-vitrine',
      icon: 'fas fa-store',
      title: 'Site Vitrine 490€',
      desc: 'Un site responsive pour présenter votre activité, vos services et vos coordonnées.',
      features: ['Responsive', 'Référencement', 'Contact'],
      projectType: 'Site Vitrine 490€'
    },
    {
      id: 'site-wordpress',
      icon: 'fas fa-globe',
      title: 'Site WordPress 490€',
      desc: 'Un site WordPress facile à mettre à jour, adapté à votre activité et à vos clients.',
      features: ['WordPress', 'Responsive', 'Référencement'],
      projectType: 'Site WordPress 490€'
    },
    {
      id: 'boutique-en-ligne',
      icon: 'fas fa-cart-shopping',
      title: 'Boutique en ligne 890€',
      desc: 'Une boutique complète avec catalogue, panier, paiement sécurisé et suivi des commandes.',
      features: ['Catalogue', 'Paiement sécurisé', 'Suivi des commandes'],
      projectType: 'Boutique en ligne 890€'
    },
    {
      id: 'site-sur-mesure',
      icon: 'fas fa-code',
      title: 'Site Sur-mesure Sur devis',
      desc: 'Un site conçu autour de vos besoins, avec les fonctionnalités adaptées à votre activité.',
      features: ['Fonctionnalités adaptées', 'Responsive', 'Accompagnement'],
      projectType: 'Site Sur-mesure Sur devis'
    }
  ];

  return (
    <section id="service" className="section services reveal">
      <p>MES SERVICES</p>
      <h1>Ce que je peux créer pour vous</h1>
      <hr />
      <div className="container">
        <div className="services-content">
          <div className="services-grid">
            {services.map(service => <ServiceCard key={service.id} service={service} onServiceAction={onServiceAction} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

// Service Card Component
function ServiceCard({ service, onServiceAction }) {
  return (
    <div className="service-card">
      <div className="service-icon">
        <i className={service.icon}></i>
      </div>
      <h3>{service.title}</h3>
      <p>{service.desc}</p>
      <div className="service-features">
        {service.features.map(feature => <span key={feature}>{feature}</span>)}
      </div>
      <a href="#contact" className="project-action project-action-primary service-action" onClick={() => onServiceAction(service)}>Demander ce service</a>
    </div>
  );
}

// ============================================
// CONTACT SECTION
// ============================================
function Contact({ formData, onFormChange, onFormSubmit ,msgStatus, msgColor }) {
  return (
    <section id="contact" className="section reveal">
      <div className="container">
        <h2 className="section-title">Me contacter</h2>
        <div className="contact-content">
          <div className="contact-info slide-in-left">
            <p>Vous avez un projet en tête ? Parlons-en. Je suis disponible pour étudier vos besoins et vous proposer une solution adaptée.</p>
            <p className="contact-response">Réponse en moins de 24h - Devis gratuit sans engagement</p>
            <div className="contact-details">
              <div className="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a href="mailto:zinousebih128@gmail.com">zinousebih128@gmail.com</a>
              </div>
              <div className="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>+213 555-46-49-70</span>
              </div>
              <div className="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>Basé à Alger</span>
              </div>
            </div>
            <div className="social-links">
              <a href="https://github.com/Zineddinedsb" className="social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/zineddine-sebih-97b572350" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://wa.me/213555464970?text=Bonjour%2C%20je%20souhaite%20d%C3%A9velopper%20un%20site%20web%20sur%20mesure%20pour%20mon%20activit%C3%A9.%0AMerci%20de%20me%20contacter%20pour%20un%20devis."  className="social-link" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="contact-form slide-in-right">
            <form onSubmit={onFormSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Nom"
                  aria-label="Nom"
                  required 
                  name="user_name"
                  value={formData.user_name}
                  onChange={onFormChange}
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Email"
                  aria-label="Email"
                  required 
                  name="user_email"
                  value={formData.user_email}
                  onChange={onFormChange}
                />
              </div>
              <div className="form-group">
                <select
                  name="project_type"
                  aria-label="Type de projet"
                  required
                  value={formData.project_type}
                  onChange={onFormChange}
                >
                  <option value="" disabled>Type de projet</option>
                  <option value="Site Vitrine 490€">Site Vitrine 490€</option>
                  <option value="Site WordPress 490€">Site WordPress 490€</option>
                  <option value="Boutique en ligne 890€">Boutique en ligne 890€</option>
                  <option value="Site Sur-mesure Sur devis">Site Sur-mesure Sur devis</option>
                </select>
              </div>
              <div className="form-group">
                <textarea 
                  name="message" 
                  placeholder="Votre message"
                  aria-label="Votre message"
                  rows="5" 
                  required
                  value={formData.message}
                  onChange={onFormChange}
                ></textarea>
              </div>
              <button type="submit" className="btn">Envoyer le message</button>
              {msgStatus && <p className="form-status" role="status" style={{ color: msgColor }}>{msgStatus}</p>}
            </form>
          </div>
        </div>
        
      </div>
    </section>
  );
}
