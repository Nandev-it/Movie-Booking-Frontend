
<script setup>
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Dribbble,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from 'lucide-vue-next'

import abaLogo from '../assets/banks/aba.png'
import acledaLogo from '../assets/banks/acleda.png'
import amretLogo from '../assets/banks/amret.png'
import trueLogo from '../assets/banks/true.png'
import wingsLogo from '../assets/banks/wings.png'
import logoImg from '../assets/icons/cineverse-legend.png'



const bankLogos = [
  { src: abaLogo, alt: 'ABA Bank' },
  { src: acledaLogo, alt: 'ACLEDA Bank' },
  { src: amretLogo, alt: 'Amret Bank' },
  { src: trueLogo, alt: 'True Money' },
  { src: wingsLogo, alt: 'WING Bank' },
]
</script>

<template>
  <footer class="relative min-h-screen overflow-hidden bg-black text-white mt-12">

    <!-- Background Effect -->
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.04]"
      aria-hidden="true"
    >
      <div
        class="absolute left-[8%] top-10 h-[450px] w-[700px]
               rounded-full bg-gray-500 blur-3xl"
      ></div>

      <div
        class="absolute right-[5%] top-20 h-[400px] w-[500px]
               rounded-full bg-gray-500 blur-3xl"
      ></div>
    </div>

    <div class="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">

      <!-- ===================== -->
      <!-- TOP FOOTER -->
      <!-- ===================== -->

      <div
        class="grid grid-cols-1 gap-10  pb-10
               sm:grid-cols-2
               lg:grid-cols-4
               xl:grid-cols-5"
      >

        <!-- BRAND -->
        <div class="sm:col-span-2 lg:col-span-2 xl:col-span-2">

          <!-- Logo -->
          <a
            href="/"
            class="mb-5 inline-flex items-center gap-3"
          >
            <img
              :src="logoImg"
              alt="Cineverse Logo"
              class="h-11 w-11 object-cover"
            />
          </a>

          <!-- Description -->
          <p
            class="max-w-md text-sm leading-6 text-gray-400"
          >
            Discover the latest movies, explore nearby cinemas,
            choose your favorite seats, and book your movie tickets
            easily with Cineverse.
          </p>

          <!-- Social -->
          <div class="mt-7">

            <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Follow Us
            </h3>

            <div class="flex flex-wrap items-center gap-3">

              <a
                href="#"
                aria-label="Facebook"
                class="social-link"
              >
                <Facebook :size="18" />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                class="social-link"
              >
                <Twitter :size="18" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                class="social-link"
              >
                <Instagram :size="18" />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                class="social-link"
              >
                <Linkedin :size="18" />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                class="social-link"
              >
                <Youtube :size="18" />
              </a>

              <a
                href="#"
                aria-label="Dribbble"
                class="social-link"
              >
                <Dribbble :size="18" />
              </a>

            </div>
          </div>
        </div>


        <!-- USEFUL LINKS -->
        <div>

          <h3 class="footer-title">
            Useful Links
          </h3>

          <ul class="space-y-3">

            <li>
              <a href="#" class="footer-link">
                <ChevronRight :size="14" />
                Home
              </a>
            </li>

            <li>
              <a href="#" class="footer-link">
                <ChevronRight :size="14" />
                Movies
              </a>
            </li>

            <li>
              <a href="#" class="footer-link">
                <ChevronRight :size="14" />
                Cinemas
              </a>
            </li>

            <li>
              <a href="#" class="footer-link">
                <ChevronRight :size="14" />
                Bookings
              </a>
            </li>

            <li>
              <a href="#" class="footer-link">
                <ChevronRight :size="14" />
                Offers
              </a>
            </li>

          </ul>
        </div>


        <!-- PRIVACY -->
        <div>

          <h3 class="footer-title">
            Privacy & Policy
          </h3>

          <ul class="space-y-3">

            <li>
              <a href="#" class="footer-link">
                <ChevronRight :size="14" />
                Terms of Use
              </a>
            </li>

            <li>
              <a href="#" class="footer-link">
                <ChevronRight :size="14" />
                Privacy Policy
              </a>
            </li>

            <li>
              <a href="#" class="footer-link">
                <ChevronRight :size="14" />
                Refund Policy
              </a>
            </li>

            <li>
              <a href="#" class="footer-link">
                <ChevronRight :size="14" />
                FAQ
              </a>
            </li>

          </ul>
        </div>


        <!-- CONTACT -->
        <div class="sm:col-span-2 lg:col-span-4 xl:col-span-1">

          <div
            class="grid grid-cols-1 gap-8
                   sm:grid-cols-2 xl:grid-cols-1"
          >

            <!-- Cinema HQ -->
            <div>

              <h3 class="footer-title">
                Cinema HQ
              </h3>

              <div class="space-y-3">

                <div class="flex gap-3">

                  <MapPin
                    :size="18"
                    class="mt-0.5 shrink-0 text-[#e5ad2f]"
                  />

                  <p class="text-sm leading-6 text-gray-400">
                    Phnom Penh City,
                    <br />
                    Cambodia
                  </p>

                </div>

              </div>
            </div>


            <!-- Get In Touch -->
            <div>

              <h3 class="footer-title">
                Get in Touch
              </h3>

              <div class="space-y-3">

                <a
                  href="tel:+85590 207 392"
                  class="contact-link"
                >
                  <Phone :size="17" />
                  +855 90 207 392 
                </a>

                <a
                  href="mailto:khemsopheanandev@gmail.com"
                  class="contact-link"
                >
                  <Mail :size="17" />
                  khemsopheanandev@gmail.com
                </a>

              </div>
            </div>

          </div>
        </div>

      </div>


      <!-- PAYMENT SUPPORT -->
      <div class="payment-support-divider">
        <span>Payment Support</span>
      </div>
      <div class="border-b border-gray-800 py-8">
        <div class="bank-marquee-wrap opacity-fade-x">
          <div class="bank-marquee-track">
            <div
              v-for="(logo, index) in [...bankLogos, ...bankLogos]"
              :key="`${logo.alt}-${index}`"
              class="bank-card"
            >
              <img :src="logo.src" :alt="logo.alt" class="bank-logo" />
            </div>
          </div>
        </div>
      </div>


      <!-- ===================== -->
      <!-- BOTTOM -->
      <!-- ===================== -->

      <div
        class=" flex pt-7 text-center justify-center align-center text-md" >

        <!-- Copyright -->
        <p class="text-center text-gray-500">

          © {{ new Date().getFullYear() }}

          <span class="font-semibold text-gray-300">
            Legend <span class="text-yellow-400">Cineverse</span>
          </span>.

          All rights reserved.

        </p>

      </div>

    </div>
  </footer>
