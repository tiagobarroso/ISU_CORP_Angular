

delete reservations;
delete from contacts;
delete from contactTypes


SELECT * FROM contacts
SELECT * FROM contactTypes
SELECT * FROM reservations
INSERT INTO contactTypes (Name) VALUES ('Type1');
INSERT INTO contactTypes (Name) VALUES ('Type2');
INSERT INTO contactTypes (Name) VALUES ('Type3');
INSERT INTO contacts (Name, Birth, ContactTypeId, Phone) VALUES ('Tiago', '1987-03-08', (select top 1 1 from contactTypes), '1111111');
INSERT INTO contacts (Name, Birth, ContactTypeId, Phone) VALUES ('Giuliano', '1987-03-08', (select top 1 1 from contactTypes), '22222');
INSERT INTO contacts (Name, Birth, ContactTypeId, Phone) VALUES ('Giuliano', '1987-03-08', (select top 1 1 from contactTypes), '3333');
INSERT INTO reservations(Description, ContactId, Date, CreatedAt) VALUES ('Blah', (select top 1 ContactId from contacts), GETDATE(), GETDATE());
INSERT INTO reservations(Description, ContactId, Date, CreatedAt) VALUES ('Blah', ( SELECT TOP 1 ContactId FROM contacts ORDER BY NEWID()), GETDATE(), GETDATE());