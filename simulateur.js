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

    // Calculer l'évolution du capital année par année
    const labels = [];
    const data = [];
        const investi = [];
        for (let i = 0; i <= annees; i++) {
            labels.push(i.toString());
            data.push((capital * Math.pow(1 + taux, i)).toFixed(2));
            investi.push(capital.toFixed(2));
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
