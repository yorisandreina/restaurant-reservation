app.get("/availability", async (req, res) => {
  const { business_id, date, time, people } = req.query;

  try {
    // 1️⃣ Traer las mesas del local que puedan recibir esa cantidad de personas
    const { data: tables } = await axios.get(
      `${baseUrl}/tables?business_id=${business_id}`
    );
    const validTables = tables.filter((t) => t.capacity >= people);

    // 2️⃣ Traer las reservas existentes para esa fecha
    const { data: reservations } = await axios.get(
      `${baseUrl}/reservations?business_id=${business_id}&date=${date}`
    );

    // 3️⃣ Definir rango horario de la reserva (ej: 90 min)
    const start = new Date(`${date}T${time}:00Z`);
    const end = new Date(start.getTime() + 90 * 60000); // 90 minutos

    // 4️⃣ Ver si alguna mesa está libre
    let availableTable = null;

    for (const table of validTables) {
      const hasConflict = reservations.some((r) => {
        if (r.table_id !== table.id) return false;
        const rStart = new Date(r.start_datetime);
        const rEnd = new Date(r.end_datetime);
        return !(end <= rStart || start >= rEnd);
      });

      if (!hasConflict) {
        availableTable = table;
        break;
      }
    }

    // 5️⃣ Responder al frontend
    if (availableTable) {
      res.json({
        available: true,
        table_id: availableTable.id,
        message: "Mesa disponible para este horario",
      });
    } else {
      res.json({
        available: false,
        message: "No hay mesas disponibles en este horario",
      });
    }
  } catch (error) {
    console.error("Error al verificar disponibilidad:", error.message);
    res.status(500).json({ error: "Error al verificar disponibilidad" });
  }
});
