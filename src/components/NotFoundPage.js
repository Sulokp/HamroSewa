import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  // CSS styles defined within the component
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      color: '#1e293b',
      textAlign: 'center'
    },
    errorCode: {
      fontSize: 'clamp(100px, 15vw, 200px)',
      fontWeight: '800',
      margin: '0',
      background: 'linear-gradient(45deg, #4361ee, #4cc9f0)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      lineHeight: '1',
      letterSpacing: '-2px',
      textShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
    },
    title: {
      fontSize: 'clamp(24px, 5vw, 36px)',
      fontWeight: '700',
      margin: '20px 0',
      color: '#334155'
    },
    message: {
      fontSize: 'clamp(16px, 3vw, 20px)',
      maxWidth: '600px',
      margin: '0 auto 40px',
      color: '#64748b',
      lineHeight: '1.6'
    },
    link: {
      display: 'inline-block',
      padding: '14px 28px',
      backgroundColor: '#4361ee',
      color: '#ffffff',
      fontSize: '16px',
      fontWeight: '600',
      textDecoration: 'none',
      borderRadius: '50px',
      boxShadow: '0 10px 20px rgba(67, 97, 238, 0.3)',
      transition: 'all 0.3s ease',
      border: 'none',
      cursor: 'pointer',
      marginTop: '20px'
    },
    linkHover: {
      backgroundColor: '#3a56d4',
      transform: 'translateY(-3px)',
      boxShadow: '0 15px 25px rgba(67, 97, 238, 0.4)'
    },
    illustration: {
      width: 'clamp(250px, 50vw, 400px)',
      height: 'auto',
      marginBottom: '30px'
    },
    astronaut: {
      animation: 'float 6s ease-in-out infinite'
    },
    '@keyframes float': {
      '0%': {
        transform: 'translateY(0px)'
      },
      '50%': {
        transform: 'translateY(-20px)'
      },
      '100%': {
        transform: 'translateY(0px)'
      }
    }
  };

  // State for button hover effect
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.astronaut}>
        <svg 
          style={styles.illustration} 
          viewBox="0 0 500 500" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M250 250C250 250 400 100 400 250C400 400 250 400 250 250Z" 
            fill="#4361ee" 
            opacity="0.2"
          />
          <circle 
            cx="250" 
            cy="250" 
            r="120" 
            fill="#f8fafc" 
            stroke="#4361ee" 
            strokeWidth="8"
          />
          <path 
            d="M280 200L220 300" 
            stroke="#4361ee" 
            strokeWidth="12" 
            strokeLinecap="round"
          />
          <path 
            d="M220 200L280 300" 
            stroke="#4361ee" 
            strokeWidth="12" 
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      <h1 style={styles.errorCode}>404</h1>
      <h2 style={styles.title}>Page Not Found</h2>
      <p style={styles.message}>
        Oops! The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable. Please check the URL or navigate back to the homepage.
      </p>
      
      <Link 
        to="/" 
        style={{
          ...styles.link,
          ...(isHovered ? styles.linkHover : {})
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Return to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
