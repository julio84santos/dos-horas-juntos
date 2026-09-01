const CHECKOUT_NORMAL = 'https://pay.hotmart.com/X107062724X?checkoutMode=10';
const CHECKOUT_COMPLETE = 'https://pay.hotmart.com/H107065585V?checkoutMode=10';

const questions = [
  {
    id: 'relative',
    eyebrow: 'Empecemos por vosotros',
    title: '¿A quién visitas normalmente?',
    options: [
      ['mother', 'A mi madre', 'M'],
      ['father', 'A mi padre', 'P'],
      ['grandmother', 'A mi abuela', 'A'],
      ['grandfather', 'A mi abuelo', 'B'],
      ['other', 'A otro familiar mayor', 'F']
    ]
  },
  {
    id: 'frequency',
    eyebrow: 'Vuestro ritmo',
    title: '¿Con qué frecuencia soléis veros?',
    options: [
      ['weekly', 'Todas las semanas', '01'],
      ['monthly_many', 'Varias veces al mes', '02'],
      ['monthly', 'Una o dos veces al mes', '03'],
      ['rarely', 'Solo de vez en cuando', '04']
    ]
  },
  {
    id: 'routine',
    eyebrow: 'La visita real, sin filtros',
    title: 'Cuando llegas a la visita, normalmente…',
    options: [
      ['conversation_ends', 'Charláis un poco y luego se acaba la conversación', '💬'],
      ['television', 'Termináis viendo la televisión', '📺'],
      ['same_topics', 'Acabáis hablando casi siempre de lo mismo', '↻'],
      ['mobile', 'A veces cada uno termina mirando su móvil', '▯'],
      ['good_but_better', 'Nos entendemos bien, pero me gustaría aprovechar mejor el tiempo', '♡']
    ]
  },
  {
    id: 'time',
    eyebrow: 'El momento clave',
    title: '¿Cuándo notas que la visita empieza a hacerse larga?',
    options: [
      ['15', 'En los primeros 15 minutos', '15′'],
      ['30', 'Después de media hora', '30′'],
      ['60', 'Después de una hora', '60′'],
      ['depends', 'Depende mucho del día', '~']
    ]
  },
  {
    id: 'desire',
    eyebrow: 'Lo que de verdad importa',
    title: '¿Qué te gustaría que ocurriera más durante vuestras visitas?',
    options: [
      ['laugh', 'Reírnos juntos', '☺'],
      ['stories', 'Escuchar historias que nunca me ha contado', '“”'],
      ['memories', 'Recordar música y momentos', '♫'],
      ['activity', 'Hacer algo juntos', '✦'],
      ['presence', 'Sentir que hemos aprovechado realmente ese rato', '♥']
    ]
  },
  {
    id: 'difficulty',
    eyebrow: 'La principal dificultad',
    title: '¿Qué suele dificultarlo más?',
    options: [
      ['propose', 'No sé qué proponer', '?'],
      ['quiet', 'Mi familiar habla poco', '…'],
      ['tired', 'Se cansa fácilmente', '⌁'],
      ['repeats', 'Repite mucho las mismas historias', '↺'],
      ['childish', 'Me da miedo que una actividad parezca infantil', 'Aa'],
      ['unprepared', 'Nunca voy preparado/a', '○']
    ]
  },
  {
    id: 'success',
    eyebrow: 'Imagina vuestra próxima visita',
    title: 'Al volver a casa, ¿qué te haría pensar “hoy ha sido diferente”?',
    options: [
      ['laugh', 'Nos hemos reído', '☺'],
      ['new_story', 'Me ha contado algo que no sabía', '✧'],
      ['together', 'Hemos hecho algo juntos', '∞'],
      ['animated', 'Le he visto más animado/a', '↑'],
      ['well', 'Simplemente hemos estado bien', '✓']
    ]
  },
  {
    id: 'readiness',
    eyebrow: 'Última pregunta',
    title: 'Si tuvieras ideas sencillas preparadas para cada visita, ¿te resultaría más fácil disfrutar del rato juntos?',
    options: [
      ['much', 'Sí, muchísimo', '✓'],
      ['probably', 'Probablemente sí', '✓'],
      ['yes', 'Creo que sí', '✓']
    ]
  }
];

const state = { screen: 'welcome', index: 0, answers: {} };
const app = document.querySelector('#app');

function track(event, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  if (typeof window.fbq === 'function') window.fbq('trackCustom', event, params);
}

function withTracking(url) {
  const destination = new URL(url);
  const incoming = new URLSearchParams(window.location.search);
  incoming.forEach((value, key) => {
    if (!destination.searchParams.has(key)) destination.searchParams.set(key, value);
  });
  destination.searchParams.set('src', 'quiz_dos_horas');
  return destination.toString();
}

