import { animate, inView, scroll, stagger } from "motion";

const doc = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const EASE_OUT = [0.16, 1, 0.3, 1];
const NAV_BREAKPOINT = "(max-width: 1240px)";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

window.__arborMotion = true;

function cornerRadii(el) {
  const s = getComputedStyle(el);
  return [s.borderTopLeftRadius, s.borderTopRightRadius, s.borderBottomRightRadius, s.borderBottomLeftRadius]
    .map((r) => r.split(" ")[0])
    .join(" ");
}

function splitWords(el) {
  const walk = (node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        for (const part of child.textContent.split(/(\s+)/)) {
          if (!part) continue;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            const span = document.createElement("span");
            span.className = "w";
            span.textContent = part;
            frag.appendChild(span);
          }
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    }
  };
  walk(el);
  return $$(".w", el);
}

/* Hero: the page's one authored entrance. Words come into focus, then the supporting copy,
   while the photograph is uncovered from the edge of the screen it bleeds into. */
function heroEntrance() {
  if (!doc.classList.contains("motion")) return;
  const title = $("[data-hero-title]");
  const media = $("[data-hero-media]");
  const words = splitWords(title);

  title.style.opacity = "1";
  animate(
    words,
    { opacity: [0, 1], y: ["0.28em", "0em"], filter: ["blur(8px)", "blur(0px)"] },
    { duration: 0.9, delay: stagger(0.05, { startDelay: 0.08 }), ease: EASE_OUT }
  );
  animate(
    $$("[data-hero]"),
    { opacity: [0, 1], y: [14, 0] },
    { duration: 0.8, delay: stagger(0.08, { startDelay: 0.42 }), ease: EASE_OUT }
  );

  const radii = cornerRadii(media);
  const reveal = animate(
    media,
    { clipPath: [`inset(0% 0% 0% 100% round ${radii})`, `inset(0% 0% 0% 0% round ${radii})`] },
    { duration: 1.25, delay: 0.12, ease: EASE_OUT }
  );
  animate($("img", media), { scale: [1.12, 1] }, { duration: 1.7, delay: 0.12, ease: EASE_OUT });

  reveal.then(() =>
    requestAnimationFrame(() => {
      media.style.clipPath = "";
      doc.classList.remove("motion");
    })
  );
}

/* Header: hairline once the page scrolls, menu on narrow screens, current section in the nav. */
function initHeader() {
  const header = $("#header");
  const sentinel = $(".top-sentinel");
  if (sentinel) {
    new IntersectionObserver(([entry]) => header.classList.toggle("is-scrolled", !entry.isIntersecting)).observe(sentinel);
  }

  const button = $("#menuBtn");
  const nav = $("#primary-nav");
  const links = $$("a", nav);
  const narrow = window.matchMedia(NAV_BREAKPOINT);
  let open = false;

  const setOpen = (next, { returnFocus = false } = {}) => {
    if (next === open) return;
    open = next;
    header.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open && !reduceMotion) {
      animate(nav, { opacity: [0, 1], y: [-6, 0] }, { duration: 0.28, ease: EASE_OUT });
      animate(links, { opacity: [0, 1], y: [8, 0] }, { duration: 0.34, delay: stagger(0.03, { startDelay: 0.03 }), ease: EASE_OUT });
    }
    if (!open && returnFocus) button.focus();
  };

  button.addEventListener("click", () => setOpen(!open));
  links.forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && open) setOpen(false, { returnFocus: true });
  });
  document.addEventListener("click", (e) => {
    if (open && !header.contains(e.target)) setOpen(false);
  });
  narrow.addEventListener("change", (e) => {
    if (!e.matches) {
      setOpen(false);
      nav.style.opacity = "";
      nav.style.transform = "";
    }
  });

  // Scroll spy: mark the section that crosses the middle of the viewport.
  const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const order = [...byId.keys()];
  const visible = new Set();
  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      }
      const current = order.find((id) => visible.has(id));
      for (const [id, a] of byId) {
        if (id === current) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      }
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  order.forEach((id) => {
    const target = document.getElementById(id);
    if (target) spy.observe(target);
  });
}

