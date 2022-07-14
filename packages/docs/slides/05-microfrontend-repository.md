### Micro Frontend Repository

- Multirepo vs Monorepo <!-- .element: class="fragment fade-in" -->
- Lerna <!-- .element: class="fragment fade-in" -->

---

#### Multirepo - Benefits

- Benefits <!-- .element: class="fragment fade-in" -->
  - Indipendent Git History <!-- .element: class="fragment fade-in" -->
- Drawbacks <!-- .element: class="fragment fade-in" -->
  - Code and Dependency Duplication <!-- .element: class="fragment fade-in" -->
  - Integration: Git Submodule / Git Subtree <!-- .element: class="fragment fade-in" -->

---

#### Monorepo - Benefits

- Benefits <!-- .element: class="fragment fade-in" -->
  - Easy Onboarding <!-- .element: class="fragment fade-in" -->
  - Deduplicate Dependencies <!-- .element: class="fragment fade-in" -->
- Drawbacks <!-- .element: class="fragment fade-in" -->
  - Performance <!-- .element: class="fragment fade-in" -->
  - Shared Git History <!-- .element: class="fragment fade-in" -->

---

#### Lerna

- Common devDependencies <!-- .element: class="fragment fade-in" -->
- Run an npm script in each package <!-- .element: class="fragment fade-in" -->
- Handle Packages Version <!-- .element: class="fragment fade-in" -->
