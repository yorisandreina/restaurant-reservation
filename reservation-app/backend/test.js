app.get("/availability", async (req, res) => {
  try {
    const { business_id, date, pax } = req.query;

    // 1️⃣ Obtener time slots del local desde Xano
    const timeSlotsRes = await axios.get(`${baseUrl}/time_slots`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      params: { business_id }, // si tu endpoint Xano soporta filtros
    });
    const timeSlots = timeSlotsRes.data;

    // 2️⃣ Obtener mesas del local
    const tablesRes = await axios.get(`${baseUrl}/tables`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      params: { business_id },
    });
    const tables = tablesRes.data.filter(
      (t) => t.capacity_min <= pax && t.capacity_max >= pax && t.active == true
    );

    // 3️⃣ Obtener reservas existentes para esa fecha
    const reservationsRes = await axios.get(`${baseUrl}/reservations`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      params: { business_id, date },
    });
    const reservations = reservationsRes.data.filter(
      (r) => r.status !== "cancelled" && r.status !== "no_show"
    );

    // 4️⃣ Generar los slots disponibles
    const availableSlots = [];

    for (const slot of timeSlots) {
      const { start_time, end_time, slot_min, duration_min, day_of_week } =
        slot;

      // validar si el day_of_week coincide con el de la fecha
      const dow = new Date(date).getDay();
      if (dow !== day_of_week) continue;

      const start = new Date(`${date}T${start_time}:00Z`);
      const end = new Date(`${date}T${end_time}:00Z`);

      for (
        let t = new Date(start);
        t < end;
        t.setMinutes(t.getMinutes() + slot_min)
      ) {
        const slotStart = new Date(t);
        const slotEnd = new Date(slotStart.getTime() + duration_min * 60000);
        let freeTables = 0;

        for (const table of tables) {
          const hasConflict = reservations.some((r) => {
            if (r.table_id !== table.id) return false;
            const rStart = new Date(r.start_datetime);
            const rEnd = new Date(r.end_datetime);
            return !(slotEnd <= rStart || slotStart >= rEnd);
          });
          if (!hasConflict) freeTables++;
        }

        if (freeTables > 0) {
          availableSlots.push({
            time: slotStart.toISOString().slice(11, 16),
            available_tables: freeTables,
          });
        }
      }
    }

    res.json({ available_slots: availableSlots });
  } catch (error) {
    console.error("Error calculando disponibilidad:", error.message);
    res.status(500).json({
      message: "Error calculando disponibilidad",
      detail: error.message,
    });
  }
});