/* Photographs below the fold open from a slightly inset frame as they arrive. */
function initReveals() {
  if (reduceMotion) return;
  for (const figure of $$("[data-reveal]")) {
    const rect = figure.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) continue;
    const img = $("img", figure);
    const radii = cornerRadii(figure);
    const from = `inset(7% 6% 7% 6% round ${radii})`;
    const to = `inset(0% 0% 0% 0% round ${radii})`;
    figure.style.clipPath = from;
    img.style.transform = "scale(1.1)";

    inView(
      figure,
      () => {
        const play = () => {
          animate(figure, { clipPath: [from, to] }, { duration: 1.1, ease: EASE_OUT }).then(() =>
            requestAnimationFrame(() => {
              figure.style.clipPath = "";
            })
          );
          animate(img, { scale: [1.1, 1] }, { duration: 1.5, ease: EASE_OUT });
        };
        if (img.complete) play();
        else {
          img.addEventListener("load", play, { once: true });
          img.addEventListener("error", play, { once: true });
        }
      },
      { amount: 0.2 }
    );
  }
}

/* Process: a rail fills with scroll and each step lights up as the reader reaches it. */
function initProcess() {
  const wrap = $(".steps-wrap");
  if (!wrap) return;
  const rail = $(".rail", wrap);
  const fill = $(".rail-fill", wrap);
  const steps = $$(".step", wrap);
  let stops = [];

  const measure = () => {
    const last = steps[steps.length - 1];
    const dot = $(".step-n", last);
    const centre = dot.offsetHeight / 2;
    rail.style.top = `${centre}px`;
    rail.style.bottom = `${last.offsetHeight - centre}px`;
    const height = rail.offsetHeight || 1;
    stops = steps.map((step) => step.offsetTop / height);
  };
  measure();
  let pending = 0;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(pending);
    pending = requestAnimationFrame(measure);
  });
  if (document.fonts) document.fonts.ready.then(measure);

  const options = { target: rail, offset: ["start 62%", "end 62%"] };
  scroll(animate(fill, { scaleY: [0, 1] }, { ease: "linear" }), options);
  scroll((progress) => {
    for (let i = 0; i < steps.length; i++) {
      const active = progress >= stops[i] - 0.001 && progress > 0;
      if (steps[i].classList.contains("is-active") !== active) steps[i].classList.toggle("is-active", active);
    }
  }, options);
}

/* Request forms: tab switch with a sliding indicator, validation, confirmation. */
function initRequest() {
  const tabs = { facility: $("#tab-facility"), family: $("#tab-family") };
  const forms = { facility: $("#form-facility"), family: $("#form-family") };
  const keys = Object.keys(tabs);
  const tablist = $(".tabs");
  const indicator = $(".tab-ind");
  const success = $("#success");
  const successTitle = $("#successTitle");
  const successText = $("#successText");
  let current = "facility";

  const moveIndicator = (which) => {
    const x = which === "family" ? "100%" : "0%";
    if (reduceMotion) indicator.style.transform = `translateX(${x})`;
    else animate(indicator, { x }, { type: "spring", bounce: 0, visualDuration: 0.35 });
  };

  const show = (which, { focusTab = false, fade = true } = {}) => {
    const wasDone = !success.hidden;
    success.hidden = true;
    tablist.hidden = false;
    keys.forEach((k) => {
      const on = k === which;
      tabs[k].setAttribute("aria-selected", String(on));
      tabs[k].tabIndex = on ? 0 : -1;
      forms[k].hidden = !on;
    });
    moveIndicator(which);
    if ((which !== current || wasDone) && fade && !reduceMotion) {
      animate(forms[which], { opacity: [0, 1], y: [8, 0] }, { duration: 0.35, ease: EASE_OUT });
    }
    current = which;
    if (focusTab) tabs[which].focus();
  };

  keys.forEach((k) => tabs[k].addEventListener("click", () => show(k)));
  tablist.addEventListener("keydown", (e) => {
    const i = keys.indexOf(current);
    let next = null;
    if (e.key === "ArrowRight") next = keys[(i + 1) % keys.length];
    else if (e.key === "ArrowLeft") next = keys[(i - 1 + keys.length) % keys.length];
    else if (e.key === "Home") next = keys[0];
    else if (e.key === "End") next = keys[keys.length - 1];
    if (next) {
      e.preventDefault();
      show(next, { focusTab: true });
    }
  });
  $$("[data-tab]").forEach((el) => el.addEventListener("click", () => show(el.dataset.tab, { fade: false })));

  const messages = {
    facility: "Thank you. Dr. Kris will call within one business day to set up a short consult. If a resident is in pain or has lost dentures, please call (603) 707-1230 now.",
    family: "Thank you. We will call you within one business day to talk through the next step. If this is about pain or lost dentures, please call (603) 707-1230 now.",
  };

  const isBad = (control) => {
    if (!control.required) return false;
    const value = control.value.trim();
    if (!value) return true;
    if (control.type === "email") return !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
    if (control.type === "tel") return value.replace(/\D/g, "").length < 7;
    return false;
  };

  keys.forEach((k) => {
    const form = forms[k];
    const controls = $$("input, select, textarea", form);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let firstBad = null;
      for (const control of controls) {
        const bad = isBad(control);
        control.closest(".field").classList.toggle("invalid", bad);
        if (control.required) control.setAttribute("aria-invalid", String(bad));
        if (bad && !firstBad) firstBad = control;
      }
      if (firstBad) {
        firstBad.focus();
        return;
      }

      form.hidden = true;
      tablist.hidden = true;
      successText.textContent = messages[k];
      success.hidden = false;
      successTitle.focus({ preventScroll: true });
      success.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });

      if (!reduceMotion) {
        animate(success, { opacity: [0, 1], y: [12, 0] }, { duration: 0.5, ease: EASE_OUT });
        const path = $(".check-path", success);
        const length = path.getTotalLength();
        path.style.strokeDasharray = String(length);
        animate(path, { strokeDashoffset: [length, 0] }, { duration: 0.55, delay: 0.15, ease: EASE_OUT });
      }
      form.reset();
      controls.forEach((c) => c.removeAttribute("aria-invalid"));
    });

    for (const control of controls) {
      const recheck = () => {
        const field = control.closest(".field");
        if (field.classList.contains("invalid") && !isBad(control)) {
          field.classList.remove("invalid");
          control.setAttribute("aria-invalid", "false");
        }
      };
      control.addEventListener("input", recheck);
      control.addEventListener("change", recheck);
    }
  });

  $("#sendAnother").addEventListener("click", () => show(current, { focusTab: true }));
}

