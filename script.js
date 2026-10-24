document.getElementById('year').textContent = new Date().getFullYear();

// Count the statistics when they first enter view.
const statCounters = document.querySelectorAll('.stat-num[data-count-to]');
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const counter = entry.target;
      const target = Number(counter.dataset.countTo);
      const startedAt = performance.now();
      const duration = 1400;
      counter.textContent = '0';
      const updateCount = now => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(target * easedProgress).toLocaleString();
        if (progress < 1) requestAnimationFrame(updateCount);
        else statObserver.unobserve(counter);
      };
      requestAnimationFrame(updateCount);
    });
  }, {threshold:0.35});
  statCounters.forEach(counter => statObserver.observe(counter));
}

// Mobile menu
const hbtn = document.getElementById('hamburgerBtn');
const mmenu = document.getElementById('mobileMenu');
hbtn.addEventListener('click', () => {
  const open = mmenu.classList.toggle('open');
  hbtn.setAttribute('aria-expanded', open);
});
mmenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mmenu.classList.remove('open'); hbtn.setAttribute('aria-expanded','false');
}));

// Active nav state on scroll
const navLinks = document.querySelectorAll('.nav-links a');
const sections = [...navLinks].map(a => document.querySelector(a.getAttribute('href')));
window.addEventListener('scroll', () => {
  let idx = sections.findIndex(s => s && s.getBoundingClientRect().top > 100);
  if (idx === -1) idx = sections.length - 1; else idx = Math.max(0, idx - 1);
  navLinks.forEach((a,i) => a.classList.toggle('active', i === idx));
}, {passive:true});

// Services data (icon = simple emoji-free glyph via SVG-less unicode for lean footprint)
const services = [
  ["Bank Reconciliations","Regularly compare bank statements with accounting records to identify discrepancies and maintain accurate records.","bank recon.jpg"],
  ["Stock / Inventory Reconciliations","Reconcile inventory or stock records against accounting records and identify discrepancies.","Stock - Inventory Reconciliations.jpg"],
  ["Tax Returns & Filing","Assist with preparing and filing applicable tax returns accurately and on time.","Tax Returns & Filing.jpg"],
  ["Outstanding Reports","Prepare and analyze outstanding receivables, payables, invoices, and other financial items.","Outstanding Reports.jpg"],
  ["Accounts Receivable","Track customer balances, outstanding invoices, collections, and receivables reporting.","Accounts Receivable.jpg"],
  ["Accounts Payable","Monitor supplier invoices, outstanding obligations, payment records, and payable reports.","Accounts Payable.jpg"],
  ["Financial Reporting","Prepare clear financial reports to help clients understand their financial position and performance.","Financial Reporting.jpg"],
  ["Auditing & Reviews","Review financial records and supporting documentation to identify discrepancies or areas needing attention.","Auditing & Reviews.jpg"],
  ["Bookkeeping","Maintain organized and accurate financial records and accounting transactions.","Bookkeeping.jpg"],
  ["Expense Tracking","Categorize and monitor business expenses and provide useful expense reports.","Expense Tracking.webp"],
  ["Payroll Support","Provide accounting support related to payroll records, calculations, and reporting where applicable.","Payroll Support.jpg"],
  ["General Accounting Support","Assist with other accounting, reconciliation, reporting, and administrative financial tasks as required.","General Accounting Support.avif"]
];
const imageUrl = filename => `images/${encodeURIComponent(filename).replace(/%2F/g, '/')}`;
const grid = document.getElementById('services-grid');
const emailAddress = 'annmutheu020@gmail.com';
const gmailComposeUrl = (subject, body = '') =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
const emailTemplates = {
  consultation: {
    subject: 'Book a consultation',
    body: 'Hello Ann,\n\nI would like to book a consultation to discuss your accounting services. Please let me know your availability.\n\nName:\nBusiness or organization:\nPreferred date and time:\nPhone number:\n\nThank you.'
  },
  quote: {
    subject: 'Request for an accounting services quote',
    body: 'Hello Ann,\n\nI would like to request a quote for accounting services.\n\nService I am interested in:\nBusiness or organization:\nBrief description of what I need:\nPreferred timeframe:\n\nPlease let me know if you need any other information.\n\nThank you.'
  },
  contact: {
    subject: 'Accounting services inquiry',
    body: 'Hello Ann,\n\nI would like to enquire about your accounting services. Please get in touch with me.\n\nName:\nBusiness or organization:\nHow can you help?\nPreferred contact method:\n\nThank you.'
  }
};
document.querySelectorAll('[data-email-template]').forEach(link => {
  const template = emailTemplates[link.dataset.emailTemplate];
  if (template) link.href = gmailComposeUrl(template.subject, template.body);
});
const whatsappTemplates = {
  contact: 'Hello Ann, I would like to enquire about your accounting services. Please get in touch with me.'
};
document.querySelectorAll('[data-whatsapp-template]').forEach(link => {
  const message = whatsappTemplates[link.dataset.whatsappTemplate];
  if (message) link.href = `https://wa.me/254704784104?text=${encodeURIComponent(message)}`;
});
grid.innerHTML = services.map(([t,d,image]) => `
  <div class="card">
    <img class="service-image" src="${imageUrl(image)}" alt="${t}" loading="lazy">
    <h3>${t}</h3>
    <p>${d}</p>
    <a href="${gmailComposeUrl(`Request a quote: ${t}`, `Hello Ann,\n\nI would like to request a quote for ${t.toLowerCase()}.\n\nBusiness or organization:\nBriefly describe what you need:\nApproximate number of records or transactions (if known):\nPreferred timeframe:\n\nPlease let me know what information or documents you need from me.\n\nThank you.`)}" target="_blank" rel="noopener" class="btn btn-outline service-quote">Request a Quote</a>
  </div>`).join('') + `
  <div class="card cta-card">
    <h3>Need Something Else?</h3>
    <p>Have a specific accounting task that isn't listed? Get in touch to discuss your requirements.</p>
    <a href="#contact" class="btn btn-outline" style="border-color:#fff; color:#fff;">Discuss Your Requirements</a>
  </div>`;

