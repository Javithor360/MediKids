USE medikids_db;

-- TESTING UPDATE DATA;
UPDATE Responsible SET `Email_Verify_code` = NULL WHERE `Email` = 'yolomeme444@gmail.com';

-- CHECK FIELDS;
SELECT * FROM Responsible WHERE Email = 'yolomeme444@gmail.com';