/* FAQ: answers open and close with their real height instead of snapping. */
function initFaq() {
  for (const details of $$(".faq details")) {
    const summary = $("summary", details);
    const answer = $(".ans", details);
    let run = 0;
    let controls = null;
    details.classList.toggle("is-open", details.open);

    details.addEventListener("toggle", () => {
      if (!controls) details.classList.toggle("is-open", details.open);
    });

    summary.addEventListener("click", (e) => {
      if (reduceMotion) return;
      e.preventDefault();
      const token = ++run;
      const opening = !details.classList.contains("is-open");
      const from = details.open ? answer.getBoundingClientRect().height : 0;
      if (controls) controls.stop();
      details.classList.toggle("is-open", opening);

      if (opening) {
        answer.style.height = `${from}px`;
        details.open = true;
        const to = answer.scrollHeight;
        controls = animate(answer, { height: [from, to], opacity: [from ? 1 : 0, 1] }, { duration: 0.42, ease: EASE_OUT });
        controls.then(() => {
          if (token !== run) return;
          answer.style.height = "";
          answer.style.opacity = "";
          controls = null;
        });
      } else {
        controls = animate(answer, { height: [from, 0], opacity: [1, 0] }, { duration: 0.3, ease: EASE_OUT });
        controls.then(() => {
          if (token !== run) return;
          details.open = false;
          answer.style.height = "";
          answer.style.opacity = "";
          controls = null;
        });
      }
    });
  }
}

/* Phone action bar: out of the way while the hero buttons, the form or the footer are on screen. */
function initStickyBar() {
  const bar = $("#stickyBar");
  if (!bar) return;
  const hiders = new Set();
  const update = () => {
    const hidden = hiders.size > 0;
    bar.classList.toggle("is-hidden", hidden);
    bar.inert = hidden;
  };
  [".hero-ctas", "#request", ".site-footer"].forEach((selector) => {
    const el = $(selector);
    if (!el) return;
    inView(
      el,
      () => {
        hiders.add(selector);
        update();
        return () => {
          hiders.delete(selector);
          update();
        };
      },
      { amount: "some" }
    );
  });
}

heroEntrance();
initHeader();
initReveals();
initProcess();
initRequest();
initFaq();
initStickyBar();
