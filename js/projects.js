/* projects.js — Project modal open/close */

const modal     = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');

const projects = [
  {
    emoji: '🌐', title: 'Portfolio Website', type: 'Web Development',
    desc: 'This responsive portfolio — built with HTML, CSS, and JavaScript. Features skill bars, scroll animations, dark/light mode, and editable fields.',
    tags: ['HTML','CSS','JavaScript','Responsive Design'], link: '#'
  },
  {
    emoji: '🤖', title: 'ML Insurance Pipeline', type: 'Machine Learning',
    desc: 'Supervised ML project on an insurance dataset. Performed end-to-end EDA, feature engineering, and linear regression modelling using Pandas and Scikit-learn. Leader of a 6-member team with Git-based collaboration.',
    tags: ['Python','Scikit-learn','Pandas','Git','EDA','Linear Regression'], link: '#'
  },
  {
    emoji: '📊', title: 'Data Analysis Dashboard', type: 'Data Science',
    desc: 'Interactive EDA dashboard using Matplotlib and Seaborn. Visualises distributions, correlation heatmaps, and outlier detection on tabular datasets.',
    tags: ['Python','Matplotlib','Seaborn','Pandas','Jupyter'], link: '#'
  },
  {
    emoji: '⚡', title: '4 DevTown Bootcamp Projects', type: 'Web Devlopment, AWS, Python',
    desc: 'Bootcamp on Hotstar Clone - Built a responsive single-page Clone of Disney+ Hotstar. Backend Web Development - Learned and Implemented. Python and Cloud Computing - Learned and Implemented.',
    tags: ['Python','HTML','CSS', 'JavaScript', 'Node.JS', 'Express', 'AWS'], link: '#'
  },
];

function renderModalContent(p) {
  const tagsHtml = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
  return `
    <div class="modal-header">
      <div class="modal-icon">${p.emoji}</div>
      <div>
        <div class="modal-title">${p.title}</div>
        <div class="modal-subtype">${p.type}</div>
      </div>
    </div>
    <p class="modal-desc">${p.desc}</p>
    <div class="modal-tags">${tagsHtml}</div>
    ${p.link && p.link !== '#'
      ? `<a class="modal-link" href="${p.link}" target="_blank" rel="noopener noreferrer">
           View Project
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
             <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
             <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
           </svg>
         </a>` : ''}`;
}

function openModal(index) {
  if (!modal || !modalBody) return;
  modalBody.innerHTML = renderModalContent(projects[index]);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.project-card').forEach((card, i) => {
  card.addEventListener('click', () => openModal(i));
  card.setAttribute('tabindex', '0');
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(i); });
});

const closeBtn = document.getElementById('modal-close');
if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
