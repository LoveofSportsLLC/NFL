import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';

const languageOptions = {
  en: {
    icon: '/flags/us.png',
    name: 'English',
  },
  fr: {
    icon: '/flags/fr.png',
    name: 'French',
  },
  de: {
    icon: '/flags/de.png',
    name: 'German',
  },
  nl: {
    icon: '/flags/nl.png',
    name: 'Dutch',
  },
};

const NavbarLanguages = () => {
  const { i18n } = useTranslation();

  const selectedLanguage = languageOptions[i18n.language];

  return (
    <Dropdown className="me-2 nav-item" align="end">
      <Dropdown.Toggle as="a" className="nav-link nav-flag">
        <img src={selectedLanguage.icon} alt={selectedLanguage.name} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Object.keys(languageOptions).map((language) => (
          <Dropdown.Item
            key={language}
            onClick={() => i18n.changeLanguage(language)}
          >
            <img
              src={languageOptions[language].icon}
              alt={languageOptions[language].name}
              width="20"
              className="align-middle me-1"
            />
            <span className="align-middle">
              {languageOptions[language].name}
            </span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavbarLanguages;
