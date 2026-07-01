import React, { useState, useEffect, useRef } from "react";
import Navigation from "../components/Navbar";
import Footer from "../components/Footer";
import BlogList from "../components/Blog/BlogList";
import { FiSearch, FiArrowDown, FiTrendingUp, FiUsers, FiBookOpen, FiZap } from "react-icons/fi";
import { useScrollReveal } from "../components/Hooks/useScrollReveal";
import './Home.css';

function Particle({ style }) {
  return <div className="particle" style={style} />;
}

function Home() {
  const [search, setSearch] = useState("");
  const [particles, setParticles] = useState([]);
  const heroRef = useRef(null);
  useScrollReveal();

  // Generate floating particles
  useEffect(() => {
    const p = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 8}s`,
      animationDuration: `${6 + Math.random() * 8}s`,
      width: `${2 + Math.random() * 4}px`,
      height: `${2 + Math.random() * 4}px`,
      opacity: 0.3 + Math.random() * 0.4,
    }));
    setParticles(p);
  }, []);

  // 3D tilt effect on hero card
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(1200px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
    };
    const handleMouseLeave = () => {
      el.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
      el.style.transition = 'transform 0.6s ease';
    };
    const handleMouseEnter = () => {
      el.style.transition = 'transform 0.1s ease';
    };
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseenter', handleMouseEnter);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  const scrollToBlogs = () => {
    document.getElementById('blogs-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { icon: <FiBookOpen />, value: "500+", label: "Articles" },
    { icon: <FiUsers />,    value: "2K+",  label: "Readers" },
    { icon: <FiTrendingUp />, value: "50+", label: "Categories" },
  ];

  return (
    <div className="page-wrapper">
      <Navigation />

      {/* ─── Hero Section ─────────────────────────────────────── */}
      <section className="hero-section">
        {/* Particle field */}
        <div className="particle-field" aria-hidden="true">
          {particles.map((p) => (
            <Particle
              key={p.id}
              style={{
                left: p.left,
                width: p.width,
                height: p.height,
                opacity: p.opacity,
                animationDuration: p.animationDuration,
                animationDelay: p.animationDelay,
              }}
            />
          ))}
        </div>

        {/* Orbs */}
        <div className="hero-orb orb-1" aria-hidden="true" />
        <div className="hero-orb orb-2" aria-hidden="true" />
        <div className="hero-orb orb-3" aria-hidden="true" />

        <div className="hero-content">
          {/* Tag line */}
          <div className="hero-tag reveal">
            <FiZap className="tag-icon" />
            <span>The Future of Blogging is Here</span>
          </div>

          {/* 3D Tilt Card wrapping the headline */}
          <div ref={heroRef} className="hero-headline-wrapper reveal delay-100">
            <h1 className="hero-title">
              Discover&nbsp;
              <span className="title-gradient">Stories</span>
              <br />
              That&nbsp;<span className="title-outline">Inspire</span>
            </h1>
          </div>

          <p className="hero-subtitle reveal delay-200">
            Explore groundbreaking ideas, cutting-edge insights, and captivating narratives
            from the world's most creative minds.
          </p>

          {/* Search Bar */}
          <div className="hero-search-wrapper reveal delay-300">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search articles, topics, authors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="search-btn">
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="hero-stats reveal delay-400">
            {stats.map((s, i) => (
              <div key={i} className="stat-item">
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll CTA */}
          <button className="scroll-cta reveal delay-500" onClick={scrollToBlogs}>
            <span>Explore Blogs</span>
            <FiArrowDown className="scroll-arrow" />
          </button>
        </div>

        {/* Bottom gradient fade */}
        <div className="hero-bottom-fade" aria-hidden="true" />
      </section>

      {/* ─── Blogs Section ────────────────────────────────────── */}
      <section id="blogs-section" className="blogs-section">
        <div className="blogs-section-inner">
          {/* Section Header */}
          <div className="section-header">
            <div className="section-tag reveal">
              <span className="tag-dot" />
              Latest Posts
            </div>
            <h2 className="section-title reveal delay-100">
              All <span className="text-gradient">Blogs</span>
            </h2>
            <p className="section-subtitle reveal delay-200">
              Explore our curated collection of thought-provoking articles
            </p>
            <div className="neon-divider reveal delay-300" />
          </div>

          {/* Blog Grid */}
          <BlogList searchQuery={search} />
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default Home;