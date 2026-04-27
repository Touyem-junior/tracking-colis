let colis = JSON.parse(localStorage.getItem('colis')) || [];

function sauvegarder() {
  localStorage.setItem('colis', JSON.stringify(colis));
}

function getBadgeClass(statut) {
  if (statut === 'Livré') return 'badge-livré';
  if (statut === 'En transit') return 'badge-transit';
  if (statut === 'En cours de livraison') return 'badge-livraison';
  return 'badge-attente';
}

function afficherListe() {
  const div = document.getElementById('liste-colis');
  if (colis.length === 0) {
    div.innerHTML = '<p style="color:#999;text-align:center">Aucun colis enregistré.</p>';
    return;
  }
  div.innerHTML = colis.map((c, i) => `
    <div class="colis-item">
      <h3>📦 ${c.numero} — ${c.destinataire}</h3>
      <span class="badge ${getBadgeClass(c.statut)}">${c.statut}</span>
      <p>🌍 ${c.origine} → ${c.destination}</p>
      <p>🚚 Transporteur : ${c.transporteur}</p>
      <p>📅 Ajouté le : ${c.date}</p>
      <button class="btn-delete" onclick="supprimerColis(${i})">🗑️ Supprimer</button>
    </div>
  `).join('');
}

function ajouterColis() {
  const numero = document.getElementById('new-numero').value.trim();
  const destinataire = document.getElementById('new-destinataire').value.trim();
  const origine = document.getElementById('new-origine').value.trim();
  const destination = document.getElementById('new-destination').value.trim();
  const statut = document.getElementById('new-statut').value;
  const transporteur = document.getElementById('new-transporteur').value.trim();

  if (!numero || !destinataire || !origine || !destination) {
    alert('⚠️ Veuillez remplir tous les champs obligatoires.');
    return;
  }

  colis.unshift({
    numero, destinataire, origine,
    destination, statut, transporteur,
    date: new Date().toLocaleDateString('fr-FR')
  });

  sauvegarder();
  afficherListe();

  document.getElementById('new-numero').value = '';
  document.getElementById('new-destinataire').value = '';
  document.getElementById('new-origine').value = '';
  document.getElementById('new-destination').value = '';
  document.getElementById('new-transporteur').value = '';

  alert('✅ Colis ajouté avec succès !');
}

function supprimerColis(index) {
  if (confirm('Supprimer ce colis ?')) {
    colis.splice(index, 1);
    sauvegarder();
    afficherListe();
  }
}

function rechercherColis() {
  const numero = document.getElementById('tracking-input').value.trim();
  const resultat = document.getElementById('resultat');

  if (!numero) {
    resultat.innerHTML = '<p style="color:red">⚠️ Entrez un numéro de suivi.</p>';
    return;
  }

  const trouve = colis.find(c =>
    c.numero.toLowerCase() === numero.toLowerCase()
  );

  if (trouve) {
    resultat.innerHTML = `
      <div class="result-box">
        <h3>📦 Colis : ${trouve.numero}</h3>
        <span class="badge ${getBadgeClass(trouve.statut)}">${trouve.statut}</span>
        <p><strong>Destinataire :</strong> ${trouve.destinataire}</p>
        <p><strong>Trajet :</strong> ${trouve.origine} → ${trouve.destination}</p>
        <p><strong>Transporteur :</strong> ${trouve.transporteur}</p>
        <p><strong>Date :</strong> ${trouve.date}</p>
      </div>`;
  } else {
    resultat.innerHTML = `<p style="color:#f5576c">❌ Aucun colis trouvé avec ce numéro.</p>`;
  }
}

window.onload = afficherListe;
