document.getElementById('formSimu').addEventListener('submit', function(e) {
    e.preventDefault();
    const capital = parseFloat(document.getElementById('capital').value);
    const taux = parseFloat(document.getElementById('taux').value) / 100;
    const mensuel = parseFloat(document.getElementById('mensuel').value);
    const annees = parseInt(document.getElementById('annees').value);
    if (isNaN(capital) || isNaN(taux) || isNaN(annees)) {
        document.getElementById('resultat').textContent = 'Veuillez remplir tous les champs.';
        return;
    }
    // Calcul avec versement mensuel
    let montantFinal = capital;
    for (let m = 1; m <= annees * 12; m++) {
        montantFinal = montantFinal * Math.pow(1 + taux / 12, 1) + mensuel;
    }
    document.getElementById('resultat').textContent = `Montant final après ${annees} ans : ${montantFinal.toFixed(2)} €`;

    // Calculer l'évolution du capital année par année
    const labels = [];
    const data = [];
    const investi = [];
    for (let i = 0; i <= annees; i++) {
        labels.push(i.toString());
        // Calculer le capital à la fin de chaque année avec versement mensuel
        let montant = capital;
        for (let m = 1; m <= i * 12; m++) {
            montant = montant * Math.pow(1 + taux / 12, 1) + mensuel;
        }
        data.push(montant.toFixed(2));
        investi.push((capital + mensuel * i * 12).toFixed(2));
    }

    // Afficher le graphique avec Chart.js
    const ctx = document.getElementById('graphCapital').getContext('2d');
    if (window.graphCapitalChart) {
        window.graphCapitalChart.destroy();
    }
    window.graphCapitalChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: "Évolution du capital (€)",
                data: data,
                borderColor: '#0078d7',
                backgroundColor: 'rgba(0,120,215,0.1)',
                fill: true,
                tension: 0.2
                }, {
                    label: "Montant investi (€)",
                    data: investi,
                    borderColor: '#ff9800',
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.2
            }]
        },
        options: {
            scales: {
                x: {
                    title: { display: true, text: "Années" }
                },
                y: {
                    title: { display: true, text: "Capital (€)" },
                    min: 0
                }
            }
        }
    });
});