function shell(content, extra = '') {
  return `
    <div class="page ${extra}">
      <header class="brand" aria-label="Dos Horas Juntos">
        <span class="brand-mark" aria-hidden="true"><i></i><i></i></span>
        <span>DOS HORAS JUNTOS</span>
      </header>
      ${content}
      <footer><span>TRÉBEDE</span><span>Momentos sencillos. Vínculos reales.</span></footer>
    </div>`;
}

function welcome() {
  app.innerHTML = shell(`
    <section class="welcome-grid">
      <div class="welcome-copy">
        <div class="pill"><span></span> Test gratuito · Menos de 2 minutos</div>
        <p class="kicker">EL TEST DE LOS 2 MINUTOS</p>
        <h1>Descubre qué puede hacer que vuestra próxima visita sea <em>más natural</em></h1>
        <p class="lead">¿Visitas a tu madre, padre o a tus abuelos y a veces llega un momento en el que ya no sabes qué decir o qué hacer?</p>
        <p class="support">Responde unas preguntas rápidas y recibe una recomendación pensada para vuestro tipo de visita.</p>
        <button class="primary start" type="button">Empezar el test <span>→</span></button>
        <div class="trust"><span>✓ Sin registros</span><span>✓ Resultado inmediato</span><span>✓ 100% gratuito</span></div>
      </div>
      <div class="hero-art">
        <img src="./hero-family.png" alt="Madre e hija compartiendo recuerdos durante una visita" />
        <div class="photo-wash"></div>
        <div class="art-note"><strong>No falta cariño.</strong><span>A veces simplemente faltan ideas.</span></div>
      </div>
    </section>
  `, 'welcome-page');

  app.querySelector('.start').addEventListener('click', () => {
    state.screen = 'question';
    state.index = 0;
    track('QuizStart');
    render();
  });
}

function progress() {
  const percent = Math.round(((state.index + 1) / questions.length) * 100);
  return `
    <div class="progress-wrap" aria-label="Progreso: ${percent}%">
      <div class="progress-copy"><span>Tu análisis</span><strong>${percent}%</strong></div>
      <div class="progress-track"><div style="width:${percent}%"></div></div>
    </div>`;
}

function question() {
  const q = questions[state.index];
  const buttons = q.options.map(([value, label, icon]) => `
    <button class="answer" data-value="${value}" type="button">
      <span class="answer-icon">${icon}</span>
      <span>${label}</span>
      <b>→</b>
    </button>`).join('');

  app.innerHTML = shell(`
    <section class="quiz-shell">
      ${progress()}
      <button class="back" type="button" aria-label="Volver">← Volver</button>
      <div class="question-card">
        <span class="question-number">${String(state.index + 1).padStart(2, '0')}</span>
        <p class="kicker">${q.eyebrow}</p>
        <h2>${q.title}</h2>
        <div class="answers">${buttons}</div>
      </div>
      <p class="microcopy">No hay respuestas correctas. Elige la que más se parezca a vuestra realidad.</p>
    </section>
  `, 'quiz-page');

  app.querySelector('.back').addEventListener('click', () => {
    if (state.index === 0) state.screen = 'welcome';
    else state.index -= 1;
    render();
  });

  app.querySelectorAll('.answer').forEach(button => button.addEventListener('click', () => {
    state.answers[q.id] = button.dataset.value;
    track(`QuizQ${state.index + 1}`, { answer: button.dataset.value });
    button.classList.add('selected');
    window.setTimeout(() => advance(), 180);
  }));
}

function advance() {
  if (state.index === 3) {
    state.screen = 'belief';
  } else if (state.index === 5) {
    state.screen = 'personalized';
  } else if (state.index === questions.length - 1) {
    state.screen = 'loading';
  } else {
    state.index += 1;
  }
  render();
}

function belief() {
  app.innerHTML = shell(`
    <section class="insight-shell">
      ${progress()}
      <div class="insight-card">
        <span class="insight-mark">“</span>
        <p class="kicker">ALGO IMPORTANTE</p>
        <h2>No significa que falte cariño.</h2>
        <p>Muchas familias viven exactamente lo mismo. Cuando los temas habituales se agotan, el problema no suele ser querer estar juntos.</p>
        <div class="belief-shift">
          <div><small>ANTES</small><span>«Tenemos que encontrar conversación»</span></div>
          <b>→</b>
          <div><small>UNA FORMA MÁS FÁCIL</small><span>Crear un momento para que la conversación aparezca</span></div>
        </div>
        <button class="primary continue" type="button">Continuar <span>→</span></button>
      </div>
    </section>
  `, 'insight-page');
  app.querySelector('.continue').addEventListener('click', () => {
    state.index += 1;
    state.screen = 'question';
    render();
  });
}

