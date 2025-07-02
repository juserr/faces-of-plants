# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2025-07-02

### Added
- Complete migration from Lucide React to Phosphor Icons for modern, consistent UI
- Responsive NavBar layout with proper icon semantics (Leaf for Citizen, Microscope for Researcher)
- Single person User icon for profile instead of Users (multiple people)
- Phosphor Icons throughout all education pages and components
- Responsive design optimization for screen widths 1024px-1080px

### Changed
- **BREAKING**: NavBar layout order now follows: Navigation Links → Mode Toggle → Theme Toggle → Profile Icon
- Updated copyright year to 2025 across all pages
- Replaced all skeumorphic emoji icons with semantic Phosphor Icons
- Improved spacing and padding in NavBar for better responsiveness
- Enhanced visual consistency across all pages and components

### Fixed
- NavBar overlap issues between 1024px-1080px screen widths
- Semantic correctness of profile icon (User vs Users)
- Icon consistency between desktop and mobile breakpoints
- Search results now use proper MapPin and Calendar icons instead of emoji

### Removed
- All Lucide React dependencies and imports
- Skeumorphic emoji icons from search results and navigation
- Inconsistent icon usage across components

### Technical Details
- Migrated 30+ individual icon instances to Phosphor
- Updated 8 core files with new icon system
- Maintained full accessibility and responsive design
- Zero TypeScript errors after migration
- Complete visual consistency achieved

## [0.1.0] - 2025-07-01

### Added
- Initial release of Faces of Plants application
- Natural language search powered by AI
- GBIF data integration for biodiversity exploration
- Dual interface for Citizen Scientists and Researchers
- Educational modules for taxonomy, biodiversity, GBIF data, and research methods
- Interactive maps and analytics features
- Theme support (light/dark mode)
- Responsive design for all device sizes
- SST (Serverless Stack) infrastructure setup
