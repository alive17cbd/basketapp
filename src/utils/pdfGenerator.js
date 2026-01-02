import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateTeamRosterPDF = (team) => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(255, 122, 0); // Primary color
    doc.rect(0, 0, 210, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('BASKET PRO - REPORTE DE EQUIPO', 105, 13, { align: 'center' });

    // Team Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text(team.name, 14, 35);
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Categoría: ${team.category}`, 14, 42);
    doc.text(`Total Jugadores: ${team.players.length}`, 14, 48);

    // Players Table
    const tableColumn = ["#", "Nombre", "Posición", "Estado", "Promedio"];
    const tableRows = [];

    team.players.forEach(player => {
        const playerData = [
            player.num,
            player.name,
            player.pos,
            player.status,
            player.stats,
        ];
        tableRows.push(playerData);
    });

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 55,
        headStyles: { fillColor: [255, 122, 0] },
        alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text('Generado por Basket Pro App', 105, 285, { align: 'center' });
    }

    doc.save(`plantilla_${team.name.replace(/\s+/g, '_').toLowerCase()}.pdf`);
};

export const generateMatchItineraryPDF = (match) => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(13, 17, 23); // Dark BG
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 122, 0); // Primary
    doc.setFontSize(16);
    doc.text('ITINERARIO DE PARTIDO', 14, 15);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(`VS ${match.opponent}`, 14, 28);

    // Match Info Box
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(14, 50, 182, 35, 3, 3, 'FD');

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Detalles del Encuentro:', 20, 60);

    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha: ${match.date}`, 20, 70);
    doc.text(`Ubicación: ${match.location}`, 20, 78);
    doc.text(`Tipo: ${match.type}`, 120, 70);

    // Itinerary Table
    const itineraryData = [
        ['- 2h 00min', 'Llegada al estadio / Punto de encuentro', 'Todos'],
        ['- 1h 30min', 'Charla técnica en vestuarios', 'Entrenadores y Jugadores'],
        ['- 1h 00min', 'Inicio de calentamiento en cancha', 'Equipo Completo'],
        ['- 15min', 'Regreso a vestuarios - Uniformes', 'Jugadores'],
        ['- 5min', 'Presentación de equipos', 'Titulares'],
        ['00:00', 'Salto inicial', 'Quinteto Inicial'],
        ['Entretiempo', 'Charla de ajuste táctico', 'Todos'],
        ['Post-Partido', 'Estiramiento y vuelta a la calma', 'Equipo Completo'],
    ];

    doc.autoTable({
        startY: 95,
        head: [['Tiempo', 'Actividad', 'Responsable']],
        body: itineraryData,
        theme: 'grid',
        headStyles: { fillColor: [48, 54, 61], textColor: 255 },
        styles: { fontSize: 11, cellPadding: 5 },
    });

    // Notes Section
    const finalY = doc.lastAutoTable.finalY || 150;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Notas Importantes:', 14, finalY + 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text([
        '• Recordar llevar ambos uniformes (L/V).',
        '• Hidratación obligatoria.',
        '• Llegar puntual al punto de encuentro.'
    ], 14, finalY + 25);

    doc.save(`itinerario_vs_${match.opponent.replace(/\s+/g, '_').toLowerCase()}.pdf`);
};