const personalMessages = {
  quiet: ['Si habla poco, no hace falta forzar una conversación.', 'Una fotografía, una canción o una pregunta sencilla pueden iniciar el momento de forma natural.'],
  tired: ['Si se cansa, menos puede ser mucho más.', 'Algunas propuestas duran apenas cinco minutos y pueden adaptarse al ritmo y a la energía de ese día.'],
  childish: ['Compartir una actividad no tiene por qué parecer infantil.', 'La clave está en usar recuerdos, experiencias y temas que forman parte de su vida adulta.'],
  repeats: ['Repetir una historia también puede abrir una puerta nueva.', 'Una pregunta distinta, una imagen o una canción pueden hacer aparecer detalles que nunca habías escuchado.'],
  propose: ['No necesitas llegar con un gran plan.', 'Una propuesta sencilla y lista para usar puede quitarte el peso de tener que improvisar.'],
  unprepared: ['Preparar una visita no debería darte más trabajo.', 'Tener una pequeña lista de ideas a mano cambia el inicio del encuentro y evita depender de la inspiración.']
};

function personalized() {
  const [title, body] = personalMessages[state.answers.difficulty] || personalMessages.propose;
  app.innerHTML = shell(`
    <section class="insight-shell">
      ${progress()}
      <div class="insight-card personalized-card">
        <span class="insight-mark">✦</span>
        <p class="kicker">SEGÚN TU RESPUESTA</p>
        <h2>${title}</h2>
        <p>${body}</p>
        <p class="emphasis">No necesitas llenar toda la visita. Solo necesitas una buena forma de empezar.</p>
        <button class="primary continue" type="button">Seguir con mi análisis <span>→</span></button>
      </div>
    </section>
  `, 'insight-page');
  app.querySelector('.continue').addEventListener('click', () => {
    state.index += 1;
    state.screen = 'question';
    render();
  });
}

function loading() {
  app.innerHTML = shell(`
    <section class="loading-shell">
      <div class="loader-ring"><span>0%</span></div>
      <p class="kicker">PREPARANDO TU RESULTADO</p>
      <h2>Analizando vuestras visitas…</h2>
      <ul class="analysis-list">
        <li>Tipo de visita <b>✓</b></li>
        <li>Ritmo habitual <b>✓</b></li>
        <li>Principal dificultad <b>✓</b></li>
        <li>Momentos que buscas <b>✓</b></li>
      </ul>
    </section>
  `, 'loading-page');

  let value = 0;
  const label = app.querySelector('.loader-ring span');
  const ring = app.querySelector('.loader-ring');
  const timer = window.setInterval(() => {
    value += 4;
    label.textContent = `${value}%`;
    ring.style.setProperty('--progress', `${value * 3.6}deg`);
    if (value >= 100) {
      window.clearInterval(timer);
      track('QuizComplete');
      window.setTimeout(() => { state.screen = 'result'; render(); }, 350);
    }
  }, 55);
}

function getProfile() {
  let automatic = 0;
  if (['conversation_ends', 'television', 'same_topics', 'mobile'].includes(state.answers.routine)) automatic += 2;
  if (['15', '30'].includes(state.answers.time)) automatic += 2;
  if (['propose', 'unprepared'].includes(state.answers.difficulty)) automatic += 1;

  if (automatic >= 4) return {
    key: 'automatic',
    tag: 'PERFIL DE VUESTRA VISITA',
    title: 'Vuestra visita está en “Piloto Automático”',
    intro: 'Hay algo muy importante que ya existe: queréis estar juntos. El problema aparece cuando se terminan los temas habituales y nadie sabe muy bien cuál debería ser el siguiente paso.',
    color: 'terracotta'
  };
  if (state.answers.routine === 'good_but_better') return {
    key: 'base',
    tag: 'PERFIL DE VUESTRA VISITA',
    title: 'Tenéis una buena base para crear más momentos juntos',
    intro: 'La conexión ya está ahí. Pequeñas ideas pueden ayudaros a salir de la rutina, descubrir historias nuevas y aprovechar mejor el tiempo sin forzar nada.',
    color: 'green'
  };
  return {
    key: 'stimulus',
    tag: 'PERFIL DE VUESTRA VISITA',
    title: 'Hay conexión. Faltan pequeños estímulos.',
    intro: 'Os queréis y tenéis cosas que compartir. Lo que falta no es conversación infinita, sino una idea sencilla que dé al encuentro un punto de partida.',
    color: 'gold'
  };
}

