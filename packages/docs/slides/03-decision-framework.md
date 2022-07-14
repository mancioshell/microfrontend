### Decision Framework

- Define <!-- .element: class="fragment fade-in" -->
- Compose <!-- .element: class="fragment fade-in" -->
- Route <!-- .element: class="fragment fade-in" -->
- Communicate <!-- .element: class="fragment fade-in" -->

---

#### Horizontal Splitting

![Horizontal Splitting](dist/images/horizontal-splitting.png) <!-- .element height="80%" width="80%" -->

---

#### Vertical Splitting

![Vertical Splitting](dist/images/vertical-splitting.png) <!-- .element height="80%" width="80%" -->

---

#### Server Side Composition

![Server Side Composition](dist/images/server-side-composition.png) <!-- .element height="70%" width="70%" -->

- Server Side Rendering <!-- .element: class="fragment fade-in" -->
- Server Side Includes <!-- .element: class="fragment fade-in" -->

---

#### Server Side Composition - SSR

Based on NodeJS Server (Typically Express)

- React: Next.JS, Gatsby <!-- .element: class="fragment fade-in" -->
- Vue: Nuxt.JS <!-- .element: class="fragment fade-in" -->
- Angular: Angular Universal <!-- .element: class="fragment fade-in" -->

---

#### Server Side Composition - SSI

![Server Side Includes](dist/images/ssi.png) <!-- .element height="50%" width="50%" -->

- Well supported in Nginx, Apache, and other web servers <!-- .element: class="fragment fade-in" -->

---

#### Edge Side Composition

![Server Side Composition](dist/images/edge-side-composition.png) <!-- .element  height="70%" width="70%" -->

- Edge Side Inclusion (ESI) <!-- .element: class="fragment fade-in" -->

Note:
Edge Side Includes or ESI is a small markup language for edge level dynamic web content assembly

---

#### Edge Side Composition - ESI

```html
<esi:include
  src="http://example.com/1.html"
  alt="http://bak.example.com/2.html"
  onerror="continue"
/>
```

---

#### Client Side Composition

![Server Side Composition](dist/images/client-side-composition.png) <!-- .element height="70%" width="70%" -->

- Iframe <!-- .element: class="fragment fade-in" -->
- Web Component <!-- .element: class="fragment fade-in" -->
- JS Composition <!-- .element: class="fragment fade-in" -->

---

#### Client Side Composition

![Client Side Composition](dist/images/client-side-composition-vs.png) <!-- .element height="70%" width="70%" -->

---

#### Routing

- Server Side: Podium <!-- .element: class="fragment fade-in" -->
- Edge Side: CDN Url <!-- .element: class="fragment fade-in" -->
- Client Side: react-router, @angular/router, vue-router <!-- .element: class="fragment fade-in" -->

---

#### Comunication

- Shared Bus (Rx JS) <!-- .element: class="fragment fade-in" -->
- URLs (Path / Query String) <!-- .element: class="fragment fade-in" -->
- Storage (Local Storage, Session Storage, Cookie) <!-- .element: class="fragment fade-in" -->
