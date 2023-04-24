import { pool } from "../utils/db.js";

// ! @route GET api/doctor/active_patients
// ! @desc Get all active patients for the doctor
// ! @access public

const active_patients = async (req, res, next) => {
  try {
    // We use the doctor's id to do the relaiion
    const { Doctor_id } = req.body;

    // We check if a doctor was provided
    if (!Doctor_id) {
      return res
        .status(500)
        .json({ message: "You must provide every field with a value" });
    }

    // We check if the doctor exists
    const [query_check] = await pool.query(
      "SELECT * FROM doctors WHERE id = ?",
      [Doctor_id]
    );

    if (query_check.length != 1) {
      return res.status(500).json({
        success: false,
        message: "Provided doctor doesn't exist",
      });
    }

    const [patients_info] = await pool.query(
      `SELECT * FROM patient WHERE id IN (SELECT Patient_id FROM active_patients WHERE Doctor_id = ?)`,
      [Doctor_id]
    );

    // Ejecutar la consulta utilizando tu librería o módulo de MySQL favorito

    console.log(patients_info);

    return res.status(200).json({ success: true, body: patients_info });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export { active_patients };