function relationLabel() {
  return {
    mother: 'tu madre', father: 'tu padre', grandmother: 'tu abuela',
    grandfather: 'tu abuelo', other: 'tu familiar'
  }[state.answers.relative] || 'tu familiar';
}

function desireLabel() {
  return {
    laugh: 'reíros más', stories: 'descubrir historias nuevas', memories: 'recuperar recuerdos',
    activity: 'hacer algo juntos', presence: 'sentir que habéis aprovechado el rato'
  }[state.answers.desire] || 'aprovechar mejor el tiempo';
}

function result() {
  const profile = getProfile();
  const frequent = ['weekly', 'monthly_many'].includes(state.answers.frequency);
  const recommended = frequent ? 'complete' : 'normal';
  const planTitle = recommended === 'complete' ? 'Súper Oferta' : 'Versión Normal';
  const price = recommended === 'complete' ? '€10' : '€5';
  const checkout = recommended === 'complete' ? CHECKOUT_COMPLETE : CHECKOUT_NORMAL;

  track('ResultView', { profile: profile.key, recommended_plan: recommended });
  app.innerHTML = shell(`
    <section class="result-shell">
      <div class="result-hero ${profile.color}">
        <div class="result-icon">${profile.key === 'automatic' ? '↻' : profile.key === 'base' ? '♥' : '✦'}</div>
        <p class="kicker">${profile.tag}</p>
        <h1>${profile.title}</h1>
        <p>${profile.intro}</p>
      </div>

      <div class="result-grid">
        <div class="diagnosis">
          <p class="section-label">TU DIAGNÓSTICO</p>
          <h2>No necesitas encontrar conversación.<br><em>Necesitas crear el momento para que aparezca.</em></h2>
          <p>Por lo que nos has contado, buscas ${desireLabel()} cuando visitas a ${relationLabel()}. Tener una idea preparada puede evitar que toda la visita dependa de los mismos temas, la televisión o el silencio.</p>
          <ul class="check-list">
            <li><span>✓</span> Propuestas sencillas, sin preparar nada complicado</li>
            <li><span>✓</span> Actividades que respetan el ritmo de una persona mayor</li>
            <li><span>✓</span> Ideas adultas, naturales y fáciles de adaptar</li>
          </ul>
        </div>

        <aside class="offer-card">
          <div class="recommended">RECOMENDADO PARA VUESTRO CASO</div>
          <p class="small">Tu mejor opción</p>
          <h2>${planTitle}</h2>
          <div class="price"><del>${recommended === 'complete' ? '€40' : '€19'}</del><strong>${price}</strong></div>
          <p class="once">Pago único · Acceso de por vida</p>
          <ul>
            <li><b>✓</b> Guía práctica de 115 páginas</li>
            <li><b>✓</b> 60 actividades completas</li>
            <li><b>✓</b> Baraja imprimible de 60 cartas</li>
            ${recommended === 'complete' ? '<li><b>✓</b> 50 actividades adicionales</li><li><b>✓</b> Guía para adaptar cada visita</li>' : ''}
          </ul>
          <a class="primary checkout" href="${withTracking(checkout)}">Preparar nuestra próxima visita <span>→</span></a>
          <div class="secure">🔒 Pago seguro · Garantía de 7 días</div>
          <a class="alternative" href="${withTracking(recommended === 'complete' ? CHECKOUT_NORMAL : CHECKOUT_COMPLETE)}">
            ${recommended === 'complete' ? 'Prefiero empezar con la versión de €5' : 'Ver el pack completo por solo €5 más'}
          </a>
        </aside>
      </div>

      <div class="why">
        <span>POR QUÉ ESTA RECOMENDACIÓN</span>
        <p>${frequent ? 'Como os veis con frecuencia, una colección más amplia te permitirá variar las propuestas y tener siempre una idea adecuada al ánimo y a la energía de ese día.' : 'Como vuestras visitas son más espaciadas, la versión normal ya reúne una base muy completa para empezar sin complicarte.'}</p>
      </div>
    </section>
  `, 'result-page');

  app.querySelectorAll('.checkout, .alternative').forEach(link => link.addEventListener('click', () => {
    track('CheckoutClick', { plan: link.classList.contains('alternative') ? 'alternative' : recommended, profile: profile.key });
  }));
}

function render() {
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (state.screen === 'welcome') welcome();
  if (state.screen === 'question') question();
  if (state.screen === 'belief') belief();
  if (state.screen === 'personalized') personalized();
  if (state.screen === 'loading') loading();
  if (state.screen === 'result') result();
}

track('QuizView');
render();
