document.getElementById('formSimu').addEventListener('submit', function(e) {
    e.preventDefault();
    const capital = parseFloat(document.getElementById('capital').value);
    const taux = parseFloat(document.getElementById('taux').value) / 100;
    const annees = parseInt(document.getElementById('annees').value);
    if (isNaN(capital) || isNaN(taux) || isNaN(annees)) {
        document.getElementById('resultat').textContent = 'Veuillez remplir tous les champs.';
        return;
    }
    const montantFinal = capital * Math.pow(1 + taux, annees);
    document.getElementById('resultat').textContent = `Montant final après ${annees} ans : ${montantFinal.toFixed(2)} €`;
});