// Industries
const industries = ["Small Businesses","Startups","Freelancers","Consultants","Retail Businesses","Service Businesses","Online Businesses","Entrepreneurs","Individuals","SMEs"];
document.getElementById('industries-grid').innerHTML = industries.map(i => `<div class="industry">${i}</div>`).join('');

// FAQ
const faqs = [
  ["What accounting services do you provide?","Services include bookkeeping, bank and stock/inventory reconciliations, tax return assistance, outstanding reports, accounts payable and receivable, financial reporting, record reviews, expense tracking, payroll support, and general accounting support."],
  ["Do you work with small businesses?","Yes. I work with small businesses, startups, freelancers, consultants, retail and service businesses, online businesses, and individuals."],
  ["Can you handle bank reconciliations?","Yes, bank reconciliations are a core part of the services offered."],
  ["Do you prepare tax returns?","Yes. I provide support with preparing and filing applicable tax returns. Contact me to discuss the type of return and requirements for your situation."],
  ["Can you help with outstanding reports?","Yes, preparation and analysis of outstanding receivables and payables reports is offered."],
  ["Do you provide bookkeeping services?","Yes, ongoing or one-off bookkeeping support is available."],
  ["Can I request a customized accounting service?","Yes — get in touch to discuss a task that isn't listed and it can be scoped individually."],
  ["How do I send my accounting documents?","Once we discuss the work, we can agree on a suitable way to share the records and supporting documents needed."],
  ["How long does an accounting task take?","Turnaround depends on the type of work, the volume of records, and when the required information is available. I’ll confirm an expected timeframe after discussing the scope."],
  ["How do I book a consultation?","Use the contact form below, or reach out by email/WhatsApp/phone to arrange a time."]
];
document.getElementById('faq-list').innerHTML = faqs.map((f,i) => `
  <details class="faq-item" ${i===0?'open':''}>
    <summary class="faq-q">${f[0]}<span class="plus">+</span></summary>
    <div class="faq-a">${f[1]}</div>
  </details>`).join('');

// Contact form (no backend — demo only)
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  if (!e.target.checkValidity()) { e.target.reportValidity(); return; }
  const data = new FormData(e.target);
  const subject = `Website inquiry: ${data.get('fservice')}`;
  const body = [
    `Name: ${data.get('fname')}`,
    `Email: ${data.get('femail')}`,
    `Phone: ${data.get('fphone') || 'Not provided'}`,
    `Business: ${data.get('fcompany') || 'Not provided'}`,
    `Service: ${data.get('fservice')}`,
    `Preferred contact: ${data.get('fcontact')}`,
    '',
    'Message:',
    data.get('fmessage')
  ].join('\n');
  const composeWindow = window.open(gmailComposeUrl(subject, body), '_blank', 'noopener');
  if (!composeWindow) window.location.href = gmailComposeUrl(subject, body);
  document.getElementById('formMsg').style.display = 'block';
});
