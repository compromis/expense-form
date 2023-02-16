export const types = {
  BUS: { ref: 'BUS', text: 'Autobús', tip: 'Classe turista' },
  TRAIN: { ref: 'TRAIN', text: 'Tren', tip: 'Classe turista' },
  URBANBUS: { ref: 'URBANBUS', text: 'Bus urbà', tip: 'Suma màxima de bus, metro, taxi i aparcament: 8€/dia', urban_transport: true },
  METRO: { ref: 'METRO', text: 'Metro', tip: 'Suma màxima de bus, metro, taxi i aparcament: 8€/dia', is_vehicle: false, urban_transport: true },
  TAXI: { ref: 'TAXI', text: 'Taxi', tip: 'Suma màxima de bus, metro, taxi i aparcament: 8€/dia', is_vehicle: false, urban_transport: true },
  PARKING: { ref: 'PARKING', text: 'Aparcament', tip: 'Suma màxima de bus, metro, taxi i aparcament: 8€/dia', is_vehicle: false, urban_transport: true },
  TOLL: { ref: 'TOLL', text: 'Peatge autopista', tip: 'Màxim 8€/dia' },
  CAR: { ref: 'CAR', text: 'Vehicle particular', tip: 'Preu a 0,19€/km', per_km: 0.19, is_vehicle: true },
  BREAKFAST: { ref: 'BREAKFAST', text: 'Desdejuni', tip: 'Màxim 3€/persona/dia', requires_people: true },
  LUNCH: { ref: 'LUNCH', text: 'Dinar', tip: 'Màxim 10€/persona/dia', requires_people: true },
  DINNER: { ref: 'DINNER', text: 'Sopar', tip: 'Màxim 12€/persona/dia', requires_people: true },
  LODGING: { ref: 'LODGING', text: 'Allotjament', requires_people: true },
}
