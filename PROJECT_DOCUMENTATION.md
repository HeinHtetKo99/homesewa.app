Project Documentation — RocketSingh

Last updated: June 9, 2026


About the Project

RocketSingh is an on-demand home services platform for Chennai, India. It is the Indian version of TACKLES PRO, which runs in San Francisco.

Live website: rocketsingh.app
Planned production domain: rocketsingh.app
Support email: support@rocketsingh.app
Phone: +91-8190074189
WhatsApp: b.broadpress.org/rocketsingh


Tech Stack

Website is built with Next.js, React, TypeScript, and Tailwind CSS. It is hosted on Vercel.

The reference website tackles.pro uses Vite and React. We used it as the design and content template for RocketSingh.

Mobile app download page is on the website, but Play Store and App Store links are not connected yet. There is no mobile app code in this project folder. The website APIs are ready for a future mobile app.

Firebase is not set up yet. It is planned for the mobile app.

OneSignal is not set up yet. It is planned for push notifications on the app.


Airtable

Airtable is the backend for all forms on the website.

Base link: airtable.com/appcaAplIBD3UYYKu

The Airtable personal access token is stored in environment variables on the developer machine and on Vercel for production. It should never be shared publicly or committed to Git.

Tables used:
- Booking — for Book a Service form
- workForce — for Career / Join applications
- Partnership — for partner registration
- Contact — for contact form
- Feedback — for customer feedback
- Services — linked from the booking form


Integrations

Currently working:
- Airtable for all form submissions
- Google Analytics
- Google Maps on the contact page
- WhatsApp chat link

Not done yet:
- Google Tag Manager
- Facebook Pixel
- Firebase
- OneSignal
- Real mobile app store links


What Works on the Website

- Home, About, Services, Book, Contact, Career, Feedback, and Partnership pages
- Services page with 7 categories and 30 services, matching tackles.pro
- 36 cleaning service detail pages
- Blog, FAQ, Gallery, Team, Testimonials, and legal pages
- All forms save data to Airtable
- File uploads work on Book, Career, Partnership, and Feedback forms


What Is Still Pending

Website:
- Update domain and SEO files to the final production domain
- Add Google Tag Manager and Facebook Pixel
- Connect real social media links in the footer
- Add detail pages for new services like handyman and plumbing
- Clean up mixed branding between old domains and RocketSingh

Mobile App:
- Build or connect the native mobile app
- Add real Play Store and App Store download links
- Set up Firebase
- Set up OneSignal for push notifications

Backend:
- Email alerts when someone submits a form
- Payment integration
- Live booking status tracking for customers


How to Run Locally

Install dependencies, add the Airtable token to your local environment file, start the development server, and open localhost port 3000 in the browser. Full setup steps are in the project environment example file.


Recent Work — June 9, 2026

- Updated the services page to match tackles.pro
- Added 30 service images
- Fixed extra gap above the footer on the services page
- Pushed changes to the main branch on GitHub


Next Step

Review this document, then set up a Trello board and assign the remaining tasks listed under What Is Still Pending.
