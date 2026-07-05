"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import ServiceCard from "../../components/ServiceCard";
import { serviceCategories } from "../data/servicesCatalog";

function categoryId(title: string) {
  return `category-${title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
}

/** Fades and rises children into view when they enter the viewport. */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function ServicesExplorer() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0]?.title ?? "");
  const [stickyTop, setStickyTop] = useState(60);
  const [isStuck, setIsStuck] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  // While > now, the scroll-spy stays quiet so it can't fight a chip click.
  const spyPausedUntil = useRef(0);

  // The header shrinks after scrolling, so keep the toolbar's offset in sync.
  useEffect(() => {
    const measure = () => {
      const header = document.querySelector<HTMLElement>("header.header");
      setStickyTop(header?.offsetHeight ?? 60);
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, []);

  // On mobile, swap to a single-row chip strip once the bar is stuck so it
  // doesn't cover most of the screen.
  useEffect(() => {
    const toolbar = toolbarRef.current;
    if (!toolbar) return;
    const checkStuck = () => {
      setIsStuck(toolbar.getBoundingClientRect().top <= stickyTop + 1);
    };
    checkStuck();
    window.addEventListener("scroll", checkStuck, { passive: true });
    window.addEventListener("resize", checkStuck);
    return () => {
      window.removeEventListener("scroll", checkStuck);
      window.removeEventListener("resize", checkStuck);
    };
  }, [stickyTop]);

  // Scroll-spy: highlight the category currently in view.
  useEffect(() => {
    let raf = 0;
    const computeActive = () => {
      if (Date.now() < spyPausedUntil.current) return;

      // At the very bottom nothing else can scroll into place — mark the last category.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        const last = serviceCategories[serviceCategories.length - 1];
        if (last) setActiveCategory(last.title);
        return;
      }

      const probe = window.innerHeight * 0.35;
      let current = serviceCategories[0]?.title ?? "";
      for (const category of serviceCategories) {
        const el = document.getElementById(categoryId(category.title));
        if (el && el.getBoundingClientRect().top <= probe) {
          current = category.title;
        }
      }
      setActiveCategory(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(computeActive);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  useEffect(() => {
    if (!isStuck || normalizedQuery) return;
    const track = chipsRef.current;
    if (!track) return;
    const active = track.querySelector<HTMLElement>('[aria-selected="true"]');
    active?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeCategory, isStuck, normalizedQuery]);

  const filteredCategories = useMemo(() => {
    if (!normalizedQuery) return serviceCategories;
    return serviceCategories
      .map((category) => ({
        ...category,
        services: category.services.filter(
          (service) =>
            service.title.toLowerCase().includes(normalizedQuery) ||
            service.desc.toLowerCase().includes(normalizedQuery) ||
            category.title.toLowerCase().includes(normalizedQuery)
        ),
      }))
      .filter((category) => category.services.length > 0);
  }, [normalizedQuery]);

  const resultCount = filteredCategories.reduce(
    (sum, category) => sum + category.services.length,
    0
  );

  // Where the section's top should sit in the viewport: below header + toolbar.
  const sectionRestingTop = () => {
    const headerH =
      document.querySelector<HTMLElement>("header.header")?.offsetHeight ?? 60;
    const toolbarH = toolbarRef.current?.offsetHeight ?? 0;
    return headerH + toolbarH + 20;
  };

  const jumpToCategory = (title: string) => {
    setActiveCategory(title);
    spyPausedUntil.current = Date.now() + 2200;
    if (query) setQuery("");
    // Wait two frames so the full list is back in the DOM before scrolling.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById(categoryId(title));
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.scrollY - sectionRestingTop();
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        // Hiding banners / the shrinking header shift the layout mid-scroll,
        // so nudge to the exact spot once the smooth scroll has settled.
        window.setTimeout(() => {
          const target = document.getElementById(categoryId(title));
          if (!target) return;
          const drift = target.getBoundingClientRect().top - sectionRestingTop();
          if (Math.abs(drift) > 8) {
            window.scrollBy({ top: drift, behavior: "smooth" });
          }
        }, 800);
      });
    });
  };

  return (
    <>
      {/* Locator / filter bar */}
      <div
        ref={toolbarRef}
        className={`services-toolbar sticky z-50 mx-auto mb-10 w-full max-w-4xl rounded-2xl border border-teal-100 bg-white px-4 py-4 sm:px-5 ${
          isStuck ? "shadow-lg ring-1 ring-teal-100/80 max-lg:py-3" : ""
        }`}
        style={{ top: stickyTop }}
      >
        <div className="flex flex-col gap-3">
          <div className="relative mx-auto w-full max-w-lg">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-700/60"
              aria-hidden
            />
            <input
              type="text"
              inputMode="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services…"
              aria-label="Search services"
              className="w-full rounded-full border border-teal-200 bg-white py-2 pl-10 pr-10 text-sm text-gray-800 shadow-sm outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-teal-50 hover:text-teal-700"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            )}
          </div>

          <div
            ref={chipsRef}
            className={
              isStuck
                ? "services-chip-track -mx-1 max-lg:overflow-x-auto max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden"
                : undefined
            }
          >
            <div
              className={`flex gap-2 lg:w-full lg:flex-wrap lg:justify-center ${
                isStuck
                  ? "w-max flex-nowrap px-1 max-lg:pb-0.5"
                  : "flex-wrap justify-center"
              }`}
              role="tablist"
              aria-label="Jump to a service category"
            >
              {serviceCategories.map((category) => {
                const isActive = !normalizedQuery && activeCategory === category.title;
                return (
                  <button
                    key={category.title}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => jumpToCategory(category.title)}
                    className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "border-[#0E4541] bg-[#0E4541] text-white shadow-sm"
                      : "border-teal-200 bg-white text-teal-900 hover:border-teal-400 hover:bg-teal-50"
                  }`}
                >
                  {category.title}
                </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {normalizedQuery && (
        <p className="mb-10 text-center text-sm text-gray-600" role="status">
          {resultCount === 0 ? (
            <>No services match &ldquo;{query.trim()}&rdquo;</>
          ) : (
            <>
              {resultCount} {resultCount === 1 ? "service matches" : "services match"} &ldquo;
              {query.trim()}&rdquo;
            </>
          )}
        </p>
      )}

      {resultCount === 0 && normalizedQuery ? (
        <div className="animate-rise-fade mx-auto max-w-md rounded-2xl border border-teal-100 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-semibold text-teal-900">Nothing found</p>
          <p className="mt-2 text-sm text-gray-600">
            Try a different keyword, or browse by category below.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-5 rounded-full bg-[#0E4541] px-5 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 hover:bg-teal-900"
          >
            Show all services
          </button>
        </div>
      ) : (
        filteredCategories.map((category, categoryIndex) => (
          <section key={category.title} id={categoryId(category.title)}>
            <Reveal>
              <h2 className="mb-10 text-center text-3xl font-bold text-teal-900">
                {category.title}
              </h2>
            </Reveal>
            <div
              className={`grid gap-10 sm:grid-cols-2 lg:grid-cols-3 ${
                categoryIndex < filteredCategories.length - 1 ? "mb-20" : ""
              }`}
            >
              {category.services.map((service, serviceIndex) => (
                <Reveal
                  key={service.slug}
                  delay={(serviceIndex % 3) * 90}
                  className="h-full"
                >
                  <ServiceCard
                    image={service.image}
                    title={service.title}
                    desc={service.desc}
                    href={`/services/${service.slug}`}
                    serviceSlug={service.slug}
                    showLearnMore={true}
                    bookButtonVariant="outline"
                  />
                </Reveal>
              ))}
            </div>
          </section>
        ))
      )}
    </>
  );
}