</template>


<style scoped>

/* =========================
   FOOTER TITLES
========================= */

.footer-title {
  margin-bottom: 1.25rem;
  font-size: 0.95rem;
  font-weight: 800;
  color: #ffffff;
}


/* =========================
   FOOTER LINKS
========================= */

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  width: fit-content;
  font-size: 0.875rem;
  color: #9ca3af;
  transition: all 0.25s ease;
}

.footer-link:hover {
  color: #e5ad2f;
  transform: translateX(4px);
}


/* =========================
   SOCIAL ICONS
========================= */

.social-link {
  display: flex;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;

  border: 1px solid #27272a;
  background: #111111;
  color: #9ca3af;

  transition: all 0.3s ease;
}

.social-link:hover {
  transform: translateY(-4px);

  border-color: #e5ad2f;
  background: #e5ad2f;
  color: #000000;

  box-shadow: 0 8px 20px rgba(229, 173, 47, 0.25);
}


/* =========================
   CONTACT
========================= */

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: fit-content;
  font-size: 0.875rem;
  color: #9ca3af;
  transition: all 0.25s ease;
}

.contact-link:hover {
  color: #e5ad2f;
}


/* =========================
   PAYMENT SUPPORT DIVIDER
========================= */

.payment-support-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  /* margin: 2rem 0; */
}

.payment-support-divider::before,
.payment-support-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(107, 114, 128, 0.5) 100%
  );
}

.payment-support-divider::after {
  background: linear-gradient(
    to right,
    rgba(107, 114, 128, 0.5) 0%,
    transparent 100%
  );
}

.payment-support-divider span {
  font-size: 0.875rem;
  font-weight: 600;
  color: #9ca3af;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}


/* =========================
   OPACITY FADE
========================= */

.opacity-fade-x {
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 25%,
    black 75%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 25%,
    black 75%,
    transparent 100%
  );
}


/* =========================
   BANK MARQUEE
========================= */

.bank-marquee-wrap {
  overflow: hidden;
  position: relative;
  width: 100%;
}

.bank-marquee-track {
  display: flex;
  width: max-content;
  gap: 1rem;
  animation: marquee-right-to-left 18s linear infinite;
  will-change: transform;
}

.bank-card {
  display: flex;
  width: 180px;
  height: 72px;
  align-items: center;
  justify-content: center;
  /* border-radius: 14px; */
  /* border: 1px solid #27272a; */
  /* background: #111111; */
  padding: 0.9rem 1rem;
  transition:
    transform 0.5s ease,
    border-color 0.5s ease,
    box-shadow 0.5s ease,
    background 0.5s ease;
}

.bank-card:hover {
  transform: translateY(-4px);
  border-color: #e5ad2f;
  /* background: #171717; */
  /* box-shadow: 0 12px 24px rgba(229, 173, 47, 0.12); */
}

.bank-logo {
  max-width: 100%;
  max-height: 36px;
  object-fit: contain;
  filter: grayscale(1) brightness(0.9);
  transition: filter 0.5s ease, transform 0.5s ease;
}

.bank-card:hover .bank-logo {
  filter: grayscale(0) brightness(1.1);
  transform: scale(1.05);
}

@keyframes marquee-right-to-left {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 640px) {
  .bank-card {
    width: 140px;
    height: 64px;
  }

  .bank-marquee-track {
    animation-duration: 16s;
  }
}

</style>
