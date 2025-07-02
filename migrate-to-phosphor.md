# Migration Guide: Lucide Icons → Phosphor Icons

## Overview
This guide outlines the systematic replacement of Lucide Icons with Phosphor Icons to achieve a modern, non-skeumorphic design.

## Icon Mapping

### Navigation & UI Icons
| Lucide | Phosphor | Usage |
|--------|----------|-------|
| `Map` | `MapPin` or `Globe` | Maps page, navigation |
| `Search` | `MagnifyingGlass` | Search functionality |
| `BarChart2` | `ChartBar` | Analytics |
| `Star` | `Star` | Collections/favorites |
| `User/Users` | `User/Users` | Profile, user modes |
| `Menu` | `List` | Mobile menu |
| `X` | `X` | Close buttons |
| `Sun/Moon` | `Sun/Moon` | Theme toggle |

### Educational Icons
| Lucide | Phosphor | Usage |
|--------|----------|-------|
| `BookOpen` | `Book` or `BookOpen` | Education |
| `TreePine` | `Tree` | Taxonomy |
| `Database` | `Database` | GBIF data |
| `Globe` | `Globe` | Biodiversity |
| `Microscope` | `Microscope` | Research methods |
| `Leaf` | `Leaf` | Logo, plant-related |

### Action Icons
| Lucide | Phosphor | Usage |
|--------|----------|-------|
| `ArrowLeft/Right` | `ArrowLeft/Right` | Navigation |
| `CheckCircle` | `CheckCircle` | Completion |
| `Info` | `Info` | Information |
| `Target` | `Target` | Objectives |
| `Settings` | `Gear` | Settings |
| `Heart` | `Heart` | Favorites |

### Specialized Icons
| Lucide | Phosphor | Usage |
|--------|----------|-------|
| `Camera` | `Camera` | Photo capture |
| `MapPin` | `MapPin` | Location |
| `Dna` | `Dna` | Genetics |
| `FileSearch` | `FileSearch` | File operations |

## Implementation Strategy

### Step 1: Update Import Statements
```tsx
// Before (Lucide)
import { Search, Leaf, Users, Database, Globe, BookOpen, Zap } from 'lucide-react';

// After (Phosphor)
import { 
  MagnifyingGlass, 
  Leaf, 
  Users, 
  Database, 
  Globe, 
  Book, 
  Lightning 
} from '@phosphor-icons/react';
```

### Step 2: Update Component Usage
```tsx
// Before
<Search className="w-4 h-4" />

// After  
<MagnifyingGlass size={16} />
```

### Step 3: Handle Size Differences
Phosphor uses `size` prop instead of className:
```tsx
// Lucide approach
className="w-4 h-4"     // 16px
className="w-6 h-6"     // 24px
className="w-8 h-8"     // 32px

// Phosphor approach
size={16}
size={24}
size={32}
```

### Step 4: Address Emoji Replacements
Replace skeumorphic emojis with Phosphor icons:

| Emoji | Phosphor Alternative | Context |
|-------|---------------------|---------|
| 🌱 | `<Leaf />` | Citizen mode |
| 🔬 | `<Microscope />` | Researcher mode |
| 📚 | `<Books />` | Educational content |
| 📊 | `<ChartBar />` | Data visualization |
| 🎯 | `<Target />` | Objectives |
| 💡 | `<Lightbulb />` | Tips/ideas |
| 🚀 | `<Rocket />` | Launch/performance |

## Files to Update (Priority Order)

### High Priority (Core Navigation)
1. `src/components/NavBar.tsx`
2. `src/components/landing-page.tsx`
3. `src/app/layout.tsx`

### Medium Priority (Main Pages)
4. `src/app/education/page.tsx`
5. `src/app/maps/page.tsx`
6. `src/app/search/page.tsx`
7. `src/app/analytics/page.tsx`
8. `src/app/profile/page.tsx`
9. `src/app/collections/page.tsx`

### Lower Priority (Educational Modules)
10. `src/app/education/taxonomy/page.tsx`
11. `src/app/education/gbif-data/page.tsx`
12. `src/app/education/biodiversity/page.tsx`
13. `src/app/education/research-methods/page.tsx`

## Benefits of Migration

### Design Consistency
- ✅ Modern, minimal aesthetic
- ✅ No skeumorphic elements
- ✅ Consistent stroke weights
- ✅ Better scalability

### Technical Benefits
- ✅ Consistent sizing API
- ✅ Better tree-shaking
- ✅ More icon variants
- ✅ Better accessibility

## Testing Strategy

1. **Visual Regression**: Compare before/after screenshots
2. **Functionality**: Ensure all interactive icons work
3. **Responsive**: Test icon scaling across devices
4. **Accessibility**: Verify screen reader compatibility

## Gradual Migration Approach

### Phase 1: Core Navigation (1-2 hours)
- Update NavBar and main navigation icons
- Test navigation functionality

### Phase 2: Landing Page (1 hour)
- Replace feature icons and search UI
- Update user mode toggles

### Phase 3: Main Pages (2-3 hours)
- Update each app page systematically
- Replace emoji icons with Phosphor equivalents

### Phase 4: Educational Modules (2-3 hours)
- Update all educational content icons
- Ensure learning progression icons work

## Rollback Plan
- Keep Lucide as dependency during migration
- Use feature flags for gradual rollout
- Maintain branch with original icons as backup

## Estimated Total Time: 6-9 hours
- Planning & setup: 1 hour
- Core migration: 4-6 hours
- Testing & refinement: 1-2 hours
