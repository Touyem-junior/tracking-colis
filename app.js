function rechercherColis() {
  const numero = document.getElementById('tracking-input').value.trim();
  const resultat = document.getElementById('resultat');

  if (!numero) {
    resultat.innerHTML = '<p style="color:red">⚠️ Veuillez entrer un numéro de suivi.</p>';
    return;
  }

  resultat.innerHTML = '<p>🔍 Recherche en cours...</p>';

  setTimeout(() => {
    resultat.innerHTML = `
      <h2 style="margin-bottom:16px">📦 Colis : ${numero}</h2>
      <div style="border-left:4px solid #1a73e8; padding-left:16px; margin-bottom:12px">
        <p><strong>Statut :</strong> En transit</p>
        <p><strong>Dernière position :</strong> Douala, Cameroun</p>
        <p><strong>Mise à jour :</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
      </div>
      <div style="margin-top:20px">
        <h3 style="margin-bottom:10px">Historique</h3>
        <p>✅ Colis pris en charge — Expéditeur</p>
        <p>✅ Arrivé au centre de tri</p>
        <p>🚚 En cours de livraison</p>
      </div>
    `;
  }, 1500);
}
